import api from '../../services/api';
import './style.css';
import bookImage from '../../assets/book.png';
import AddBook from '../../components/addBook';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
  // Navigate
  const navigate = useNavigate();

  // Log Out function
  async function logOut() {
    localStorage.clear();
    navigate('/login');
  }

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  // Token
  const token = localStorage.getItem('authToken');

  // Get Books
  async function getBooks() {
    const responseBooks = await api.get('/api/book');
    setBooks(responseBooks.data);
    console.log(responseBooks.data);
  }

  // Add Book
  async function addBook() {
    const responseBook = await api.post('/api/book');
  }

  // Get Users
  async function getUser() {
    const responseUsers = await api.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(responseUsers.data);
  }

  useEffect(() => {
    getBooks();
    getUser();
  }, []);

  return (
    <div className="home-container-cretralizar">
      <div className="home-container">
        <header className="home-header">
          <div>
            <img src={bookImage} alt="Livros" />
            <h1>Admin</h1>
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

          <AddBook />

          {books.map((book) => (
            <div className="home-livro-container" key={book._id}>
              <img src={book.imgUrl} alt="Book Cover" />
              <div className="home-book-info">
                <p>{book.name}</p>
                <p>{book.user && book.user.name ? 'Alugado' : 'Não alugado'}</p>
                <p>
                  {book.user && book.user.name
                    ? 'User: ' + book.user.name
                    : ' '}
                </p>
                <button></button>
              </div>
            </div>
          ))}
        </div>

        <div className="home-grid">
          <h1 className="home-titulo">Usuarios</h1>
          {users.map((user) => (
            <div className="home-livro-container" key={user._id}>
              <div className="home-book-info">
                <p>{user.name}</p>
                <p>{user.email}</p>
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

export default Admin;
