import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import '../../styles/App.css';
import '../../styles/user.css';
import '../../styles/table.css';
import {Table, Button} from 'antd';
import axios from 'axios';
import {CSVLink} from "react-csv";

const { Column } = Table;
const totalPerPage = 10;

//Table with all items from item table (backoffice_feralbyte DB)
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            page:0,
            totalPages: 0,
            selectedRowKeys: [],
        };
        this.incrementPage = this.incrementPage.bind(this);
        this.decrementPage = this.decrementPage.bind(this);
        this.setPage = this.setPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.getUser();
    }

    componentDidUpdate({location = {} }) {
        if (location.pathname === '/user' && location.pathname !== this.props.location.pathname) {
            this.getUser();
        }
    }

    //Get items information
    getUser() {
        axios.get('http://localhost:3000/api/user')
            .then(({data}) => {
                const user = data.results;
                user.forEach(element => {
                    element.verified = element.verified ? <svg xmlns="http://www.w3.org/2000/svg" width="36.997" height="27.339" viewBox="0 0 36.997 27.339">
                        <path id="Caminho_27" data-name="Caminho 27" d="M15.172,27.226,6.343,18.657,3.4,21.514,15.172,32.939,40.4,8.456,37.454,5.6Z" transform="translate(-3.4 -5.6)" fill="#02ce7d"/>
                    </svg> : false;
                    element.edit = <Button className="buttonEdit" onClick={() => this.props.history.push(`/user/${this.state.selectedRowKeys}`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23.51" height="23.51" viewBox="0 0 23.51 23.51">
                            <path id="pencil" d="M22.886,6.6,20.769,8.714a.552.552,0,0,1-.781,0l-5.1-5.1a.552.552,0,0,1,0-.781L17.008.719a2.209,2.209,0,0,1,3.118,0l2.76,2.76A2.2,2.2,0,0,1,22.886,6.6ZM13.073,4.654,1.014,16.713.041,22.292a1.1,1.1,0,0,0,1.277,1.277L6.9,22.591,18.955,10.532a.552.552,0,0,0,0-.781l-5.1-5.1a.557.557,0,0,0-.785,0ZM4.064,19.542h2.2v1.667l-2.962.519L1.878,20.3,2.4,17.337H4.064Z" transform="translate(-0.024 -0.075)" fill="#21aeff"/>
                        </svg>
                    </Button>
                })
                const totalPages = Math.ceil(user.length / totalPerPage);
                this.setState ({
                    user: user,
                    page: 0,
                    totalPages,
                });
            })
            .catch( err => {
                console.log('Error: ', err)
            })
    }

    //Table manipulation
    setPage(page) {
        return() => {
            this.setState({page});
        };
    }

    decrementPage() {
        const {page} = this.state;
        this.setState({ page: page - 1 });
    }

    incrementPage() {
        const {page} = this.state;
        this.setState({ page: page + 1});
    }

    //Select the item to be seen or to be removed
    onSelectChange = selectedRowKeys => {
        console.log('SelectedRowKeys: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    //Remove item
    handleDelete(userId) {
        const {selectedRowKeys} = this.state;
        const id = selectedRowKeys[0]
        axios.delete(`http://localhost:3000/api/user/${id}`)
            .then(() => {
                console.log('user deleted');
                window.location.reload(true);
            });
        this.setState({
            selectedRowKeys: selectedRowKeys.filter(u => u.selectedRowKeys !== userId),
        });
    }

    //imprimir
    print(){
        window.print();
    }

    //Table with all items
    render() {
        const { user, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                {
                    key: 'odd',
                    text: 'Select Odd Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return false;
                            }
                            return true;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
                {
                    key: 'even',
                    text: 'Select Even Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return true;
                            }
                            return false;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
            ],
        };

        return (
            <div>
                <header className="headUser">
                    <span className="titleHeadUser"><b>Utilizadores</b></span>
                    <Button className="buttonImprimir" onClick={this.print}>
                        <svg id="print_white_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path id="Caminho_17" data-name="Caminho 17" d="M0,0H24V24H0Z" fill="none"/>
                            <path id="Caminho_18" data-name="Caminho 18" d="M19,8H18V3H6V8H5a3,3,0,0,0-3,3v6H6v4H18V17h4V11A3,3,0,0,0,19,8ZM8,5h8V8H8Zm8,12v2H8V15h8Zm2-2V13H6v2H4V11a1,1,0,0,1,1-1H19a1,1,0,0,1,1,1v4Z" fill="#5d5d5d"/>
                            <circle id="Elipse_2" data-name="Elipse 2" cx="1" cy="1" r="1" transform="translate(17 10.5)" fill="#5d5d5d"/>
                        </svg>&nbsp;
                        Imprimir</Button>
                    <Button className="buttonExportar"><CSVLink filename={"Utlizadores.csv"} data={user}>Exportar</CSVLink></Button>
                    <Button className="buttonEliminar" onClick={this.handleDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18">
                            <path id="Caminho_10" data-name="Caminho 10" d="M16,9V19H8V9h8M14.5,3h-5l-1,1H5V6H19V4H15.5ZM18,7H6V19a2.006,2.006,0,0,0,2,2h8a2.006,2.006,0,0,0,2-2Z" transform="translate(-5 -3)" fill="#fff"/>
                        </svg>&nbsp;
                        Eliminar</Button>
                    <Link to="/user/new">
                        <Button className="butttonAdicionar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13.577" height="13.577" viewBox="0 0 13.577 13.577">
                                <g id="_" data-name="+" transform="translate(1 1)">
                                    <path id="Shape" d="M1254.291,4794.488h5.2v-5.2a.3.3,0,0,1,.59,0v5.2h5.2a.3.3,0,0,1,0,.591h-5.2v5.2a.3.3,0,0,1-.295.3.3.3,0,0,1-.208-.087.287.287,0,0,1-.087-.208v-5.2h-5.2a.3.3,0,0,1-.3-.3A.3.3,0,0,1,1254.291,4794.488Z" transform="translate(-1253.995 -4788.996)" fill="#fff" stroke="#fff" stroke-width="2"/>
                                </g>
                            </svg>&nbsp;
                            Adicionar Utilizador</Button>
                    </Link>
                </header>
                {/* Item information */}
                {/*<Link to={`/user/${selectedRowKeys}`}>
                    <Button type="primary" style={{float: 'right'}}><EyeOutlined style={{ display: 'inline-block', verticalAlign: 'middle'}} /></Button>
                </Link>*/}
                <Table scroll={{ x: 400 }} rowSelection={rowSelection} dataSource={user} rowKey="id" pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['5', '25', '50']}}>
                    <Column
                        title="Nome"
                        dataIndex="nickname"
                    >
                    </Column>
                    <Column
                        title="Morada"
                        dataIndex="residence"
                    />
                    <Column
                        title="Telefone"
                        dataIndex="phone"
                    />
                    <Column
                        title="Notas"
                        dataIndex="notes"
                    />
                    <Column
                        title="Verificado"
                        dataIndex="verified"
                    />
                    <Column
                        dataIndex="edit"
                    />
                </Table>
            </div>
        )
    }
}
export default User;