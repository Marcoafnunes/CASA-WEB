import React, {Component} from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import '../styles/index.css';
import '../styles/background.css';
import '../styles/resetPassword.css';
import Background from "../assets/images/blurporto.png";

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
          email:'',
          password: '',
          confirmPassword: '',
          update: false,
          isLoading: true, 
          error: false,
          };
        this.handleChange = this.handleChange.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        console.log(this.state);
      }

  // Validate password recovery link
  async componentDidMount() {
    const { match: { params } } = this.props;
      await axios.get(`http://localhost:3000/api/reset/${params.resetPasswordToken}`)
        .then(response => {
            console.log("reset response: ", response)
            if(response.data.message === 'password reset link working') {
                this.setState({
                    email: response.data.email,
                    updated: false,
                    isLoading: false,
                    error: false
                })
            } else {
                this.setState({
                    update: false,
                    isLoading: false,
                    error: false
                })
            }
        })
        .catch(error => {
            console.log(error.data)
        })
      }

  // Get input (new password and confirm password)
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value,
    });
  }

  // Compare password and password confirmation
  handleConfirmPassword = () => {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        password: '',
        confirmPassword: ''
      })
      alert("passwords dont match")
    }
  }

  // Submit and update password
  updatePassword(event) {
    event.preventDefault();
    axios.put('http://localhost:3000/api/updatePassword', {
        email: this.state.email,
        password: this.state.password
    })
    .then(response => {
      console.log('Data from Update Password: ', response.data.message)
      if (response.data.message === 'Password updated') {
        this.setState({
          updated: true,
          error: false
        })
      } else {
        this.setState({
            updated: false,
            error: true
          })
        }
      })
      .catch(error => {
        console.log(error.data)
      })
    }
    
    //Clean form after submit
    clear = () =>{
    this.setState({
      email: ""
    });
    }

    // Render password reset form
    render() {
      const { error, isLoading, updated} = this.state;
      /* Password not updated' */
      if (error) {
          return (
              <div className="backgroundContainer">
                  <img src={Background} className="background" alt="Background"/>
                  <div className="boxReset">
                      <h1>Password Reset</h1>
                      <div>
                        <p>Problem reseting password. Please try again.</p>
                            <Link to={`/resetpassword`}>
                                <Button type="primary" htmlType="submit" className="login-form-button">Reset Password</Button>
                            </Link>
                        <p><a className="" href="http://localhost:5000/login">Sign In</a></p>
                      </div>
                  </div>
              </div>
          )
      } else if (isLoading) {
          return (
              <div className="backgroundContainer">
                  <img src={Background} className="background" alt="Background"/>
                  <div className="box">
                    <h1>Password Reset</h1>
                    <p>Loading User Data...</p>
                  </div>
              </div>
          )
      } else {
          return (
              <div className="backgroundContainer">
                  <img src={Background} className="background" alt="Background"/>
                  <div className="boxReset">
                      <p className="title">Alterar a senha</p>

                      <Form
                      name="normal_login"
                      className="login-form"
                      initialValues={{
                        remember: true,
                      }}>
                        <div className="mb-4 text-center">
                            <span className="">Por favor insira a nova senha!  </span>
                        </div>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Por favor insira a nova password!',
                          },
                        ]}
                        hasFeedback
                      >
                      <Input className="caixaMail"type="password" name="password" placeholder="Nova senha"  value={this.state.password} onChange={this.handleChange}/>
                      </Form.Item>
                      <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'Por favor confirme a sua password!',
                          },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('As senhas devem ser iguais!');
                                },
                            }),
                        ]}
                      >
                      <Input className="caixaMail" type="password" name="password" placeholder="Confirm Password"/>
                      </Form.Item>

                      <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.updatePassword}>
                          Atualizar senha
                        </Button>
                      </Form.Item>

                      {updated && (
                          <div>
                            <p className="messageUpdate">A sua senha foi atualizada,por favor tente entrar novamente!</p>
                            <Link to={`/login`}>
                                <Button type="primary" htmlType="submit" className="login-form-button">Login</Button>
                            </Link>
                        </div>
                      )}
                      </Form>
                  </div>
              </div>
      );
    }
  };
}  
export default ResetPassword;
    
    