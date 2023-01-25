import React from 'react';
// import { Route, BrowserRouter } from 'react-router-dom';
import { Route, BrowserRouter, Routes as Router, } from "react-router-dom";

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const Routes = () => {
  //exact valida a igualdade do endereço do browser com a rota e não a ocorrência apenas
  return (
    <BrowserRouter>
      <Router>
        <Route element={<Home />} path='/' />
        <Route element={<CreatePoint />} path='/create-point' />
      </Router>
    </BrowserRouter>
  );
}

export default Routes;