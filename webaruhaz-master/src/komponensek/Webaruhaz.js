import React from "react";
import Termek from "./Termek";
import Kosar from "./Kosar";
import Menu from "./Menu";
import Keresomezo from "./KeresoMezo";
import Ajax from "./Ajax";
import "./Termekek.css";


class Termekek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termekek: [],
      kosar: [],
      kosarMennyiseg : 0,
      keresettTermekek:[]
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
      <Keresomezo kereses={this.handleChange} talaltTermekek={this.state.keresettTermekek}   vasarol={this.vasarol}></Keresomezo>
      <div className="Kosar-Termekek">
       
        
        <Kosar
          kosarTermekek={this.state.kosarTermekek}
          kosar={this.state.kosar}
          torol = {this.torol}
          kosarUrit = {this.kosarUrit}
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

  kosarUrit=()=>{

    this.setState({
      kosar:[],
      kosarMennyiseg:0,
      kosarTermekek:null
    });
   
    
  }

  vegOsszeg = () => {
    let vegar = 0;
    for (let index = 0; index < this.state.kosar.length; index++) {
      vegar += this.state.kosar[index].ar;
    }

    return vegar;
  }

  handleChange=(event)=>{
      let keresendoSzo = event.target.value;
      let eredmeny = this.state.termekek.filter(termek=>{ return (termek.title.toLowerCase()).includes(keresendoSzo) ||  termek.title.includes(keresendoSzo) || termek.title.toUpperCase().includes(keresendoSzo)});
      if(keresendoSzo.length>0){
        this.setState({keresettTermekek:eredmeny});
      }
      else{
        this.setState({keresettTermekek:[]});
      }
      
  }

}

export default Termekek;
