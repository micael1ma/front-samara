import { useState } from 'react';
import api from '../services/api';

const addBook = () => {
  const token = localStorage.getItem('authToken');

  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [imgURL, setImgURL] = useState('');

  async function handleAddBook(e) {
    e.preventDefault();

    const book = {
      name,
      author,
      description,
      imgURL,
    };

    api.post('/api/book', book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function clear() {
    setName('');
    setAuthor('');
    setDescription('');
    setImgURL('');
  }

  return (
    <div>
      {/* Botão para abrir o modal */}
      <button onClick={() => setIsOpen(true)}>Adicionar Livro</button>

      {/* Modal estilo "alert" */}
      {isOpen && (
        <div>
          <h2>Adicionar Livro</h2>
          <form onSubmit={handleAddBook}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="IMGurl"
              value={imgURL}
              onChange={(e) => setImgURL(e.target.value)}
              required
            />
            <button type="submit">Adicionar</button>
            <button onClick={clear}>Limpar</button>
            <button onClick={() => setIsOpen(false)} type="button">
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default addBook;
