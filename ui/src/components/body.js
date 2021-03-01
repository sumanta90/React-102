import React, { Component, useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import getNextStep from './getNext'

import axios from 'axios'



function TicketComponent(props) {
    const id = props.match.params.id

    const [ticketinfo, setTicketInfo] = useState([])

    useEffect(() =>{
        fetch('http://127.0.0.1:5000/get/ticket/'+id, {method: "GET"})
            .then(response => {
                return response.json()
            })
            .then(response =>{
                setTicketInfo(response)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    console.log("Joined: ",ticketinfo)

    const [btn, setBtn] = useState(true)
    const [prog, setprog] = useState(25)

    return (
        <div>
            
            {
                
                    ticketinfo.map(data =>{
                        return(
                            <div style={{marginTop:'5px'}}> 
                            <p style={{ fontFamily:'HelveticaNeue', fontSize:'12px', marginTop:'10px;' }}><b>
                                Ticket ID: {data.ticket_id} | Ambassador ID: {data.ambid} | {timeConverter(data.dt)}</b></p>
                                <p><small>Ambassador Name: {data.fname} {data.lname}</small></p><br/>
                            <div className="row">
                                <div className="col-4">
                                    <div className="row">
                                        <div className="col-4">
                                            <i className="far fa-3x fa-image" style={{ color:"#000" }}></i>
                                        </div>
                                        <div className="col-8">
                                            {data.full_name}
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="col-6">

                                <div className="progress">
                                    <div className="progress-bar bg-danger" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                                </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-1">

                                </div>
                                <div className="col-9">
                                    <div className="btn-group mr-2" role="group" aria-label="Third group">
                                        <button type="button" className="btn btn-primary"><i className="fas fa-phone"></i></button>
                                    </div>
                                    <div className="btn-group" role="group" aria-label="Basic example" style={{ marginLeft: '2px' }}>
                                        <button type="button" className="btn btn-primary">Call Ambassador</button>
                                    </div>
                                    <p>
                                        { 
                                        btn?
                                            <button className="Rectangle-25" onClick={()=>{setBtn(false)}}>
                                        Next Step</button>: 
                                        
                                            <div className="row">
                                                <br/>
                                                <div className="col-4">
                                                    <i class="far fa-3x fa-image" style={{color:'blue'}}></i> <br /> <input type="radio" id="res" name="ac" value="res"></input>Reschedule
                                                </div>
                                                <div className="col-4">
                                                    <i class="far fa-3x fa-image" style={{color:'blue'}}></i> <br /> <input type="radio" id="pau" name="ac" value="pau"></input>Pause
                                                </div>
                                            </div>
                                        } 
                                    </p>  
                                    
                                </div>
                                <div className="col-2">
                                    <div style={{backgroundColor:'#ed6e6e',width: '10px',height: '10px',margin: '0 0px 48px', borderRadius:'100px'}}></div>
                                    <div style={{backgroundColor:'#ed6e6e',width: '34px',height: '34px',margin: '0 -9px 48px', borderRadius:'100px',left: '-2px',position: 'relative'}}></div>
                                    <div style={{backgroundColor:'#ed6e6e',width: '10px',height: '10px',margin: '0 0px 48px', borderRadius:'100px'}}></div>
                                    <div style={{backgroundColor:'#ed6e6e',width: '10px',height: '10px',margin: '0 0px 48px', borderRadius:'100px'}}></div>
                                    <div style={{
                                        backgroundColor: 'rgb(237, 110, 110)',
                                        width: '224%',
                                        height: '2px',
                                        position: 'relative',
                                        top: '-152px',
                                        left: '-98px',
                                        transform: 'rotate(-90deg)'
                                    }}></div>
                                </div>
                            </div>
                            </div>
                        
                        )
                    })
                
            }
        </div>
    )
}



function TicketUserDetails(props) {
    const id = props.match.params.id
    const [userInfo, setUserInfo] = useState([])
    useEffect(() =>{
        fetch('http://127.0.0.1:5000/get/ticket/'+id, {method: "GET"})
            .then(response => {
                return response.json()
            })
            .then(response =>{
                setUserInfo(response)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    console.log("Cust: ",userInfo)

    

    return (

        

        <div style={{marginTop:'5px'}}>

            {
                userInfo.map(usr =>{
                    return (
                        <div>
                        <div className="row">
                            <div className="col-10"><b>Custoemr Detils</b></div>
                            <div className="col-2"><i className="fas fa-phone"></i> <i className="fas fa-phone"></i></div>
                        </div>
                        <br />

                        <div className="row">
                        <div className="col-2"><img src="https://img.icons8.com/doodle/48/000000/user-male--v1.png"/></div>
                            <div className="col-8">{ usr.full_name }</div>
                            <div className="col-2"><i className="fas fa-phone"></i> <i className="fas fa-phone"></i></div>
                        </div>

                        <br />

                        <div className="row">
                            <div className="col-2"><i className="far fa-3x fa-image"></i></div>
                            <div className="col-10"> <b align="center">Time &amp; Address</b><br />
                                <div className="row">
                                    <div className="col-6">Slot Time</div>
                                    <div className="col-6">09:00</div>
                                </div>
                            </div>
                        </div>
                        <br /><br/>


                        <p style={{textAlign:'center'}}>ETA: 09:56 AM (4.6 kms)</p>
                        <div>
                            <div style={{width: '12px',height: '12px',margin: '1px 43px 12px 0',borderRadius:'100px',backgroundColor: '#000000'}}></div>
                            <div style={{width: '90%',height: '2px',margin: '1px 43px 12px 0',backgroundColor: '#000000', position:'relative',top:'-19px'}}></div>
                            <div style={{width: '12px',height: '12px',margin: '1px 43px 12px 0',borderRadius:'100px',backgroundColor: '#000000', position: 'relative',top: '-38px',left: '89%'}}></div>
                        </div>
                        <div className="row">
                            <div className="col-6"><small>G-20/282 GF-SEC 7</small><br/> <small>Rohini</small></div>
                            <div className="col-6"><small>{ usr.vendor_name }</small></div>
                        </div>

                        <br /><br />
                        <p align="center"><b>Network Partner Details</b></p>
                        <div>
                            <div style={{width: '12px',height: '12px',margin: '1px 43px 12px 0',borderRadius:'100px',backgroundColor: '#000000'}}></div>
                            <div style={{width: '90%',height: '2px',margin: '1px 43px 12px 0',backgroundColor: '#000000', position:'relative',top:'-19px'}}></div>
                            <div style={{width: '12px',height: '12px',margin: '1px 43px 12px 0',borderRadius:'100px',backgroundColor: '#000000', position: 'relative',top: '-38px',left: '89%'}}></div>
                        </div>



                        <p align="center"><img src="https://img.icons8.com/ios/50/000000/audi.png"/> <small>Akshaya Motors, Kengeri</small></p>
                        <div className="row cont">
                            <div className="col-2">
                                <img src="https://img.icons8.com/doodle/48/000000/user-male--v1.png"/>
                            </div>
                            <div className="col-8">
                                <p align="center"><b><small>Mr Ramu<br/>Service Advisor</small></b></p>
                            </div>
                            <div className="col-2"><i className="fas fa-phone"></i> <i className="fas fa-phone"></i></div>
                        </div>

                        <div className="row cont">
                            <div className="col-2">
                                <img src="https://img.icons8.com/doodle/48/000000/user-male--v1.png"/>
                            </div>
                            <div className="col-8">
                                <p align="center"><b><small>Mr Krishna<br/>CRE</small></b></p>
                            </div>
                            <div className="col-2"><i className="fas fa-phone"></i> <i className="fas fa-phone"></i></div>
                        </div>

                        <div className="row cont">
                            <div className="col-2">
                                <img src="https://img.icons8.com/doodle/48/000000/user-male--v1.png"/>
                            </div>
                            <div className="col-8">
                                <p align="center"><b><small>Mr Kumar<br/>Account Manager</small></b></p>
                            </div>
                            <div className="col-2"><i className="fas fa-phone"></i> <i className="fas fa-phone"></i></div>
                        </div>






                        </div>
                    )
                })
            }

            

            
            

            
            

            
            
        </div>
    )
}

function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
}

function TicketCHomeomponent() {
    return <h2>TicketCHomeomponent</h2>
}

function LoadTickets() {

    const [tickets, setTickets] = useState([])

    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/get/tickets')
        .then(res =>{
            setTickets(res.data)
        })
        .catch(error => {
            console.log(error)
        })
        
    },[])

/*=

*/
    
        return (
        
            tickets.map(ticket => {
                
                return(
                <div>

                <a href={"/ticket/"+ticket.ticket_id}>
                    <div className="row" style={{ padding: '5px', borderBottom: '1px solid rgb(213, 213, 213)' }}>
                        <div className="col-3">
                            <i className="far fa-3x fa-image" style={{ color:"#000" }}></i>
                        </div>
                        <div className="col-6">Accident / Breakdown</div>
                        <div className="col-3"><span className="text-right">05:03</span></div>
                    </div>
                </a>
                </div>


                )
                    
                

            })
        )
        

        
    
}


function Body(){
    
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-1 bg-primary" style={{ height: '900px', backgroundColor: 'linear-gradient(to bottom, #636dcd, #3541e9 97%)' }}>

                        <p style={{marginTop:'10px'}}>
                            <i className="far fa-3x fa-image" style={{ color:"#FFF" }}></i>
                        </p>
                        <p style={{marginTop:'10px'}}> 
                            <i className="far fa-3x fa-image" style={{ color:"#FFF", opacity:'0.5'}}></i>
                        </p>
                        <p style={{marginTop:'10px'}}> 
                            <i className="far fa-3x fa-image" style={{ color:"#FFF", opacity:'0.5' }}></i>
                        </p>
                    </div>

                    <div className="col-3 card card-secondary">
                        <p><a href="/ticket/#">Home</a></p>
                        <LoadTickets />
                    </div>

                    <div className="col-5 card card-secondary">
                        <Router>
                            <Switch>
                                <Route path="/ticket/#" component={TicketCHomeomponent} />
                                <Route path="/ticket/:id" component={TicketComponent} />
                            </Switch>
                        </Router>
                    </div>

                    <div className="col-3 card card-secondary">
                        <Router>
                            <Switch>
                                <Route exact path="/ticket/:id" component={TicketUserDetails} />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>

        )
}


export default Body