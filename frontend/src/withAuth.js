import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

//It will take a component we want to protect
//The users cant access it unless they are logged in
export default function withAuth(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }

        componentDidMount() {
          //GET message from server using fetch api
          axios.get('http://localhost:3000/checkToken', {
            withCredentials: true})          
              .then(res=> {
                console.log('checkToken status =', res.status)
                if (res.status === 200) {
                this.setState({loading: false});
              } else {
                const error = new Error(res.error);
                throw error;
                }
              })
              .catch (err => {
                console.error(err);
                this.setState({loading: false, redirect: true})
              }); 
    }
    render() {
        const { loading, redirect } = this.state;
        if (loading) {
            return null;
        }
        if (redirect) {
            return <Redirect to="/login" />;
        }
        return <ComponentToProtect {...this.props} />;
      }
    }
}