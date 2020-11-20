import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const Routes = () =>{
    //exact valida a igualdade do endereço do browser com a rota e não a ocorrência apenas
    return (
        <BrowserRouter>
        <Route component={Home} path='/' exact />
            <Route component={CreatePoint} path='/create-point' />
        </BrowserRouter>
    );
}

export default Routes;