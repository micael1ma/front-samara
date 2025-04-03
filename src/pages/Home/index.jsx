// Api
import api from '../../services/api';

//Css
import './style.css';

//Components
import Header from '../../components/header';
import Footer from '../../components/footer';

import { useState, useEffect } from 'react';

function Home() {
  const user = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('authToken');

  const [books, setBooks] = useState([]);

  async function getBooks() {
    const responseBooks = await api.get('/api/book');
    const allBooks = responseBooks.data;
    const availableBooks = allBooks.filter((book) => !book.rented);
    setBooks(availableBooks);
  }

  async function landBook(bookId) {
    try {
      await api.put(
        `/api/bookrent/${bookId}`,
        {
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      getBooks();
    } catch (error) {
      alert('Erro ao pegar livro.');
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="container-cretralizar">
      <div className="book-list-container">
        <Header />
        <div className="book-list-grid">
          <h1 className="book-list-title">Livros disponiveis</h1>
          {books.map((book) => (
            <div className="book-list-books-container" key={book._id}>
              <img src={book.imgUrl} alt="Book Cover" />
              <div className="book-list-books-info">
                <p>{book.name}</p>
                <button onClick={() => landBook(book._id)}>Alugar</button>
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Home;
