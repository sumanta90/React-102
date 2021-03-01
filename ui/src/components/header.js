import React, { Component } from 'react'

class Header extends Component{
    render(){
        return (
            <nav className="navbar navbar-light bg-light" style={{ boxShadow:'1px 1px 7px 1px' }}>
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1"><b># Notify 21</b></span>
                </div>
            </nav>
        )
    }
}
/*
<div className="active item"><a href="/add-queue">Add Queue</a></div>
                        <a className="item"><a href="/queue-list">Queue List</a></a>
                
                        <div className="right menu">
                            <a className="item" href="/">Home</a>
                        </div>
*/


export default Header