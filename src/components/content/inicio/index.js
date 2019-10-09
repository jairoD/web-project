import React from 'react';



function init_page(props) {
    const signout = () => {
        props.setAuthentication(false);
      }
    return (
        <header className="App-header">
            <button onClick={signout}>Logout</button>
            <p>
                Edittt <code>src/App.js</code> and save to reload.
        </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
        </a>
        </header>
    );
}

export default init_page;