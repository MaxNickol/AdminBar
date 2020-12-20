import React, {useContext } from 'react';
import {useHistory} from 'react-router-dom';
import {LoginContext} from '../context/LoginContext';
import {Spring} from 'react-spring/renderprops';


export const Navbar = (props) => {

    const history =  useHistory();
    const context = useContext(LoginContext);
    
    const logoutHandler = () => {
        context.logout();
        history.push('/')
       
    }

    return (
        <>
        <Spring
        from={{opacity: 0}}
        to={{opacity: 1}}
        config={{
            duration: 700
        }}>
            {props => (
            <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-primary" style={props}>
                <div className='d-flex container-fluid flex-row justify-content-center'>
                    <p className="h3 text-white">Administration</p>
                    {context.isAuthenticated ? 
                    <button type="button" className="btn btn-danger ml-3" onClick={logoutHandler}>Log out</button>: ''}
                </div>
            </nav>
            )}
       
        </Spring>
        </>
    )
}