import React from 'react';
import {  MDBContainer } from 'mdb-react-ui-kit';
import Weather from './components/Weather';

function App() {
  return (
    <MDBContainer fluid>
      <Weather/>
    </MDBContainer>
  );
}

export default App;
