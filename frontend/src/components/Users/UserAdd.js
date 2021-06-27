import React, {Component} from 'react';
import axios from 'axios';
import UserForm from "./UserForm";
import '../../styles/itemAdd.css';
import '../../styles/App.css';
import '../../styles/index.css';
import '../../styles/itemForm.css';

class UserAdd extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    // Submit item with Infos from ItemForm.js
    handleSubmit(user) {
        axios.post('http://localhost:3000/api/user', user,
            {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(({data: u}) => {
                const { history } = this.props;
                history.push('/user');
            });
    }

    handleCancel(e) {
        e.preventDefault();
        const { history } = this.props;
        history.push('/user');
    }

    //Item Form
    render() {
        return (
            <UserForm handleSubmit={this.handleSubmit} handleCancel={this.handleCancel}></UserForm>
        );
    }
}

export default UserAdd;