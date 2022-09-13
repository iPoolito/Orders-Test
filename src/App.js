import './App.css';
import * as React from 'react'
import Container from 'react-bootstrap/Container'
import OrderEntry from './pages/entry/OrderEntry'
import { OrderDetailsProvider } from './contexts/OrderDetails'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OrderSummary from './pages/sumary/OrderSummary';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';

function App() {

  return (
    <BrowserRouter>
      <OrderDetailsProvider>
        <Routes>
          {/* Summary Page and entry page need provider */}
          <Route path='/' element={<OrderEntry />} />
          <Route path='/review' element={<OrderSummary />} />
          <Route path='/order' element={<OrderConfirmation />} />
          {/* Confromation page doesnt need provider */}
        </Routes>
      </OrderDetailsProvider>
    </BrowserRouter>
  );
}

export default App;
