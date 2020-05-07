import React, { Component } from 'react';
import {Navbar, Button, Nav} from 'react-bootstrap';
import './NavBars.css';


class SideBar extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <React.Fragment>
      <div id='left' className='leftOpen' >
                   <div className={`sidebar $leftOpen`} >
                       <div className='content'>
                           <p>
                             Skapa grupp +
                           </p>
                           <p>
                             Filmgruppen
                           </p>
                           <p>
                             Bokklubben
                           </p>
                           <p>
                             Matgänget
                           </p>
                       </div>
                   </div>
               </div>
    </React.Fragment>
    )
  }
}

export default SideBar
