import { useState, useRef } from 'react';
import api from '../../services/api';
import './style.css';
import boolImage from '../../assets/book.png';

import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();

  async function handleRegister(e) {
    e.preventDefault();

    const user = {
      name: inputName.current.value,
      email: inputEmail.current.value,
      password: inputPassword.current.value,
    };

    try {
      await api.post('api/register', user);
      window.location.href = '/';
      alert('Registro relizado com sucesso');
    } catch (error) {
      alert('Erro ao realizar registro');
    }
  }

  return (
    <div className="register-container-centralizar">
      <div className="register-container">
        <div className="register-image-container">
          <img src={boolImage} alt="Livros" />
        </div>

        <form className="register-form" onSubmit={handleRegister}>
          <h1>Criar conta</h1>
          <input
            className="register-input"
            type="name"
            placeholder="Nome"
            name="name"
            ref={inputName}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="register-input"
            type="email"
            placeholder="Email"
            name="email"
            ref={inputEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="register-input"
            type="password"
            placeholder="Senha"
            name="password"
            ref={inputPassword}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="register-button-redirect"
            type="button"
            onClick={() => navigate('/login')}
          >
            Ja tenho uma conta
          </button>
          <button className="register-button" type="submit">
            Criar conta
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
