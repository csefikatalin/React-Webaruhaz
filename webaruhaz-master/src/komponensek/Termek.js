import React from "react";
import './Termek.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {faMinus} from '@fortawesome/free-solid-svg-icons';

class Termek extends React.Component{
    constructor(props){
        super(props);
    }

    ertekel(){
        
        let csillagTomb = [];
        for (let index = 0; index < this.props.ertekeles; index++) {
            csillagTomb.push(<FontAwesomeIcon icon={faStar}  className="star" key={index}/>);
            
        }
        return csillagTomb;
    }

    render(){
        if(this.props.kosarban){
            return (<div className="Kep">
            
            <div className="kep"><img src={this.props.kep} alt="termekkep"></img></div>
            <div className="ertekeles">
            {this.ertekel()}
            </div>
            <div className="cim">{this.props.cim}</div>
            <div className="ar">{this.props.ar} <span className="dollar">$</span></div>
            <button onClick={()=>{
                    this.props.torol(this.props.id);
                    }}><FontAwesomeIcon icon={faMinus} /></button>
        </div>)
        }
        else{
            return (<div className="Kep">
            
            <div className="kep"><img src={this.props.kep} alt="termekkep"></img></div>
            <div className="ertekeles">
            {this.ertekel()}
            </div>
            <div className="cim">{this.props.cim}</div>
            <div className="ar">{this.props.ar} <span className="dollar">$</span></div>
            <div className="Button-Group">
                <button onClick={()=>{
                    this.props.vasarol(this.props.id);
                    }}>Add to cart</button>
            </div>
        </div>)
        }
        
    }
}

export default Termek;