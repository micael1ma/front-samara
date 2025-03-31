import { useState, useRef } from 'react';
import api from '../../services/api';
import './style.css';
import boolImage from './bool.png';

import { useNavigate } from 'react-router-dom';

function Home() {
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
      console.log(response.data);
      alert('Login bem-sucedido!');
      window.location.href = '/books'; // Redireciona para a tela Home
    } catch (error) {
      alert('Erro ao fazer login.');
    }
  }

  return (
    <div className="container">
      <div>
        <img src={boolImage} alt="Livros" />
      </div>

      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          ref={inputEmail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          name="password"
          ref={inputPassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Home;
