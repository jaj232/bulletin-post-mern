import React from 'react';
import './App.css';
import BulletinBoard from './components/BulletinBoard/BulletinBoard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="pageTitle">Bulletin Board</div>
        <BulletinBoard/>
      </header>
    </div>
  );
}

export default App;
