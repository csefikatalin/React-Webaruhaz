import React from "react";
import Termek from "./Termek";
import Kosar from "./Kosar";
import Menu from "./Menu";
import Keresomezo from "./KeresoMezo";
import Ajax from "./Ajax";
import "./Webaruhaz.css";


class Termekek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termekek: [],
      kosar: [],
      kosarMennyiseg : 0,
      keresettTermekek:[],
      megjelenitettTermekek:[]
    };
    
  }
 
  ajax() {
    new Ajax().ajaxGet((termekek) => {
      this.setState({ termekek: termekek, megjelenitettTermekek:termekek });
     
    });
  }

  componentDidMount(){
    this.ajax();
  }


  pagination=()=>{
    let gombTomb = [] ;
    let gombSzama = 1;
    gombTomb.push(<button key={"balra"} onClick={(event)=>{this.balra(event)}}>{"<"}</button>)
    for (let index = 0; index < this.state.termekek.length; index++) {
      if(index%5==0) 
      {
        gombTomb.push(<button className="pagination-button"  key={index} onClick={(event)=>{this.megjelenit(index,event)}}>{gombSzama}</button>)
        gombSzama++;
      }
    }
    gombTomb.push(<button key={"jobbra"} onClick={(event)=>{this.jobbra(event)}}>{">"}</button>)
    gombTomb.push(<button key={"osszes"} onClick={()=>{this.setState({megjelenitettTermekek:this.state.termekek})}}>Összes</button>)
    return gombTomb;
  }

  megjelenit(index,event){
    
    let i = index;
    let megjelentiheto = [];
    let gombok = document.querySelectorAll(".pagination-button");
    gombok.forEach(gomb=>{gomb.classList.remove("focus");})
    event.target.classList.add("focus");
    while(i<index+5 && i<this.state.termekek.length){
      megjelentiheto.push(this.state.termekek[i]);
      i++;
    }
    
    this.setState({megjelenitettTermekek:megjelentiheto,aktivOldal:index});
  }

  gombSzinez(index){
    let gombok = document.querySelectorAll(".pagination-button");
    let szinezheto = index/5;
    console.log(index," ",szinezheto)

    for (let index = 0; index < gombok.length; index++) {
        if(index==szinezheto){
          gombok[index].classList.add("focus");
        }
      
    }
  }
  
  balra(event){
    let balIndex = this.state.aktivOldal-5;
    let max = document.querySelectorAll(".pagination-button").length*5-5;
    if(balIndex<0){
      balIndex=max;
      this.megjelenit(balIndex,event);
    }
    else{
      this.megjelenit(balIndex,event);
    }
    this.gombSzinez(balIndex)

    event.target.classList.remove("focus");
  }

  jobbra(event){
    let jobbIndex = this.state.aktivOldal+5;
    if(jobbIndex>this.state.termekek.length){
      jobbIndex=0;
      this.megjelenit(0,event);
    }
    else{
          
      this.megjelenit(jobbIndex,event);
    }
    this.gombSzinez(jobbIndex)
  

    event.target.classList.remove("focus");
  }

  render() {
    return (
      <div>
     
      <div className="Menu-Kereses">
      <Keresomezo kereses={this.handleChange} talaltTermekek={this.state.keresettTermekek}   vasarol={this.vasarol}></Keresomezo>
      <Menu darab={this.state.kosarMennyiseg}></Menu>
      </div>
      <div className="bg"><h2><span className="cursive">Welcome to</span><span className="vastag">Candy Land</span></h2></div> 
      
      <div className="Kosar-Termekek">
       
        
        <Kosar
          kosarTermekek={this.state.kosarTermekek}
          kosar={this.state.kosar}
          torol = {this.torol}
          kosarUrit = {this.kosarUrit}
          ar={this.vegOsszeg()}
        />
         
        <div >

          <div className="gombok">
          {this.pagination()}
          </div>

          <div className="Termekek">
          
          {this.state.megjelenitettTermekek.map((termek, index) => {
           
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
