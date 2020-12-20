import React, {} from 'react';


export const User = ({list}) => {

    const registrDate = new Date(list.registrDate);
    const lastOnline = new Date(list.lastOnline);

    return(
        <>
                <div className="col-1 pl-1">
                    <p>{list.id}</p>
                </div>
                <div className="col pl-1">
                    {list.username}
                </div>
                <div className="col text-break pl-0">
                    {list.name}
                </div>
                <div className="col pl-1 text-break">
                    {list.email}
                </div>
                <div className="col pr-0">
                    {list.blocked ? <i className="fa fa-times fa-2x" aria-hidden="true"></i> : <i className="fa fa-check fa-2x" aria-hidden="true"></i> }
                </div>
                <div className="col pl-1 text-break">
                    {lastOnline.toLocaleTimeString()}
                </div>
                <div className="col pl-1 text-break">
                    {registrDate.toLocaleString()}
                </div>
                
        </>
    )
}