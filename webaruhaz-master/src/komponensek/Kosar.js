import React from "react";
import Termek from "./Termek";
import "./Kosar.css";

class Kosar extends React.Component {
  constructor(props) {
    super(props);
  }

  termekDarab(termek) {
    let db = 0;
    this.props.kosar.forEach((elem) => {
      if (elem.id == termek.id) {
        db++;
      }
    });
    return db;
  }

  render() {
    if (this.props.kosarTermekek != undefined) {
      this.termekTomb = [];
      this.props.kosarTermekek.forEach((termek) => {
        this.termekTomb.push(termek);
      });

      return (
        <div>
          <div className="Kosar">
            <div>
            {this.termekTomb.map((termek, index) => {
              return (
                <div className="Kosar-darab" key={index}>
                  <Termek
                    cim={termek.title}
                    key={index}
                    ar={termek.ar}
                    kep={termek.img}
                    kosarban={true}
                    id={termek.id}
                    torol={this.props.torol}
                  ></Termek>
                  <span className="Kosar-darab darab-badge">
                    {this.termekDarab(termek)}
                  </span>
                </div>
              );
            })}
            </div>
            <div className="Vegosszeg">
              <div className="Vegosszeg-ar">
              <span>Végösszeg</span>
              <span >{this.props.ar} $</span>
              </div>
              <div className="Button-Group">
              <button onClick={this.props.kosarUrit} className="Urit">Ürít</button>
              <button onClick={this.props.kosarUrit} className="Fizet">Fizetes</button>
              </div>
            </div>
          </div>
          
        </div>
      );
    } else {
      return  <div className="Ures"></div>
    }
  }
}

export default Kosar;
