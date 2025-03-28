import { useState } from 'react';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import './style.css';
import boolImage from './bool.png';

function Home() {
  return (
    <div className="container">
      <div>
        <img src={boolImage} alt="Descrição da imagem" />
      </div>

      <form>
        <h1>Login</h1>
        <input placeholder="E-Mail" name="E-Mail" />
        <input placeholder="Password" name="Password" />
        <button type="button">Login</button>
      </form>
    </div>
  );
}

export default Home;
