import boolImage from '../../assets/book.png';
import './login.css';
import api from '../../services/api';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputEmail = useRef();
  const inputPassword = useRef();

  async function handleLogin(e) {
    e.preventDefault();

    const credentials = {
      email: inputEmail.current.value,
      password: inputPassword.current.value,
    };

    try {
      const response = await api.post('/api/login', credentials);
      const token = response.data.token;
      localStorage.setItem('authToken', token);
      window.location.href = '/'; // Redireciona para a tela Home
    } catch (error) {
      alert('Erro ao fazer login.');
    }
  }

  return (
    <div className="login-container-centralizar">
      <div className="login-container">
        <div className="login-image-container">
          <img src={boolImage} alt="Livros" />
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <h1>Login</h1>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            name="email"
            ref={inputEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Senha"
            name="password"
            ref={inputPassword}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login-button-redirect"
            type="button"
            onClick={() => navigate('/register')}
          >
            Não tenho uma conta
          </button>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
