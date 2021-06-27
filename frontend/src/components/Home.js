import React, { Component } from 'react';//
import casa from '../assets/images/casa.png';
import '../styles/home.css';
import '../styles/index.css';
import '../styles/background.css';

export default class Home extends Component {
    constructor() {
      super();
      this.state = {
        message: 'Loading...'
      };
    }

    // Example to call api with fetch (axios is recomended)
    callAPI() {
        fetch("http://localhost:3000/")
            .then(res => res.text())
            .then(res => this.setState({ message: res }));
    }
  
  componentDidMount() {
      this.callAPI();
  }
    
    render() {
      return (
          <div className="backgroundContainer">
            <div className="boxHome">
                <img src={casa} alt="Casa logo." />
                <p className="welcome"><b>Bem-vindo à <span className="textCasa">Casa</span>!</b></p>
            </div>
          </div>
      );
    }
  }