import React, {useState} from 'react'
import {Modal} from './Modal';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Spring} from 'react-spring/renderprops';

export const Registr = () => { 

    const style = { 
        backgroundColor: "#EEE8AA",
        height: "100%",
        padding: "15px",
        borderRadius: "7px",
        fontSize: "18px",
    }

    const [form, setForm] = useState({
        email:'',
        password:'',
        username:'',
        name:'',
    })

    const [sysMes, setSysmes] = useState([]);
    const [showSys, setShow] = useState(false);
    const formHandler = (event) => { 
        setForm({ ...form, [event.target.id]: event.target.value})
    }

    const onRegister = async () =>  {
        try{
            const response = await axios.post('/auth/register', {
                username: form.username,
                email: form.email,
                password: form.password,
                name: form.name
            })
                
            if(response.status === 201) {
                setShow(true); 
                setSysmes(response.data)
            }
        }
        catch(err) { 
            setShow(true);
            setSysmes(err.response.data)
        }
        
    }

    return (
       <Spring
       from={{opacity:0, marginBottom:-400}}
       to={{opacity: 1, marginBottom:0}}
       >
           {props=> (
            <div className="container-fluid d-flex flex-row justify-content-center" style={props}>
                <div style={style} className="d-flex flex-column col-md-5">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label pt-md-4">Email address</label>
                        <input value={form.email} type="email" className="form-control" id="email" onChange={formHandler} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label pt-md-4">Password</label>
                        <input value={form.password} type="password" className="form-control" id="password" onChange={formHandler} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label pt-md-4">Username</label>
                        <input value={form.username} type="text" className="form-control" id="username" onChange={formHandler} required={true}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label pt-md-4">Name</label>
                        <input value={form.name} type="name" className="form-control" id="name" onChange={formHandler} required={true}/>
                    </div>
                   {showSys ? <Modal message={sysMes.message} show={setShow} /> : ''}
                    <div className="wrapper d-flex flex-row justify-content-between">
                        <button className="btn btn-success mt-md-4" onClick={onRegister}>Register</button>
                        <Link to="/"><button className="btn btn-secondary mt-md-4">Back</button></Link>
                    </div>
                </div>
            </div>
           )}
       
       </Spring>
    )
}