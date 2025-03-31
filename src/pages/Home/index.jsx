import { useNavigate } from 'react-router-dom';
import './style.css';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <button type="button" onClick={() => navigate('/books')}>
        Livros
      </button>
    </div>
  );
}

export default Home;
