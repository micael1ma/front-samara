import api from '../../services/api';
import './style.css';
import bookImage from '../../assets/book.png';

import { useState, useEffect, useRef } from 'react';

function Home() {
  // const [books, setBooks] = useState([]);
  const books = [
    {
      name: "Harry Potter and the Sorcerer's Stone",
      author: 'J.K. Rowling',
      description:
        'A young boy discovers he is a wizard and embarks on magical adventures at Hogwarts School of Witchcraft and Wizardry.',
      imgUrl: 'https://m.media-amazon.com/images/I/81iqZ2HHD-L.jpg',
    },
    {
      name: '1984',
      author: 'George Orwell',
      description:
        'A dystopian novel about a totalitarian regime that exercises extreme surveillance and control over its citizens.',
      imgUrl: 'https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg',
    },
    {
      name: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      description:
        'An epic journey of Frodo and his companions to destroy the One Ring and defeat the dark lord Sauron.',
      imgUrl: 'https://m.media-amazon.com/images/I/91B0TJr4dVL.jpg',
    },
    {
      name: 'Don Quixote',
      author: 'Miguel de Cervantes',
      description:
        'The story of a chivalrous yet delusional knight, Don Quixote, and his loyal squire, Sancho Panza.',
      imgUrl: 'https://m.media-amazon.com/images/I/81qL3pRzzlL.jpg',
    },
    {
      name: 'The Little Prince',
      author: 'Antoine de Saint-Exupéry',
      description:
        'A philosophical tale about friendship, love, and the essence of life, told by a little prince from another planet.',
      imgUrl: 'https://m.media-amazon.com/images/I/81U8C1Fu42L.jpg',
    },
    {
      name: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description:
        'A powerful novel about racial injustice in the Deep South, seen through the eyes of a young girl.',
      imgUrl: 'https://m.media-amazon.com/images/I/81OthjkJBuL.jpg',
    },
    {
      name: 'Pride and Prejudice',
      author: 'Jane Austen',
      description:
        'A classic novel that explores themes of love, social status, and the expectations of women in the 19th century.',
      imgUrl: 'https://m.media-amazon.com/images/I/91HHqVTAJQL.jpg',
    },
    {
      name: 'Moby-Dick',
      author: 'Herman Melville',
      description:
        'The tale of Captain Ahab’s obsessive quest to hunt down the elusive white whale, Moby-Dick.',
      imgUrl: 'https://m.media-amazon.com/images/I/91hJ8U7-M2L.jpg',
    },
    {
      name: 'War and Peace',
      author: 'Leo Tolstoy',
      description:
        'A historical epic that follows several families during the Napoleonic Wars and explores themes of fate and free will.',
      imgUrl: 'https://m.media-amazon.com/images/I/81vd5nfG7OL.jpg',
    },
    {
      name: 'Crime and Punishment',
      author: 'Fyodor Dostoevsky',
      description:
        'A psychological thriller that follows a young man struggling with guilt after committing a murder.',
      imgUrl: 'https://m.media-amazon.com/images/I/91ReB2B3VLL.jpg',
    },
    {
      name: 'Brave New World',
      author: 'Aldous Huxley',
      description:
        'A dystopian novel depicting a future where society is engineered for stability and pleasure, at the cost of individuality.',
      imgUrl: 'https://m.media-amazon.com/images/I/81eL48Elx-L.jpg',
    },
    {
      name: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      description:
        'A coming-of-age novel that follows Holden Caulfield, a teenager struggling with alienation and identity.',
      imgUrl: 'https://m.media-amazon.com/images/I/71ek6or1LCL.jpg',
    },
    {
      name: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description:
        'A critique of the American Dream set in the Roaring Twenties, centered around the mysterious millionaire Jay Gatsby.',
      imgUrl: 'https://m.media-amazon.com/images/I/81xXAyOp5iL.jpg',
    },
    {
      name: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      description:
        'The journey of Bilbo Baggins, a humble hobbit who is thrust into an adventure to reclaim a stolen treasure.',
      imgUrl: 'https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg',
    },
    {
      name: 'Frankenstein',
      author: 'Mary Shelley',
      description:
        'A Gothic horror novel about a scientist who creates a living being, only to be horrified by his own creation.',
      imgUrl: 'https://m.media-amazon.com/images/I/81N4c4nhLBL.jpg',
    },
  ];

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
          <div>
            <img src={bookImage} alt="Livros" />
            <h1>Bem vindo Larry</h1>
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
