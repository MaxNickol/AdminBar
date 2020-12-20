import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Login from './components/Login';
import {Table} from './components/Table';
import {Registr} from './components/Registration';

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return (
            <Switch>
                <Route path='/table'>
                    <Table />
                </Route>
                <Redirect to="/table" />
            </Switch>
        )
    }
    else { 
        return (
        <>
        <Switch>
            <Route exact path='/'>
                <Login />
            </Route>
            <Route path="/registr" >
                <Registr />
            </Route>
            <Redirect to='/' />
        </Switch>
        
        </>
        )
    }
}