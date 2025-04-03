import api from '../../services/api';
import './style.css';
import bookImage from '../../assets/book.png';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

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

  async function logOut() {
    localStorage.clear();
    window.location.reload();
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="home-container-cretralizar">
      <div className="home-container">
        <header className="home-header">
          <div>
            <img src={bookImage} alt="Livros" />
            <h1>Seu Perfil</h1>
          </div>
          <div>
            <button type="button" onClick={() => navigate('/')}>
              Acervo
            </button>
            <button type="button" onClick={() => navigate('/profile')}>
              Seu perfil
            </button>
            <button onClick={logOut}>Sair</button>
          </div>
        </header>

        <div className="home-grid">
          <h1 className="home-titulo">Livros emprestados</h1>
          {books.map((book) => (
            <div className="home-livro-container" key={book.id}>
              <img src={book.imgUrl} alt="Book Cover" />
              <div className="home-book-info">
                <p>{book.name}</p>
                <button onClick={() => returnBook(book._id)}>
                  Devolver
                </button>
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
