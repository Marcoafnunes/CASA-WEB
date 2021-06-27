import React, { Component } from 'react';
import {Form, Button, Input, Checkbox} from 'antd';
import {DeleteOutlined, FileTextOutlined, FormOutlined} from '@ant-design/icons';
import axios from 'axios';
import "flatpickr/dist/themes/material_blue.css";
import '../../styles/itemForm.css';


//Align form (to be configured as needed)
const layout = {
    labelCol: {
        span: 2,
    }
};

class UserForm extends Component {
    constructor(props) {
        super(props);
        const { user = {}} = props;
        this.state = {
            user,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDropChange = this.handleDropChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        console.log('From UserForm: ', nextProps);
    }

    //Input values from the form
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleDropChange(event) {
        console.log(event)
        this.setState({name: event});  }

    handleCheckChange(event) {
        console.log(`checked = ${event.target.checked}`);
        this.setState({verified: event.target.checked})
    }

    //Submit and create the item
    handleSubmit(e) {
        e.preventDefault();
        const user = {
            nickname: this.state.nickname,
            residence: this.state.residence,
            phone: this.state.phone,
            notes: this.state.notes,
            verified: this.state.verified
        };

        console.log("Final user: ", user)
        axios.post(`http://localhost:3000/api/user`, user,
            {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(({data: user}) => {
                console.log('User updated: ', user);
                const { history } = this.props;
                history.push('/user');
            });
    }

    handleClose(e) {
        e.preventDefault();
        this.props.history.push('/user');
    }

    onChange = (date) => {
        this.setState({value: date})
    }

    parseDate = (date) => {
        console.log("Data: ", date)
    }

    render() {
        //Item attributes
        const {user: { nickname, residence, phone, notes, verified} } = this.state;
        //Attributes received from ItemAdd.js
        // eslint-disable-next-line
        const {handleCancel, submitText = 'Create'} = this.props;
        return (
            <div>
                <h2 style={{display:'flex', justifyContent: 'center'}}>Adicionar Utilizador</h2>
                {/*Form to create a new item*/}
                <Form {...layout}>
                    <Form.Item
                        label="Nome"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the description!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="text"
                        name="nickname"
                        value={nickname}
                        onChange={this.handleChange} />
                    </Form.Item>
                    <Form.Item
                        label="Residência"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the description!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="text"
                        name="residence"
                        value={residence}
                        onChange={this.handleChange} />
                    </Form.Item>
                    <Form.Item
                        label="Telemóvel"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the description!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="number"
                        name="phone"
                        value={phone}
                        onChange={this.handleChange} />
                    </Form.Item>
                    <Form.Item
                        label="Notas"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the description!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="text"
                        name="notes"
                        value={notes}
                        onChange={this.handleChange} />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox
                        value={verified}
                        defaultChecked={verified}
                        onChange={this.handleCheckChange}
                    >Verificado</Checkbox>
                    </Form.Item>
                    <Form.Item className="float-right">
                        {/* Cancel Button */}
                        <Button key="2" onClick={this.handleClose} type="primary" danger>Cancel</Button>
                        {/* Save Button */}
                        <Button key="1" style={{ background: "green", marginLeft: "5px", borderColor: "green", color: "white"}} type="submit" onClick={this.handleSubmit}>Adicionar Utilizador</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default UserForm;