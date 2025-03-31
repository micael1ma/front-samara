import api from '../../services/api';
import './style.css';

import { useState, useEffect, useRef } from 'react';

function Books() {
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

  async function createBook(e) {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    console.log(token);

    try {
      await api.post(
        '/api/book',
        {
          name: inputTitle.current.value,
          author: inputAuthor.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert('Livro criado.');
      getBooks();
    } catch (error) {
      alert('Erro ao criar livro.');
    }
  }

  return (
    <div>
      <form onSubmit={createBook}>
        <h1>Adicionar novo livro</h1>
        <input
          placeholder="Título"
          name="titulo"
          ref={inputTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Autor"
          name="author"
          ref={inputAuthor}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="subbmit">Adicionar</button>
      </form>

      {books.map((book) => (
        <div key={book.id}>
          <div>
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
  );
}

export default Books;
