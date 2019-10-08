import React from 'react';
import './../App.css';
import Left from './content/inicio/index';
import Login from './content/Login/'

class App extends React.Component {
  render() {
    return (
      <main>
        <div className="App">
          <Login/>
        </div>
      </main>
    )
  }
}

export default App;
