import './App.css';
import * as React from 'react'
import Container from 'react-bootstrap/Container'
import OrderEntry from './pages/entry/OrderEntry'
import { OrderDetailsProvider } from './contexts/OrderDetails'

function App() {

  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary Page and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* Confromation page doesnt need provider */}
    </Container>
  );
}

export default App;
