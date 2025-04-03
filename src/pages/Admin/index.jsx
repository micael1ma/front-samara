// Api
import api from '../../services/api';
//Css
import './style.css';
//Components
import AddBook from '../../components/addBook';
import Header from '../../components/header';
import Footer from '../../components/footer';

import { useState, useEffect } from 'react';

function Admin() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  // Token
  const token = localStorage.getItem('authToken');

  // Get Books
  async function getBooks() {
    const responseBooks = await api.get('/api/book');
    setBooks(responseBooks.data);
  }

  //Delete Book
  async function deleteBook(bookId) {
    console.log(token)
    console.log(bookId)
    await api.delete(`/api/book/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getBooks();
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
    <div className="container-cretralizar">
      <div className="book-list-container">
        <Header />
        <div className="book-list-grid border">
          <h1 className="book-list-title">Livros disponiveis</h1>
          {books.map((book) => (
            <div className="book-list-books-container" key={book._id}>
              <img src={book.imgUrl} alt="Book Cover" />

              <div className="book-list-books-info">
                <div>
                  <p>{book.name}</p>
                  <p>
                    {book.user && book.user.name ? 'Alugado' : 'Não alugado'}
                  </p>
                  <p>
                    {book.user && book.user.name
                      ? 'User: ' + book.user.name
                      : ' '}
                  </p>
                </div>
                <div className="book-list-books-info-button">
                  <button>Edit</button>
                  <button type="button" onClick={() => deleteBook(book._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          <AddBook />
        </div>

        <div className="user-list-grid border">
          <h1 className="user-list-title">Usuarios</h1>
          {users.map((user) => (
            <div className="user-list-users-container" key={user._id}>
              <div className="user-list-users-info">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Books rented: 1</p>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Admin;
