import React, { Component } from 'react';
import {Button, Form, Input} from 'antd';
import axios from 'axios';
import {DeleteOutlined, FormOutlined} from "@ant-design/icons";
import { Select } from 'antd';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";


const layout = {
    labelCol: {
        span: 2,
    }
};


const { Option } = Select;

//Individual information for each Item (View button)
class ItemInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            item: [],
            name: "", 
            numero: "",
            stock: "",
            notas: "",
            kit_details: "",
            check_in: new Date(),
            check_out: new Date(),
            appetizer: "",
            side_dish: "",
            dessert: "",
            spoons: "",
            cuvettes: "",
            cover: "",
            kitchen_paper_rolls: "",
            rolls_toilet_paper: "",
            mistolim: "",
            dishwashing_detergent: "",
            floor_detergent: "",
            gloves: "",
            masks: "",
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDropChange = this.handleDropChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Get info about an specific item
    componentDidMount() {
        const { match: { params } } = this.props;
        axios.get(`http://localhost:3000/api/item/${params.itemId}`)
        .then(({data}) => {
            const item = data.results[0];
            this.setState ({
                item: item,
                name: item.name,
                numero: item.numero,
                stock: item.stock,
                notas: item.notas,
                kit_details: item.kit_details,
                check_in: item.check_in,
                check_out: item.check_out,
                appetizer: item.appetizer,
                side_dish: item.side_dish,
                dessert: item.dessert,
                spoons: item.spoons,
                napkin: item.napkin,
                cuvettes: item.cuvettes,
                cover: item.cover,
                kitchen_paper_rolls: item.kitchen_paper_rolls,
                rolls_toilet_paper: item.rolls_toilet_paper,
                mistolim: item.mistolim,
                dishwashing_detergent: item.dishwashing_detergent,
                floor_detergent: item.floor_detergent,
                gloves: item.gloves,
                masks: item.masks
              });
            });
    }

    //Edit item information
    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value,
        });
    }

    handleDropChange(event) {
        console.log(event)  
        this.setState({name: event});  }

    //Remove item
    handleDelete() {
        const { match: { params } } = this.props;
        axios.delete(`http://localhost:3000/api/item/${params.itemId}`)
        .then(() => {
            console.log('item deleted');
            this.props.history.push('/item');
        });
    }

    //Submit and update item
    handleSubmit(e) {
        e.preventDefault();
        const { match: { params } } = this.props;
        const item = {
            name: this.state.name,
            numero: this.state.numero,
            stock: this.state.stock,
            notas: this.state.notas,
            kit_details: this.state.kit_details,
            check_in: this.state.check_in,
            check_out: this.state.check_out,
            appetizer: this.state.appetizer,
            side_dish: this.state.side_dish,
            dessert: this.state.dessert,
            gaps: this.state.gaps,
            spoons: this.state.spoons,
            napkin: this.state.napkin,
            cuvettes: this.state.cuvettes,
            cover: this.state.cover,
            kitchen_paper_rolls: this.state.kitchen_paper_rolls,
            rolls_toilet_paper: this.state.rolls_toilet_paper,
            mistolim: this.state.mistolim,
            dishwashing_detergent: this.state.dishwashing_detergent,
            floor_detergent: this.state.floor_detergent,
            gloves: this.state.gloves,
            masks: this.state.masks
        };
        axios.post(`http://localhost:3000/api/item/${params.itemId}`, item,
        {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(({data: item}) => {
            console.log('Item updated: ', item);
            const { history } = this.props;
            history.push('/item');
        });
    }

    //Close page and get back to Items.js
    handleClose(e) {
        e.preventDefault();
        this.props.history.push('/item');
    }

    //Edit form
    render() {
        // eslint-disable-next-line
        const { item } = this.state; 
        return (
        <div className="">
            <h2 style={{display:'flex', justifyContent: 'center'}}>{this.state.name}</h2>
            <Form {...layout}>
                <Form.Item>
                    {/* Delete item button */}
                    <Button style={{ float: 'right', margin: '5px'}} type="danger" onClick={this.handleDelete}><DeleteOutlined style={{ display: 'inline-block', verticalAlign: 'middle' }} /></Button>
                </Form.Item>
                <Form.Item
                    label="Local de Entrega"
                >
                <Select
                    value={this.state.name} 
                    onChange={this.handleDropChange}
                    showSearch
                    style={{ display:'flex' }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }>
                    <Option value="Baixa">Baixa</Option>
                    <Option value="Terço">Terço</Option>
                    <Option value="Ju">JU</Option>
                </Select>
                </Form.Item>
                <Form.Item
                    label="Nº Refeições"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="text"
                    name="numero"
                    value={this.state.numero}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Stock"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="text"
                    name="stock"
                    value={this.state.stock}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Notas"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="text"
                    name="notas"
                    value={this.state.notas}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Constituição do kit"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="text"
                    name="kit_details"
                    value={this.state.kit_details}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Check-In"
                ><Flatpickr
                    data-enable-time
                    value={this.state.check_in}
                    onChange={check_in => {
                        this.setState({check_in})
                    }}
                />
                </Form.Item>
                <Form.Item
                    label="Check-Out"
                ><Flatpickr
                    data-enable-time
                    value={this.state.check_out}
                    onChange={check_out => {
                        this.setState({check_out})
                    }}
                />
                </Form.Item>
                <Form.Item
                    label="Entrada"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="text"
                    name="appetizer"
                    value={this.state.appetizer}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Conduto"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="text"
                    name="side_dish"
                    value={this.state.side_dish}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Sobremesa"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="text"
                    name="dessert"
                    value={this.state.dessert}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Sacos"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="number"
                    name="gaps"
                    value={this.state.gaps}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Colheres"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="number"
                    name="spoons"
                    value={this.state.spoons}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Guardanapos"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="number"
                    name="napkin"
                    value={this.state.napkin}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Cuvetes"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="number"
                    name="cuvettes"
                    value={this.state.cuvettes}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Tampas"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="number"
                    name="cover"
                    value={this.state.cover}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Rolos papel de cozinha"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="number"
                    name="kitchen_paper_rolls"
                    value={this.state.kitchen_paper_rolls}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Rolos de papel higiénico "
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="number"
                    name="rolls_toilet_paper"
                    value={this.state.rolls_toilet_paper}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Mistolim"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="number"
                    name="mistolim"
                    value={this.state.mistolim}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Detergente Loiça"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="number"
                    name="dishwashing_detergent"
                    value={this.state.dishwashing_detergent}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Detergente chão"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="number"
                    name="floor_detergent"
                    value={this.state.floor_detergent}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Luvas"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="number"
                    name="gloves"
                    value={this.state.gloves}
                    onChange={this.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Mascaras"
                ><Input
                    prefix={<FormOutlined className="site-form-item-icon" />}
                    type="number"
                    name="masks"
                    value={this.state.masks}
                    onChange={this.handleChange} />
                </Form.Item>
            </Form>
            <div className="float-right mt-5">
                <Button onClick={this.handleClose} type="primary" danger>Cancel</Button>
                <Button onClick={this.handleSubmit} style={{ background: "green", marginLeft: "5px", borderColor: "green", color: "white"}} type="submit">Update Item</Button>
            </div>
        </div>
        )
    }
}

export default ItemInfo;
