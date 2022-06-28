import './App.css';
import GameMain from './components/main-game'



function App() {

  return (
    
    <div className="App">
      <header className="App-header">
      <p className='title'>♬TUNE IT!</p>
      <p className='subtitle'>a lyrics guessing game</p>
      <GameMain />
      </header>
    </div>
  );
}

export default App;
