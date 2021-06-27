import React, { Component } from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import axios from 'axios';
import {DeleteOutlined, FileTextOutlined, FormOutlined} from "@ant-design/icons";

const layout = {
    labelCol: {
        span: 2,
    }
};


//Individual information for each Item (View button)
class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            nickname: "",
            residence: "",
            phone: "",
            notes: "",
            verified: "",
            load: true,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDropChange = this.handleDropChange.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    // Get info about an specific item
    componentDidMount() {
        const { match: { params } } = this.props;
        /*axios.get(`http://localhost:3000/api/user/${params.userId}`)
            .then(({data}) => {
                const user = data.results[0];
                console.log(user)
                this.setState ({
                    user: user,
                    nickname: user.nickname,
                    residence: user.residence,
                    phone: user.phone,
                    notes: user.notes,
                    verified: user.verified,
                    load: true
                });
            });*/
    }

    //Edit item information
    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value,
            });
    }

    handleDropChange(event) {
        console.log(event)
        this.setState({name: event});  
    }

    handleCheckChange(event) {
        console.log(`checked = ${event.target.checked}`);
        this.setState({verified: event.target.checked})
    } 

    //Remove item
    handleDelete() {
        const { match: { params } } = this.props;
        axios.delete(`http://localhost:3000/api/user/${params.userId}`)
            .then(() => {
                console.log('user deleted');
                this.props.history.push('/user');
            });
    }

    //Submit and update item
    handleSubmit(e) {
        e.preventDefault();
        const { match: { params } } = this.props;
        const user = {
            nickname: this.state.nickname,
            residence: this.state.residence,
            phone: this.state.phone,
            notes: this.state.notes,
            verified: this.state.verified
        };
        axios.post(`http://localhost:3000/api/user/${params.userId}`, user,
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

    //Close page and get back to Items.js
    handleClose(e) {
        e.preventDefault();
        this.props.history.push('/user');
    }

    //Edit form
    render() {
        if (this.state.load === true)
            return (
                <div className="">
                    <h2 style={{display:'flex', justifyContent: 'center'}}>{this.state.name}</h2>
                    <Form {...layout}>
                        <Form.Item>
                            {/* Delete item button */}
                            <Button style={{ float: 'right', margin: '5px'}} type="danger" onClick={this.handleDelete}><DeleteOutlined style={{ display: 'inline-block', verticalAlign: 'middle' }} /></Button>
                        </Form.Item>
                        <div className="label">
                            <span>E-mail:</span>
                        </div>
                        <Form.Item
                            label="Nome"
                        ><Input
                            prefix={<FileTextOutlined className="site-form-item-icon" />}
                            type="text"
                            name="nickname"
                            value={this.state.nickname}
                            onChange={this.handleChange}
                            disabled = "disabled" />
                        </Form.Item>
                        <Form.Item
                            label="Residência"
                        ><Input
                            prefix={<FormOutlined className="site-form-item-icon" />}
                            type="text"
                            name="residence"
                            value={this.state.residence}
                            onChange={this.handleChange}
                            disabled = "disabled"
                        />
                        </Form.Item>
                        <Form.Item
                            label="Telefone"
                        ><Input
                            prefix={<FormOutlined className="site-form-item-icon" />}
                            type="text"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.handleChange}
                            disabled = "disabled"
                        />
                        </Form.Item>
                        <Form.Item
                            label="Notas"
                        ><Input
                            prefix={<FileTextOutlined className="site-form-item-icon" />}
                            type="text"
                            name="notes"
                            value={this.state.notes}
                            onChange={this.handleChange} />
                        </Form.Item>
                        <Form.Item className="formLabel">
                            <Checkbox
                                value={this.state.verified}
                                defaultChecked={this.state.verified}
                                onChange={this.handleCheckChange}
                            >Verificado</Checkbox>
                        </Form.Item>
                    </Form>
                    <div className="float-right mt-5">
                        <Button onClick={this.handleClose} type="primary" danger>Cancel</Button>
                        <Button onClick={this.handleSubmit} style={{ background: "green", marginLeft: "5px", borderColor: "green", color: "white"}} type="submit">Update User</Button>
                    </div>
                </div>
            )
            else{
                return (<div className="">
                    <p>loading</p>
                </div>)
            }
        }
}

export default UserInfo;