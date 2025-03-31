import api from '../../services/api';
import './style.css';
import bookImage from '../../assets/book.png';

import { useState, useEffect, useRef } from 'react';

function Home() {
  const [books, setBooks] = useState([]);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const inputTitle = useRef();
  const inputAuthor = useRef();

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
          <div className="home-header-div">
            <img className="home-img" src={bookImage} alt="Livros" />
            <h1>Bem vindo Larry</h1>
          </div>
          <div className="home-header-div">
            <h1>Acervo</h1>
            <h1>Seu perfil</h1>
          </div>
        </header>

        <h1 className='home-titulo'>Livros disponiveis</h1>
        {books.map((book) => (
          <div className="home-livro-container" key={book.id}>
            <div className="home-book-container">
              <p>
                Titulo: <span>{book.name}</span>
              </p>
              <p>
                Autor: <span>{book.author}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
