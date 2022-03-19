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
            <div className="Vegosszeg">
              <span>Végösszeg</span>
              <span className="Vegosszeg-ar">{this.props.ar} $</span>
            </div>
          </div>
        </div>
      );
    } else {
      return  <div className="Kosar"></div>
    }
  }
}

export default Kosar;
