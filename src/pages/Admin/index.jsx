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

  async function deleteUser(userId) {
    await api.delete(`/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getUser();
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
          <h1 className="book-list-title">Available Books</h1>
          {books.map((book) => (
            <div className="book-list-books-container" key={book._id}>
              <img src={book.imgUrl} alt="Book Cover" />
              <div className="book-list-books-info">
                <div>
                  <p>{book.name}</p>
                  <p>{book.user && book.user.name ? 'Rented' : 'Not Rented'}</p>
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
          <AddBook refreshBooks={getBooks} />
        </div>

        <div className="user-list-grid border">
          <h1 className="user-list-title">Users</h1>
          {users.map((user) => (
            <div className="user-list-users-container" key={user._id}>
              <div className="user-list-users-info">
                <div>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                </div>
                <button type="button" onClick={() => deleteUser(user._id)}>
                  Delete
                </button>
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
