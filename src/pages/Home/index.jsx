import api from '../../services/api';
import './style.css';
import bookImage from '../../assets/book.png';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

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

  async function logOut() {
    localStorage.clear();
    navigate('/login');
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
            <h1>Bem vindo {user}</h1>
          </div>
          <div>
            <button type="button" onClick={() => navigate('/admin')}>
              Administrador
            </button>
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
          <h1 className="home-titulo">Livros disponiveis</h1>
          {books.map((book) => (
            <div className="home-livro-container" key={book._id}>
              <img src={book.imgUrl} alt="Book Cover" />
              <div className="home-book-info">
                <p>{book.name}</p>
                <button onClick={() => landBook(book._id)}>Alugar</button>
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
