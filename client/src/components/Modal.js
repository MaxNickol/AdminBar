import React, {useState} from 'react'
import '../styles/notification.css';
import {Spring} from 'react-spring/renderprops';

export const Modal = ({message, show}) => {    

    
  return(
      <Spring
      from={{opacity: 0, marginTop: -100}}
      to={{opacity: 1, marginTop: 0}}
      config={{
          duration: 500,
          delay: 0,
      }}
      >
          {props =>  (
        <div className="notification" style={props}>
            <div className="not-header">
                <button className="close" onClick={() => show(false)}><i className="fa fa-times-circle-o" aria-hidden="true"></i></button>
            </div>
            <div className="message-content">
                <p className="text-center h5">{message}</p>
            </div>
        </div>
          )}
      
      </Spring>
  )
}