import api from '../../services/api';
import './style.css';
import bookImage from '../../assets/book.png';

import { useState, useEffect } from 'react';

function Home() {
  const [books, setBooks] = useState([]);
  const user = localStorage.getItem('userName');
  
  async function getBooks() {
    const responseBooks = await api.get('/api/book');
    setBooks(responseBooks.data);
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
            <p>Acervo</p>
            <p>Seu perfil</p>
            <p>Sair</p>
          </div>
        </header>

        <div className="home-grid">
          <h1 className="home-titulo">Livros disponiveis</h1>
          {books.map((book) => (
            <div className="home-livro-container" key={book.id}>
              <img src={book.imgUrl} alt="Book Cover" />
              <div className="home-book-info">
                <p>{book.name}</p>
                <button>Pegar emprestado</button>
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
