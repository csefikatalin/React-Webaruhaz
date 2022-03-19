import React from "react";
import Termek from "./Termek";
import Kosar from "./Kosar";
import Menu from "./Menu";
import Ajax from "./Ajax";
import "./Termekek.css";


class Termekek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termekek: [],
      kosar: [],
      kosarMennyiseg : 0
    };
 
  }
 
  ajax() {
    new Ajax().ajaxGet((termekek) => {
      this.setState({ termekek: termekek });
    });
  }

  componentDidMount(){
    this.ajax();
  }

  
  render() {
    return (
      <div>
     
      <div>
        
      <Menu darab={this.state.kosarMennyiseg}></Menu>
      </div>
      <div className="bg"><h2><span className="cursive">Welcome to</span><span className="vastag">Candy Land</span></h2></div> 
      <div className="Kosar-Termekek">
       
      
        <Kosar
          kosarTermekek={this.state.kosarTermekek}
          kosar={this.state.kosar}
          torol = {this.torol}
          ar={this.vegOsszeg()}
        />
         
      
        <div className="Termekek">
          {this.state.termekek.map((termek, index) => {
            return (
              <Termek
                cim={termek.title}
                kep={termek.img}
                key={index}
                id={termek.id}
                ar={termek.ar}
                ertekeles={termek.ertekeles}
                vasarol={this.vasarol}
                
              />
              
            );
          })}
        </div>
      </div></div>
    );
  }
  


  vasarol = (index) => {
    const atmeneti = this.state.kosar;
    atmeneti.push(this.state.termekek[index]);
    this.setState({
      kosar: atmeneti,
    });
    this.kosarTermekek();
  }

  torol = (index) => {
    const atmeneti = this.state.kosar;
    const torlesUtan = atmeneti.find(elem=>{
      return elem.id==index
    });

    let toroltELem = atmeneti.indexOf(torlesUtan);
    atmeneti.splice(toroltELem,1);
    this.setState({
      kosar: atmeneti,
    });  
    this.kosarTermekek();
  };


  kosarTermekek(){
    const kosarTermekek = new Set();
    this.state.kosar.forEach(t=>{
    kosarTermekek.add(t);
    });
    this.setState({kosarTermekek:kosarTermekek,kosarMennyiseg:kosarTermekek.size});
  }


  vegOsszeg = () => {
    let vegar = 0;
    for (let index = 0; index < this.state.kosar.length; index++) {
      vegar += this.state.kosar[index].ar;
    }

    return vegar;
  };
}

export default Termekek;
