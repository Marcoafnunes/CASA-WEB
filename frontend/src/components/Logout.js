import React, {Component} from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { Button } from 'antd';
import '../styles/App.css';
import '../styles/logout.css';
import '../styles/index.css';
import casa from "../assets/images/casa.png";

class Logout extends Component {
      //Set default message
      state = {
        navigate: false
      };

    //Remove token and loggedIn status from Cookies
    logout = () => {
        Cookies.remove("loggedIn");
        Cookies.remove("token");
        this.setState({navigate: true});
    };

    refreshPage() {
      window.location.reload(false);
    }

    // Render logout confirmation
    render() {
      const { navigate } = this.state;
      if (navigate) {
        return <Redirect to="/login" push={true} />;
      }
      return (
        <div className="boxLogout">
            <img src={casa}  alt="Casa logo."/>
            <span className="textLogout">Deseja realizar Logout?</span>
            <Button className="button-logout" type="link" onClick={(e) => { this.logout(e); this.refreshPage();}}>Logout</Button>
        </div>)
    }
}

export default Logout;