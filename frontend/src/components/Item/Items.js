import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import '../../styles/App.css';
import '../../styles/item.css';
import '../../styles/table.css';
import {Table, Button, Divider} from 'antd';
import axios from 'axios';
import { CSVLink } from "react-csv";

const { Column } = Table;
const totalPerPage = 10;
const {pageSize, setPageSize} =0;

//Table with all items from item table (backoffice_feralbyte DB)
class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
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
    this.getItem();
  }

  componentDidUpdate({location = {} }) {
    if (location.pathname === '/item' && location.pathname !== this.props.location.pathname) {
      this.getItem();
    }
  }

  //Select the item to be seen or to be removed
  onSelectChange = selectedRowKeys => {
    console.log('SelectedRowKeys: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  //Get items information
  getItem() {
    axios.get('http://localhost:3000/api/item')
        .then(({data}) => {
          const item = data.results;
          item.forEach(element => {
            let full_date = element.check_in.split("T");
            let full_date1 = element.check_out.split("T");
            let hour = full_date[1].split(":");
            let hour1 = full_date1[1].split(":");
            element.check_in=full_date[0] + " " + hour[0] + ":" + hour[1];
            element.check_out=full_date1[0] + " " + hour1[0] + ":" + hour1[1];
            element.edit = <Button className="buttonEdit" onClick={() => this.props.history.push(`/item/${this.state.selectedRowKeys}`)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="23.51" height="23.51" viewBox="0 0 23.51 23.51">
                <path id="pencil" d="M22.886,6.6,20.769,8.714a.552.552,0,0,1-.781,0l-5.1-5.1a.552.552,0,0,1,0-.781L17.008.719a2.209,2.209,0,0,1,3.118,0l2.76,2.76A2.2,2.2,0,0,1,22.886,6.6ZM13.073,4.654,1.014,16.713.041,22.292a1.1,1.1,0,0,0,1.277,1.277L6.9,22.591,18.955,10.532a.552.552,0,0,0,0-.781l-5.1-5.1a.557.557,0,0,0-.785,0ZM4.064,19.542h2.2v1.667l-2.962.519L1.878,20.3,2.4,17.337H4.064Z" transform="translate(-0.024 -0.075)" fill="#21aeff"/>
              </svg>
            </Button>
          })
          const totalPages = Math.ceil(item.length / totalPerPage);
          this.setState ({
            item: item,
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

  //Remove item
  handleDelete(itemId) {
    const {selectedRowKeys} = this.state;
    for (let i = 0; i < selectedRowKeys.length; i++){
      axios.delete(`http://localhost:3000/api/item/${selectedRowKeys[i]}`)
        .then(() => {
          console.log('item deleted');
          window.location.reload(true);
        });
      
    }
    this.setState({
      selectedRowKeys: selectedRowKeys.filter(u => u.selectedRowKeys !== itemId),
    });
  }

  //botao imprimir
  print() {
    window.print();
  }

  //Table with all items
  render() {
    const { item, selectedRowKeys } = this.state;
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
          <header className="head">
            <span className="titleHead"><b>Relatórios</b></span>
            <Button className="buttonImprimir" onClick={this.print}>
              <svg id="print_white_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path id="Caminho_17" data-name="Caminho 17" d="M0,0H24V24H0Z" fill="none"/>
                <path id="Caminho_18" data-name="Caminho 18" d="M19,8H18V3H6V8H5a3,3,0,0,0-3,3v6H6v4H18V17h4V11A3,3,0,0,0,19,8ZM8,5h8V8H8Zm8,12v2H8V15h8Zm2-2V13H6v2H4V11a1,1,0,0,1,1-1H19a1,1,0,0,1,1,1v4Z" fill="#5d5d5d"/>
                <circle id="Elipse_2" data-name="Elipse 2" cx="1" cy="1" r="1" transform="translate(17 10.5)" fill="#5d5d5d"/>
              </svg>&nbsp;
              Imprimir</Button>
            <Button className="buttonExportar"><CSVLink filename={"Item.csv"} data={item}>Exportar</CSVLink></Button>
            <Button className="buttonEliminar" onClick={this.handleDelete}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18">
                <path id="Caminho_10" data-name="Caminho 10" d="M16,9V19H8V9h8M14.5,3h-5l-1,1H5V6H19V4H15.5ZM18,7H6V19a2.006,2.006,0,0,0,2,2h8a2.006,2.006,0,0,0,2-2Z" transform="translate(-5 -3)" fill="#fff"/>
              </svg>&nbsp;
              Eliminar</Button>
            <Link to="/item/new">
              <Button className="butttonAdicionar">
                <svg xmlns="http://www.w3.org/2000/svg" width="13.577" height="13.577" viewBox="0 0 13.577 13.577">
                  <g id="_" data-name="+" transform="translate(1 1)">
                    <path id="Shape" d="M1254.291,4794.488h5.2v-5.2a.3.3,0,0,1,.59,0v5.2h5.2a.3.3,0,0,1,0,.591h-5.2v5.2a.3.3,0,0,1-.295.3.3.3,0,0,1-.208-.087.287.287,0,0,1-.087-.208v-5.2h-5.2a.3.3,0,0,1-.3-.3A.3.3,0,0,1,1254.291,4794.488Z" transform="translate(-1253.995 -4788.996)" fill="#fff" stroke="#fff" stroke-width="2"/>
                  </g>
                </svg>&nbsp;
                Adicionar Relatório</Button>
            </Link>
          </header>
          {/* Item information */}
          {/*<Link to={`/item/${selectedRowKeys}`}>
            <Button type="primary" style={{float: 'right'}}><EyeOutlined style={{ display: 'inline-block', verticalAlign: 'middle'}} /></Button>
          </Link>*/}
          {/* Table with all items */}
          <div>
            <select
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value))
                }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
              ))}
            </select>
          </div>
          <Table scroll={{ x: 400 }} rowSelection={rowSelection} dataSource={item} rowKey="id" pagination={{defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['5', '25', '50']}}>
            <Column
                    title="Local de Entrega"
                    dataIndex="name"
            />
            <Column
                title="Nº de Refeições"
                dataIndex="numero"
            />
            <Column
                title="Stock"
                dataIndex="stock"
            />
            <Column
                title="Notas"
                dataIndex="notas"
            />
            <Column
                title="Constituição do Kit"
                dataIndex="kit_details"
            />
            <Column
                title="Check-In"
                dataIndex="check_in"
            />
            <Column
                title="Check-Out"
                dataIndex="check_out"
            />
            <Column
                title="Entrada"
                dataIndex="appetizer"
            />
            <Column
                title="Conduto"
                dataIndex="side_dish"
            />
            <Column
                title="Sobremesa"
                dataIndex="dessert"
            />
            <Column
                title="Sacos"
                dataIndex="gaps"
            />
            <Column
                title="Colheres"
                dataIndex="spoons"
            />
            <Column
                title="Guardanapos"
                dataIndex="napkin"
            />
            <Column
                title="Cuvetes"
                dataIndex="cuvettes"
            />

            <Column
                title="Tampas"
                dataIndex="cover"
            />
            <Column
                title="Papel de Cozinha"
                dataIndex="kitchen_paper_rolls"
            />
            <Column
                title="Papel Higiénico "
                dataIndex="rolls_toilet_paper"
            />
            <Column
                title="Mistolim"
                dataIndex="mistolim"
            />
            <Column
                title="Detergente Loiça "
                dataIndex="dishwashing_detergent"
            />
            <Column
                title="Detergente Chão "
                dataIndex="floor_detergent"
            />
            <Column
                title="Luvas"
                dataIndex="gloves"
            />
            <Column
                title="Máscaras"
                dataIndex="masks"
            />
            <Column
                dataIndex="edit"
            />
          </Table>
        </div>
    )
  }
}
export default Items;