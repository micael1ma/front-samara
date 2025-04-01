import api from '../../services/api';
import './style.css';
import bookImage from '../../assets/book.png';

import { useState, useEffect } from 'react';

function Home() {
  const [books, setBooks] = useState([]);
  const user = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  console.log;
  const token = localStorage.getItem('authToken');

  async function getBooks() {
    const responseBooks = await api.get('/api/book');
    const allBooks = responseBooks.data;

    let availableBooks = [];
    for (const book of allBooks) {
      if (book.rented === false) {
        availableBooks.push(book);
      }
    }
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
      alert('Erro ao emprestar livro.');
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
            <h1>Bem vindo {user}</h1>
          </div>
          <div>
            <button>Acervo</button>
            <button>Seu perfil</button>
            <button onClick={logOut}>Sair</button>
          </div>
        </header>

        <div className="home-grid">
          <h1 className="home-titulo">Livros disponiveis</h1>
          {books.map((book) => (
            <div className="home-livro-container" key={book.id}>
              <img src={book.imgUrl} alt="Book Cover" />
              <div className="home-book-info">
                <p>{book.name}</p>
                <button onClick={() => landBook(book._id)}>
                  Pegar emprestado
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
