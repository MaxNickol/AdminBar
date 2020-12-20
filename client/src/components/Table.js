import React, {useContext} from 'react';
import {ListContext} from '../context/ListContext'; 
import {User} from './User';
import '../styles/table.css'
import {Spring} from 'react-spring/renderprops';

export const Table = () => {

   const context = useContext(ListContext);
   console.log(`CONTEXT LIST:${context.list}`);
    return (
        
        <Spring
        from={{opacity: 0 }}
        to={{opacity: 1}}
        config={{
            duration: 500
        }}>   
            {props => (
                <>
                <div className="col-12 d-flex flex-row " style={props}>
                        <button className="btn btn-primary button" onClick={() => context.onAllValue()}>Select all</button>
                        <button className="outline" onClick={() => context.blockUsers()}><i className="fa fa-ban fa-3x pb-2 "></i></button>
                        <button className="outline" onClick={() => context.deleteUsers()} ><i className="fa fa-trash-o fa-3x " aria-hidden="true"></i></button>
                        <button className="outline" onClick={() => context.unblockUsers()}><i className="fa fa-key fa-3x pb-2" aria-hidden="true" ></i></button>
                </div>
                <div className="table border border-5" style={props}>
                <div className="row d-flex">
                    <div className="col-1 text-center">
                    </div>
                    <div className="col-1 pl-0">
                        <strong>ID</strong>
                    </div>
                    <div className="col pl-0 pr-0">
                        <strong>Username</strong>
                    </div>
                    <div className="col pl-3">
                        <strong>Name</strong>
                    </div>
                    <div className="col pl-0">
                        <strong>@Email</strong>
                    </div>
                    <div className="col pl-0">
                        <strong>Status</strong>
                    </div>
                    <div className="col pl-0">
                        <strong>Last online</strong>
                    </div>
                    <div className="col pl-0">
                        <strong>Registration</strong>
                    </div>
                </div>
                {context.list.map((user, i) => {
                    return (
                        <div className="row mt-3" key={i}>
                            <div className="col-1 text-center">
                                <input type="checkbox" id={user.id} onChange={() => context.onValue(user.id)} value={user.id} ref={(input) => context.getInputs(input)}/>
                            </div>
                            <User list={{...user}} />
                        </div>
                    )
                })}
                
            </div>
            </>
            )}
        </Spring>
        
    )
}