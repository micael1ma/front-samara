// Api
import api from '../../services/api';

//Css
import './style.css';

//Components
import Header from '../../components/header';

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
    <div className="home-container-cretralizar">
      <div className="home-container">
        <Header />

        <div className="home-grid">
          <h1 className="home-titulo">Livros emprestados</h1>
          {books.map((book) => (
            <div className="home-livro-container" key={book.id}>
              <img src={book.imgUrl} alt="Book Cover" />
              <div className="home-book-info">
                <p>{book.name}</p>
                <button onClick={() => returnBook(book._id)}>Devolver</button>
              </div>
            </div>
          ))}
        </div>

        <footer>
          <div></div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
