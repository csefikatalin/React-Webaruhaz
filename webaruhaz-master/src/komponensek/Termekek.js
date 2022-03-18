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
      kosarDb: {},
      kosarCounter: [],
    };
    this.ajax();
  }

  ajax() {
    new Ajax().ajaxGet((termekek) => {
      this.setState({ termekek: termekek });
    });
  }

  vasarol = (index) => {
    const atmeneti = this.state.kosar;
    atmeneti.push(this.state.termekek[index]);
    this.setState({
      kosar: atmeneti,
    });
    this.TermekPerDarab(index);
  };

    TermekPerDarab = (index) => {
    let darabok = this.state.kosarDb;
    let aktualis = this.state.termekek[index];
    let termekNev = this.state.termekek[index].title;
    if (darabok[termekNev]) {
      let ujDb = (darabok[termekNev].db += 1);
      darabok[termekNev] = { 
        nev: termekNev,
        db: ujDb,
        kep: aktualis.img,
        ar:aktualis.ar };
    } else {
      darabok[termekNev] = { nev: termekNev, db: 1,kep: aktualis.img,
        ar:aktualis.ar };
    }
    this.setState({ kosarDb: darabok });
    this.kosarSzamol();
  };


  kosarSzamol = () => {
    let tomb = [];
    for (const key in this.state.kosarDb) {
      if (Object.hasOwnProperty.call(this.state.kosarDb, key)) {
        const element = this.state.kosarDb[key];
        tomb.push(element);
      }
    }
    this.setState({ kosarCounter: tomb });
  };


  vegOsszeg = () => {
    let vegar = 0;
    for (let index = 0; index < this.state.kosar.length; index++) {
      vegar += this.state.kosar[index].ar;
    }
    return vegar;
  };

  render() {
    return (
      <div>
     
      <div>
        
      <Menu darab={this.state.kosarCounter}></Menu>
      </div>
      <div className="bg"><h2><span className="cursive">Welcome to</span><span className="vastag">Candy Land</span></h2></div> 
      <div className="Kosar-Termekek">
       
      
        <Kosar
          kosar={this.state.kosar}
          szamlalok={this.state.kosarCounter}
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
}

export default Termekek;
