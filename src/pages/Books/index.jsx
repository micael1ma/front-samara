import api from '../../services/api';
import './style.css';

import { useState, useEffect } from 'react';

function Books() {
  const [books, setBooks] = useState([]);

  async function getBooks() {
    const responseBooks = await api.get('/api/book');
    console.log(responseBooks.data);
    setBooks(responseBooks.data);
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="container-book">
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
