import React, {Component} from 'react';
import axios from 'axios';
import ItemForm from './ItemForm';
import '../../styles/itemAdd.css';
import '../../styles/App.css';
import '../../styles/index.css';
import '../../styles/itemForm.css';

class ItemAdd extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    // Submit item with Infos from ItemForm.js
    handleSubmit(item) {
        axios.post('http://localhost:3000/api/item', item,
        {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(({data: u}) => {
            const { history } = this.props;
            history.push('/item');
        });
    }

    handleCancel(e) {
        e.preventDefault();
        const { history } = this.props;
        history.push('/item');
    }

    //Item Form
    render() {
        return (
        <ItemForm handleSubmit={this.handleSubmit} handleCancel={this.handleCancel}></ItemForm>
        );
    }
}

export default ItemAdd;