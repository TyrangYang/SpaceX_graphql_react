import React from 'react';
import logo from './SpaceX.png';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Launches from './components/Launches';
import LaunchDetail from './components/LaunchDetail';

const client = new ApolloClient({
    uri: "/graphql"
    // uri: "http://localhost:4000/graphql"
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="container">
                    <img src={logo} alt="SpaceX" style={{ width: 500, display: 'block', margin: 'auto' }}></img>
                </div>
                <Route exact path='/' component={Launches} />
                <Route exact path='/launch/:flight_number' component={LaunchDetail} />
                {/* <Route exact path='/*' render={
                    <h1> error </h1>
                } /> */}
            </Router>
        </ApolloProvider>
    );
}

export default App;
