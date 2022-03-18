import React from "react";
import './Szamlalo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
class Szamlalo extends React.Component{
    constructor(props){
        super(props);
        
    }
    
    render(){
        return(
            <div className="Szamlalo"><FontAwesomeIcon icon={faCartShopping}  className="cart"/><span className="darab">{this.props.darab.length}</span></div>
        )
    }
}

export default Szamlalo;
