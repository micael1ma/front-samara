import bookImage from '../assets/book.png';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = localStorage.getItem('userName');

  function getWelcome() {
    if (location.pathname === '/') return `Bem vindo ${user}`;
    if (location.pathname === '/profile') return `Seu perfil`;
    if (location.pathname === '/admin') return 'Adimin';
    return 'Not defined';
  }

  function isActive(path) {
    return location.pathname === path ? 'active-button' : '';
  }

  async function logOut() {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <header className="header">
      <div>
        <img src={bookImage} alt="Logo" onClick={() => navigate('/')} />
        <h1>{getWelcome()}</h1>
      </div>
      <div>
        <button className={isActive('/')} onClick={() => navigate('/')}>
          Acervo
        </button>
        <button className={isActive('/profile')} onClick={() => navigate('/profile')}>
          Seu perfil
        </button>
        <button className={isActive('/admin')} onClick={() => navigate('/admin')}>
          Administrador
        </button>
        <button onClick={logOut}>Sair</button>
      </div>
    </header>
  );
};

export default Header;
