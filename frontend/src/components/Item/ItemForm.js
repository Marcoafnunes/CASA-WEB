import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import axios from 'axios';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import '../../styles/itemForm.css';


//Align form (to be configured as needed)
const layout = {
    labelCol: {
      span: 2,
    }
  };

  const { Option } = Select;


class ItemForm extends Component {
    constructor(props) {
        super(props);
        const { item = {}} = props;
        this.state = { 
            item,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDropChange = this.handleDropChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        console.log('From ItemForm: ', nextProps);
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
    

    //Submit and create the item
    handleSubmit(e) {
        e.preventDefault();
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
        console.log("Final item: ", item)
        //const {handleSubmit} = this.props;
        axios.post(`http://localhost:3000/api/item`, item,
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

    handleClose(e) {
        e.preventDefault();
        this.props.history.push('/item');
    }

    onChange = (date) => {
        this.setState({value: date})
    }

    parseDate = (date) => {
        console.log("Data: ", date)
    }

    render() {
        //Item attributes
        const {item: { name, numero, stock, notas, check_in, check_out, kit_details, appetizer, side_dish, dessert, gaps, spoons, napkin, cuvettes, cover, kitchen_paper_rolls, rolls_toilet_paper, mistolim, dishwashing_detergent, floor_detergent, gloves, masks} } = this.state;
        //Attributes received from ItemAdd.js
        // eslint-disable-next-line
        const {handleCancel, submitText = 'Create'} = this.props; 
        return (
            <div>
                <h2 style={{display:'flex', justifyContent: 'center'}}>Adicionar Relatório</h2>
                {/*Form to create a new item*/}
                <Form {...layout}>
                    <Form.Item
                        label="Local de Entrega"
                        rules={[
                        {
                            required: true,
                            message: 'Please input the name!',
                        },
                        ]}
                        >
                        <Select 
                            value={name} 
                            onChange={this.handleDropChange}
                            showSearch
                            style={{ display:'flex' }}
                            placeholder="Search to Select"
                            OptionFilterProp="children"
                            filterOption={(input, Option) =>
                            Option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(OptionA, OptionB) =>
                            OptionA.children.toLowerCase().localeCompare(OptionB.children.toLowerCase())
                            }>
                            <Option value="Baixa">Baixa</Option>
                            <Option value="Terço">Terço</Option>
                            <Option value="Hospital">Hospital</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Nº Refeições"
                        rules={[
                        {
                            required: true,
                            message: 'Please input the description!',
                        },
                        ]}
                        ><Input
                            prefix={<FormOutlined className="site-form-item-icon" />}
                            type="number"
                            name="numero"
                            value={numero}
                            onChange={this.handleChange} />
                    </Form.Item>
                    <Form.Item
                        label="Stock"
                        rules={[
                        {
                            required: true,
                            message: 'Please input the name!',
                        },
                        ]}
                        ><Input
                            prefix={<FormOutlined className="site-form-item-icon" />}
                            type="text"
                            name="stock"
                            value={stock}
                            onChange={this.handleChange}
                            />
                    </Form.Item>
                    <Form.Item
                        label="Notas"
                        rules={[
                        {
                            required: true,
                            message: 'Please input the name!',
                        },
                        ]}
                        ><Input
                            prefix={<FormOutlined className="site-form-item-icon" />}
                            type="text"
                            name="notas"
                            value={notas}
                            onChange={this.handleChange}
                            />
                    </Form.Item>
                    <Form.Item
                        label="Constituição do kit"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="text"
                        name="kit_details"
                        value={kit_details}
                        onChange={this.handleChange}
                    />
                    </Form.Item>
                    <Form.Item
                        label="Check-In"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Flatpickr
                        data-utc= 'true'
                        data-enable-time
                        value={check_in}
                        onChange={check_in => {
                            this.setState({check_in})
                        }}
                    />
                    </Form.Item>
                    <Form.Item
                        label="Check-Out"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Flatpickr
                        data-enable-time
                        data-utc= 'true'
                        value={check_out}
                        onChange={check_out => {
                        this.setState({check_out})
                    }}
                    />
                    </Form.Item>
                    <Form.Item
                        label="Entrada"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="text"
                        name="appetizer"
                        value={appetizer}
                        onChange={this.handleChange}
                    />
                    </Form.Item>
                    <Form.Item
                        label="Conduto"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="text"
                        name="side_dish"
                        value={side_dish}
                        onChange={this.handleChange}
                    />
                    </Form.Item>
                    <Form.Item
                        label="Sobremesa"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="text"
                        name="dessert"
                        value={dessert}
                        onChange={this.handleChange}
                    />
                    </Form.Item>
                    <Form.Item
                        label="Sacos"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="number"
                        name="gaps"
                        value={gaps}
                        onChange={this.handleChange}
                    />
                    </Form.Item>
                    <Form.Item
                        label="Colheres"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="number"
                        name="spoons"
                        value={spoons}
                        onChange={this.handleChange}
                    />
                    </Form.Item>
                    <Form.Item
                        label="Guardanapos"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="number"
                        name="napkin"
                        value={napkin}
                        onChange={this.handleChange}
                    />
                    </Form.Item>
                    <Form.Item
                        label="Cuvetes"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="number"
                        name="cuvettes"
                        value={cuvettes}
                        onChange={this.handleChange}
                    />
                    </Form.Item>
                    <Form.Item
                        label="Tampa"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="number"
                        name="cover"
                        value={cover}
                        onChange={this.handleChange}
                    />
                    </Form.Item>
                    <Form.Item
                        label="Rolos de papel de cozinha"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="number"
                        name="kitchen_paper_rolls"
                        value={kitchen_paper_rolls}
                        onChange={this.handleChange}
                    />
                    </Form.Item>
                    <Form.Item
                        label="Rolos de papel higiénico "
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="number"
                        name="rolls_toilet_paper"
                        value={rolls_toilet_paper}
                        onChange={this.handleChange}
                    />
                    </Form.Item>
                    <Form.Item
                        label="Mistolim"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="number"
                        name="mistolim"
                        value={mistolim}
                        onChange={this.handleChange}
                    />
                    </Form.Item>
                    <Form.Item
                        label="Detergente loiça"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="number"
                        name="dishwashing_detergent"
                        value={dishwashing_detergent}
                        onChange={this.handleChange}
                    />
                    </Form.Item>
                    <Form.Item
                        label="Detergente chão"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="number"
                        name="floor_detergent"
                        value={floor_detergent}
                        onChange={this.handleChange}
                    />
                    </Form.Item>
                    <Form.Item
                        label="Luvas"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="number"
                        name="gloves"
                        value={gloves}
                        onChange={this.handleChange}
                    />
                    </Form.Item>
                    <Form.Item
                        label="Máscaras"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name!',
                            },
                        ]}
                    ><Input
                        prefix={<FormOutlined className="site-form-item-icon" />}
                        type="number"
                        name="masks"
                        value={masks}
                        onChange={this.handleChange}
                    />
                    </Form.Item>
                    <Form.Item className="float-right">
                        {/* Cancel Button */}
                        <Button key="2" onClick={this.handleClose} type="primary" danger>Cancel</Button>
                        {/* Save Button */}
                        <Button key="1" style={{ background: "green", marginLeft: "5px", borderColor: "green", color: "white"}} type="submit" onClick={this.handleSubmit}>Adicionar Relatório</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default ItemForm;
