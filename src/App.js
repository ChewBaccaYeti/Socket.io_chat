import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Chat from './components/Chat';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <CssBaseline enableColorScheme />
      <GlobalStyles />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Chat />
    </div>
  );
}

export default App;
