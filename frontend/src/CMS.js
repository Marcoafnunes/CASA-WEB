import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
//import  './assets/images';
import './styles/index.css';
import './styles/App.css';
import {Menu, Layout} from 'antd';
import Home from './components/Home';
import Logout from './components/Logout';
import withAuth from './withAuth';
import ItemLogo from './assets/images/casa.png';
import Cookies from 'js-cookie';
import Items from './components/Item/Items';
import User from "./components/Users/User";
import UserForm from './components/Users/UserForm';
import ItemForm from './components/Item/ItemForm';
import ItemInfo from './components/Item/ItemInfo';
import UserInfo from './components/Users/UserInfo';
import Profile from './components/Profile';
import MediaQuery from 'react-responsive'


const { Content, Sider } = Layout;

const logout = () => () => {
  Cookies.remove("loggedIn");
  Cookies.remove("token");
}

//Navigation Bar and Routes
export default class NavBar extends Component {

  state = {
    theme: 'dark',
    current: '1',
    collapsed: false
  };

  // Cliques no menu 
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  // Menu colapsável
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

render() {
  if(Cookies.get('token')) {  
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
        <MediaQuery minWidth={992}>
          <Sider>
            <div><img src={ItemLogo} className="navbarLogo" alt=""/></div>
            <Menu theme="dark">
              <Menu.Item key="1">
                <svg id="home_white_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path id="Caminho_1" data-name="Caminho 1" d="M0,0H24V24H0Z" fill="none"/>
                  <path id="Caminho_2" data-name="Caminho 2" d="M12,5.69l5,4.5V18H15V12H9v6H7V10.19l5-4.5M12,3,2,12H5v8h6V14h2v6h6V12h3Z" fill="#fff"/>
                </svg>
                <span>Home</span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item key="2">
                <svg id="person_white_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path id="Caminho_5" data-name="Caminho 5" d="M0,0H24V24H0Z" fill="none"/>
                  <path id="Caminho_6" data-name="Caminho 6" d="M12,6a2,2,0,1,1-2,2,2.006,2.006,0,0,1,2-2m0,10c2.7,0,5.8,1.29,6,2H6c.23-.72,3.31-2,6-2M12,4a4,4,0,1,0,4,4A4,4,0,0,0,12,4Zm0,10c-2.67,0-8,1.34-8,4v2H20V18C20,15.34,14.67,14,12,14Z" fill="#fff"/>
                </svg>
                <span>Perfil</span>
                <Link to="/profile" />
              </Menu.Item>
              <Menu.Item key="3">
                <svg id="restaurant_white_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path id="Caminho_3" data-name="Caminho 3" d="M0,0H24V24H0Z" fill="none"/>
                  <path id="Caminho_4" data-name="Caminho 4" d="M16,6v8h3v8h2V2C18.24,2,16,4.24,16,6ZM11,9H9V2H7V9H5V2H3V9a4,4,0,0,0,4,4v9H9V13a4,4,0,0,0,4-4V2H11Z" fill="#fff"/>
                </svg>
                <span>Relatórios</span>
                <Link to="/item" />
              </Menu.Item>
              <Menu.Item key="4">
                <svg id="people_black_24dp" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
                  <path id="Caminho_13" data-name="Caminho 13" d="M0,0H26V26H0Z" fill="none"/>
                  <path id="Caminho_14" data-name="Caminho 14" d="M9.583,14.479C7.048,14.479,2,15.747,2,18.271v1.9H17.167v-1.9C17.167,15.747,12.118,14.479,9.583,14.479ZM4.535,18a10.445,10.445,0,0,1,5.048-1.354A10.445,10.445,0,0,1,14.632,18Zm5.048-5.417A3.792,3.792,0,1,0,5.792,8.792,3.8,3.8,0,0,0,9.583,12.583Zm0-5.417A1.625,1.625,0,1,1,7.958,8.792,1.623,1.623,0,0,1,9.583,7.167Zm7.627,7.377a4.542,4.542,0,0,1,2.123,3.727v1.9h4.333v-1.9C23.667,16.083,19.875,14.837,17.21,14.544Zm-1.127-1.961a3.792,3.792,0,1,0,0-7.583,3.733,3.733,0,0,0-1.625.379,5.916,5.916,0,0,1,0,6.825A3.733,3.733,0,0,0,16.083,12.583Z" transform="translate(0.167 0.417)" fill="#fff"/>
                </svg>
                <span>Utilizadores</span>
                <Link to="/user" />
              </Menu.Item>
              <Menu.Item className="dashLogout" key="5" onClick={logout()}>
                <svg id="logout_white_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <g id="Grupo_1" data-name="Grupo 1">
                    <path id="Caminho_7" data-name="Caminho 7" d="M0,0H24V24H0Z" fill="none"/>
                  </g>
                  <g id="Grupo_2" data-name="Grupo 2">
                    <path id="Caminho_8" data-name="Caminho 8" d="M17,8,15.59,9.41,17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4ZM5,5h7V3H5A2.006,2.006,0,0,0,3,5V19a2.006,2.006,0,0,0,2,2h7V19H5Z" fill="#fff"/>
                  </g>
                </svg>
                <span>Logout</span>
                <Link to="/logout" />
              </Menu.Item>
            </Menu>
          </Sider>
          </MediaQuery>
          <MediaQuery maxWidth={992}>
          <Sider>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1">
                <svg id="home_white_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path id="Caminho_1" data-name="Caminho 1" d="M0,0H24V24H0Z" fill="none"/>
                  <path id="Caminho_2" data-name="Caminho 2" d="M12,5.69l5,4.5V18H15V12H9v6H7V10.19l5-4.5M12,3,2,12H5v8h6V14h2v6h6V12h3Z" fill="#fff"/>
                </svg>
                <span>Home</span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item key="2">
                <svg id="person_white_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path id="Caminho_5" data-name="Caminho 5" d="M0,0H24V24H0Z" fill="none"/>
                  <path id="Caminho_6" data-name="Caminho 6" d="M12,6a2,2,0,1,1-2,2,2.006,2.006,0,0,1,2-2m0,10c2.7,0,5.8,1.29,6,2H6c.23-.72,3.31-2,6-2M12,4a4,4,0,1,0,4,4A4,4,0,0,0,12,4Zm0,10c-2.67,0-8,1.34-8,4v2H20V18C20,15.34,14.67,14,12,14Z" fill="#fff"/>
                </svg>
                <span>Perfil</span>
                <Link to="/profile" />
              </Menu.Item>
              <Menu.Item key="3">
                <svg id="restaurant_white_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path id="Caminho_3" data-name="Caminho 3" d="M0,0H24V24H0Z" fill="none"/>
                  <path id="Caminho_4" data-name="Caminho 4" d="M16,6v8h3v8h2V2C18.24,2,16,4.24,16,6ZM11,9H9V2H7V9H5V2H3V9a4,4,0,0,0,4,4v9H9V13a4,4,0,0,0,4-4V2H11Z" fill="#fff"/>
                </svg>
                <span>Relatórios</span>
                <Link to="/item" />
              </Menu.Item>
              <Menu.Item key="4">
                <svg id="people_black_24dp" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
                  <path id="Caminho_13" data-name="Caminho 13" d="M0,0H26V26H0Z" fill="none"/>
                  <path id="Caminho_14" data-name="Caminho 14" d="M9.583,14.479C7.048,14.479,2,15.747,2,18.271v1.9H17.167v-1.9C17.167,15.747,12.118,14.479,9.583,14.479ZM4.535,18a10.445,10.445,0,0,1,5.048-1.354A10.445,10.445,0,0,1,14.632,18Zm5.048-5.417A3.792,3.792,0,1,0,5.792,8.792,3.8,3.8,0,0,0,9.583,12.583Zm0-5.417A1.625,1.625,0,1,1,7.958,8.792,1.623,1.623,0,0,1,9.583,7.167Zm7.627,7.377a4.542,4.542,0,0,1,2.123,3.727v1.9h4.333v-1.9C23.667,16.083,19.875,14.837,17.21,14.544Zm-1.127-1.961a3.792,3.792,0,1,0,0-7.583,3.733,3.733,0,0,0-1.625.379,5.916,5.916,0,0,1,0,6.825A3.733,3.733,0,0,0,16.083,12.583Z" transform="translate(0.167 0.417)" fill="#fff"/>
                </svg>
                <span>Utilizadores</span>
                <Link to="/user" />
              </Menu.Item>
              <Menu.Item className="dashLogout" key="5" onClick={logout()}>
                <svg id="logout_white_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <g id="Grupo_1" data-name="Grupo 1">
                    <path id="Caminho_7" data-name="Caminho 7" d="M0,0H24V24H0Z" fill="none"/>
                  </g>
                  <g id="Grupo_2" data-name="Grupo 2">
                    <path id="Caminho_8" data-name="Caminho 8" d="M17,8,15.59,9.41,17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4ZM5,5h7V3H5A2.006,2.006,0,0,0,3,5V19a2.006,2.006,0,0,0,2,2h7V19H5Z" fill="#fff"/>
                  </g>
                </svg>
                <span>Logout</span>
                <Link to="/logout" />
              </Menu.Item>
            </Menu>
          </Sider>
          </MediaQuery>
          <Layout>
            <Content
              style={{
                background: "#FFF",
                minHeight: 280
              }}
            >
              <Switch>
                <Route path="/" exact component={withAuth(Home)} />
                <Route exact path="/item/new" component={withAuth(ItemForm)} />
                <Route exact path="/item/:itemId" component={withAuth(ItemInfo)} />
                <Route exact path="/user/new" component={withAuth(UserForm)} />
                <Route exact path="/user/:userId" component={withAuth(UserInfo)} />
                <Route path="/profile" component={withAuth(Profile)} />
                <Route path="/item" component={withAuth(Items)} />
                <Route path="/user" component={withAuth(User)} />
                <Route path="/logout" component={Logout} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
  )} else {
    return <Redirect to="/login" />;
      } 
    }
  }

