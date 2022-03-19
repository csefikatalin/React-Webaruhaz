import React from "react";
import Szamlalo from "./Szamlalo";
import './Menu.css';
class Menu extends React.Component {
  constructor(props) {
    super(props);
  }




  render() {
    return (
    <div>
        
       <div className="Header">
        <div><a className="Home">Home</a></div>
        <div><a>Products</a></div>
        <div><a>About</a></div>
        
        <Szamlalo darab={this.props.darab}></Szamlalo>
      </div>
      </div>
    );
  }
}

export default Menu;
