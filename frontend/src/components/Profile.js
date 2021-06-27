import React, { Component } from 'react';//
import '../styles/profile.css';
import '../styles/index.css';
import '../styles/background.css';
import 'antd/dist/antd.css';
import {Avatar, Button, Form, Input} from 'antd';
import {EditTwoTone} from '@ant-design/icons';

class Profile extends Component {
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
                <div className="boxProfile">
                    <Avatar className="avatarPic" size={200} src={"https://cdn.discordapp.com/attachments/695305254023069777/839130980907876402/pexels-daniel-xavier-1239291.jpg"} />
                    <Form
                        name="normal_login"
                        className="login-form-profile"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <div>
                            <span className="label">
                                <b>Nome</b>
                            </span>
                        </div>
                        <Form.Item
                            name="nickname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor insira o seu nome!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input className="caixaPerfil" suffix={<EditTwoTone className="icon-edit" />} name="nickname" placeholder="Nome" type="text"/>
                        </Form.Item>
                        <div>
                            <span className="label">
                                <b>Email</b>
                            </span>
                        </div>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor insira o seu email!',
                                },
                            ]}
                        >
                            <Input className="caixaPerfil" suffix={<EditTwoTone className="icon-edit" />} type="text" name="email" placeholder="Email"  value={this.state.email} onChange={this.handleChange}/>
                        </Form.Item>
                        <div>
                        <span className="label">
                            <b>Password</b>
                        </span>
                        </div>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input className="caixaPerfil" suffix={<EditTwoTone className="icon-edit" />} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                        </Form.Item>
                    </Form>
                    <Button htmlType="submit" className="update-button" onClick={this.handleSubmit}>
                        <b>Atualizar</b>
                    </Button>
                </div>
            </div>
        );
    };
}
export default Profile;