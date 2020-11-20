import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './style.css'

import logo from '../../assets/logo.svg'
// JSX (JavaScript XML): Sintaxe do XML dentro do js

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
          <header>
              <img src={logo} alt="Ecolecta" />
          </header>

          <main>
            <h1>Seu marketplace de colecta de resíduos</h1>
            <p>Ajudamos pessoas a encontrarem pontos de colecta de forma efeiciente</p>

            <Link to="/create-point">
                <span>
                  <FiLogIn/>
                </span>
                <strong>Cadastre um ponto</strong>
            </Link>
          </main>
      </div>
    </div>
  ); 
}

export default Home;
