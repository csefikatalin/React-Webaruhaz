import React from "react";
import Termek from "./Termek";
import './Kosar.css';

class Kosar extends React.Component {
  constructor(props) {
    super(props);
   
    
  }

  
  render() {
    
    return(
    <div>
    <div className="Kosar">
     {this.props.szamlalok.map((termek,index)=>{
        return(<div className="Kosar-darab" key={index}>
          <Termek 
        cim={termek.nev}
        key={index}
        ar={termek.ar}
        kep={termek.kep}
        
        ></Termek>
        <span className="Kosar-darab darab-badge">{termek.db}</span>
        </div>
        )
     })}
      <div className="Vegosszeg"><span>Végösszeg</span><span className="Vegosszeg-ar">{this.props.ar}</span></div>
    </div>
   
    </div>
    )
  }
}

export default Kosar;
