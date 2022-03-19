import React from "react";
import './KeresoMezo.css';
import Termek from './Termek';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from '@fortawesome/free-solid-svg-icons'

class Keresomezo extends React.Component{
    constructor(props){
        super(props)
    }

    lenyit(){
        document.querySelectorAll(".Talalt-elemek").style.height ="500px";
    }

    render() {
        return (
            <div>
            <div className="Kereso-container">
                <div className="Kereso">
                <span><FontAwesomeIcon icon={faSearch}/></span><input type="search" placeholder="Search..." onChange={this.props.kereses}></input>
                </div>
                <div className="Talalt-elemek">
                {       
                this.props.talaltTermekek.map((termek,index)=>{
                return (
                    <Termek
                      cim={termek.title}
                      kep={termek.img}
                      key={index}
                      id={termek.id}
                      ar={termek.ar}
                      ertekeles={termek.ertekeles}
                      vasarol={this.props.vasarol}
                    />
                  );
            })}
            </div>
          
            </div> 
            
            </div>
        )
    }
}

export default Keresomezo;