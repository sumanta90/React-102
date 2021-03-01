import React, { Component } from 'react'
import ReactDom from 'react-dom'

import All from './components/all'

class Index extends Component{
    render(){
        return (
            <div >
                <All />
            </div>
        )
    }
}

ReactDom.render(<Index />,document.getElementById('root'))