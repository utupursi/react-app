import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import AuthenticatedPage from "./Components/AuthenticatedPage/AuthenticatedPage";
import React, {useState, useEffect} from 'react';
import {AppContext} from './context/context';
import axios from "axios";

function App() {
    const [isAuthenticated, setAuthenticated] = useState(false);
    useEffect(() => {
        let token = localStorage.getItem('token');
        axios.post(`http://127.0.0.1:8080/api/verifyToken`, {token})
            .then(res => {
                if (res.data.success === 'true') {
                    setAuthenticated(true);
                }
            })
        // Update the document title using the browser API
    });

    return (
        <div className="App">
            <Header/>

            <AppContext.Provider value={{isAuthenticated, setAuthenticated}}>
                <Switch>
                    {!isAuthenticated && <Route exact path="/login" component={Login}/>
                    }
                    <Route exact path="/" component={Home}/>
                    {isAuthenticated &&
                    < Route exact path="/authenticatedPage" component={AuthenticatedPage}/>
                    }

                </Switch>
            </AppContext.Provider>

        </div>
    );
}

export default App;
