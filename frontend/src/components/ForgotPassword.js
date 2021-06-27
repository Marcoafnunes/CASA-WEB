import React, {Component} from 'react';
import axios from 'axios';
import '../styles/App.css';
import '../styles/index.css';
import '../styles/background.css';
import '../styles/forgotPassword.css';
//import Cookies from 'js-cookie';
import 'antd/dist/antd.css';
import '../styles/index.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Background from "../assets/images/blurporto.png";

class ForgotPassword extends Component {
constructor(props) {
    super(props);
    this.state = {
      email:'',
      showError: false, 
      serverMsg: ''
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.state);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value,
    });
  }

  // Submit the email to reset password
  handleSubmit(event) {
    event.preventDefault();
    const request = {
      email: this.state.email,
    };
    console.log("handleSubmit email: ", request)
    // If empty field
    if (request === '') {
      this.setState({
        showError: false, 
        serverMsg: ''
      })
    } else {
    axios.post('http://localhost:3000/api/forgotpassword', request,  {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Data from Reset form: ', response.data.message)
      if (response.data.message === 'Email does not exists') {
        this.setState({
          showError: true, 
          serverMsg: ''
        })
      } else if (response.data.message === 'Recovery email sent') {
        this.setState({
          showError: false,
          serverMsg: "Recovery email sent"
        })
      }
      })
      .catch(error => {
        console.log("teste", error)
      })
    }
  }

  //Clean form after submit
  clear = () =>{
    this.setState({
      email: ""
    });
  }

  //Reset password form
  render() {
    const {serverMsg, showNullError, showError} = this.state;
    return (
      <div className="backgroundContainer">
        <img src={Background} className="background" alt="Background"/> 
        <div className="box-forgot">
          <p className="titleReset">Recuperar senha</p>
          <Form
            name="normal_login"
            className="login-form-forgot"
            initialValues={{
              remember: true,
            }}
            //onFinish={onFinish}
            >
            <div className="mb-4 text-center">
              <span className="texto">Sem problema! Insira o seu e-mail e enviaremos um link para redefinir a senha.</span>
            </div>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
            <Input className="inputMail" prefix={<UserOutlined className="site-form-item-icon" />} type="text" name="email" placeholder="Email"  value={this.state.email} onChange={this.handleChange}/>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" className="login-form-button-reset" onClick={this.handleSubmit}>
                Recuperar senha
              </Button>
            </Form.Item>
            {showNullError && (
              <div>
                <p>
                  Please insert a valid email.
                </p>
              </div>
            )}
            {showError && (
              <div>
                <p>
                  That email address isn't recongnized. Please try again or register for a new account.
                </p>
                <Link to={`/register`}>
                  <Button type="primary" htmlType="submit" className="login-form-button">Register</Button>
                </Link>
              </div>
            )}
            {serverMsg === 'Recovery email sent' && (
              <div className="message">
                <p>Por favor consulte o seu email!.</p>
              </div>
            )}

            <div className="text-center">
              <span>Lembrou-se?&nbsp;</span>
              <a className="" href="http://localhost:5000/login">
                  Login
              </a>
            </div>
          </Form>
        </div>
      </div>
    );
  };
}  
export default ForgotPassword;

