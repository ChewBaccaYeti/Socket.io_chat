import React, { useState } from 'react';
import Chat from './components/Chat';
import AuthModal from './components/Modal';
// import logo from './logo.svg';
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setAuthenticated(true);
  };

  return (
    <div className='App'>
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
      {!authenticated ? <AuthModal onSubmit={handleAuthSuccess} /> : <Chat />}
    </div>
  );
}

export default App;
