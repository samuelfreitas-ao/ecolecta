import React from 'react'; // importação comum em todos arquivo do react
import ReactDOM from 'react-dom'; //react-dom indica que está a ser utilizado na web
import App from './App';

//renderizar o componente App(App.tsx) no DOM ou tela do navegador dentro da div#id=root
ReactDOM.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>,
  document.getElementById('root')
);