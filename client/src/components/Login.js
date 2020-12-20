import React, {useState, useContext} from 'react';
import {Modal} from './Modal';
import {LoginContext} from '../context/LoginContext';
import {Container} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import {useSpring, animated} from 'react-spring';

function Login() {

    const style = { 
        backgroundColor: "#EEE8AA",
        height: "100%",
        padding: "15px",
        borderRadius: "7px"
    }

    const fontStyle = { 
        fontSize: '18px'
    }
    const login = useContext(LoginContext);

    const props = useSpring({opacity:1, marginBottom:0, from: {opacity: 0, marginBottom: -500}});

    const [loading, setLoading] = useState(false);

    const [body, setBody] = useState([]);
    const [showModal, setModal] = useState(false);
    const [form, setForm] = useState({
        email:'', password:''
    })

    const changeHandler = (event) => { 
        setForm({ ...form, [event.target.id]: event.target.value})
    }

    const submitHandler = async () => {
        setLoading(true)
        try{

        const data = await axios.post('/auth/login/', {
            email: form.email,
            password: form.password,
        })
        
        login.login(data.data.token, data.data.userId)
        login.setReload(!login.reload)

            if(data.status === 200){
                setBody(data.data)
                setLoading(false)
              }
        } catch(err){
            setModal(true);
            setBody(err.response.data);
            setLoading(false);
        }
         
        
    }
    return (
                <React.Fragment>
                    <Container fluid="md" style={fontStyle}>
                    <animated.div style={props}>
                    <div className="row justify-content-md-center">
                            <div className="col-md-5">
                                <div style={style} className="d-flex flex-column">
                                    <label htmlFor="email" className="pt-md-4 form-label">
                                        Email address
                                    </label>
                                    <input type="email" value={form.email} placeholder="Enter email" className="form-control" id="email" onChange={changeHandler}/> 
                                    <label htmlFor="password" className="pt-md-4 form-label">
                                        Your password    
                                    </label> 
                                    <input type="password" value={form.password} placeholder="Enter your password" className="form-control" id="password" onChange={changeHandler}/>
                                    {showModal ? <Modal message={body.message} show={setModal}/> : ''}
                                    <div className="wrapper d-flex flex-row justify-content-between">
                                        <button disabled={loading} className="col-md-2 btn btn-success mt-md-4" onClick={submitHandler}>Login</button>
                                        <NavLink to="/registr"><button className="col-2-md btn btn-primary mt-md-4"> Sign up </button></NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        </animated.div>
                    </Container>
                </React.Fragment>
    )
}


export default Login;