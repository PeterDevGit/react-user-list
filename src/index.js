import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const AppReact = () => {
    return (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}

ReactDOM.render(< AppReact />, document.getElementById('root'));
