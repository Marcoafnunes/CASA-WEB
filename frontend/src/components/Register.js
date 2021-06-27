import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'antd/dist/antd.css';
import '../styles/index.css';
import '../styles/background.css';
import '../styles/register.css';
import {
  Form,
  Input,
  // eslint-disable-next-line
  Tooltip,
  Checkbox,
  Button,
} from 'antd';
// eslint-disable-next-line
import { QuestionCircleOutlined } from '@ant-design/icons'; 
import Background from "../assets/images/blurporto.png";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 6,
    },
  },
};

class Register extends Component {
constructor(props) {
    super(props);
    this.state = {
      email:'',
      password: '',
      nickname: '',
      residence: '',
      phone: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.state);
  }

  // Get input
  handleChange(event) {

    this.setState({[event.target.name]: event.target.value,
    });
    console.log(this.setState)
  }

  // Submit register info
  handleSubmit(event) {
    event.preventDefault();
    const request = {
      email: this.state.email,
      password: this.state.password,
      nickname: this.state.nickname,
      residence: this.state.residence,
      phone: this.state.phone,
    };
    //call axios
    axios.post('http://localhost:3000/api/register', request,  {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch( err => {
      console.log(err);
    })
  }

  // Render register form
  render() {
    return (
      <div className="backgroundContainer">
        <img src={Background} className="background" alt="Background"/>
        <div className="boxRegister">
          <p className="title">Registar</p>
          <Form
          {...formItemLayout}
          //form={form}
          name="register"
          className="register-form"
          onFinish={this.handleSubmit}
          scrollToFirstError
          >
            <div className="label">
              <span>E-mail:</span>
            </div>
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input className="caixaRegister" type="text" name="email"  value={this.state.email} onChange={this.handleChange}/>
            </Form.Item>
            <div className="label">
              <span>Password:</span>
            </div>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password  className="caixaRegister" type="password" name="password"  value={this.state.password} onChange={this.handleChange}/>
            </Form.Item>
            <div className="label">
              <span>Confirmar Senha:</span>
            </div>
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
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
              <Input.Password className="caixaRegister" type="password" name="password"/>
            </Form.Item>
            <div className="label">
              <span>
                Nome:
              </span>
            </div>
            <Form.Item
              name="nickname"
              rules={[
                {
                  required: true,
                  message: 'Please input your nickname!',
                  whitespace: true,
                },
              ]}
            >
              <Input className="caixaRegister" name="nickname" type="text" value={this.state.nickname} onChange={this.handleChange}/>
            </Form.Item>
            <div className="label">
              <span>Morada:</span>
            </div>
            <Form.Item
              name="residence"
              rules={[
                {
                  required: true,
                  message: 'Please select your habitual residence!',
                },
              ]}
            >
              <Input className="caixaRegister" name="residence" type="text" value={this.state.residence} onChange={this.handleChange}/>
            </Form.Item>
            <div className="label">
              <span>Telefone:</span>
            </div>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
            >
              <Input
                className="caixaRegister"
                name="phone"
                type="text"
                value={this.state.phone} onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox className="textTermos">
                Li e aceito os <a href="http://localhost:5000/">termos de uso.</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button htmlType="submit" className="login-form-button-register">
                Registar
              </Button>
            </Form.Item>
            <div className="alreadyText">
              Já possui uma conta?<Link to="/login"> Login</Link>
            </div>
          </Form>
        </div>
      </div>
    );
  };
}  
export default Register;

