import { HeaderContainer } from './containers/header';

import './App.css';

const App = function () {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <HeaderContainer /* non props */ />
        </div>
      </header>
    </div>
  );
};

export default App;
