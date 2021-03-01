import React, { Component } from 'react'
import ReactDom from 'react-dom'

import Header from './header'
import Body from './body';


class Home extends Component{
    render(){
        return <h1>Welcome to Home</h1>
    }
}

class All extends Component{
    render(){
        return (
            <div>
                
                <Header />
                <Body/>
                
                
            </div>


                
            
        )
    }
}


export default All