import { useState } from 'react';
import api from '../services/api';
import './AddBookModal.css';

const AddBook = ({ refreshBooks }) => {
  const token = localStorage.getItem('authToken');
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [imgURL, setImgURL] = useState('');

  async function handleAddBook(e) {
    e.preventDefault();

    try {
      const book = { name, author, description, imgURL };

      await api.post('/api/book', book, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Book added!');
      clear();
      setIsOpen(false); // Fecha o modal após adicionar
      refreshBooks();
    } catch (error) {
      alert(
        'Error error when book: ' +
          (error.response?.data?.message || error.message),
      );
    }
  }

  function clear() {
    setName('');
    setAuthor('');
    setDescription('');
    setImgURL('');
  }

  return (
    <div className="add-book-container">
      <button className="add-book-button" onClick={() => setIsOpen(true)}>
        +
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>New Book</h2>

            <form onSubmit={handleAddBook}>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Author:</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="url"
                  value={imgURL}
                  onChange={(e) => setImgURL(e.target.value)}
                  required
                />
              </div>

              <div className="modal-buttons">
                <button type="submit" className="submit-button">
                  Save
                </button>
                <button type="button" onClick={clear} className="clear-button">
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBook;
