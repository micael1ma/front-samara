// Api
import api from '../../services/api';

//Css
import './style.css';

//Components
import Header from '../../components/header';
import Footer from '../../components/footer';

import { useState, useEffect } from 'react';

function Home() {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('authToken');

  const [books, setBooks] = useState([]);

  async function getBooks() {
    const responseBooks = await api.get(`/api/booksByUser/${userId}`);
    setBooks(responseBooks.data.books);
  }

  async function returnBook(bookId) {
    try {
      await api.put(
        `/api/bookrenturn/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      getBooks();
    } catch (error) {
      alert('Erro ao devolver livro.');
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
          <h1 className="book-list-title">Livros emprestados</h1>
          {books.map((book) => (
            <div className="book-list-books-container" key={book.id}>
              <img src={book.imgUrl} alt="Book Cover" />
              <div className="book-list-books-info">
                <p>{book.name}</p>
                <button onClick={() => returnBook(book._id)}>Devolver</button>
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
