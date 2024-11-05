import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

export default function LoginArea() {
  return (
    <div className="login-area">
      <p>Venha conferir e contribuir com o nosso projeto </p>
      <div className="user-login">
        <p>Login</p>
          <input type="email"/>
      </div>
      <div className="password-login">
        <p>Senha</p>
          <input type="password"/>
      </div>
      <div className="enter-anonymous">
        <input type="checkbox" id="checkbox"/>
        <p>Entrar anonimamente</p>
      </div>
      <button><Link to="/menu">Entrar</Link></button>
    </div>
  );
};