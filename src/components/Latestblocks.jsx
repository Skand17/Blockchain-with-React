import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import ModalDetail from './Blockdetail'
import { Container,Header, Input, Icon } from 'semantic-ui-react'
import axios from "axios";

const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;

const baseURL = process.env.REACT_APP_BASE_URL;


class LatestBlocks extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      latestBlocks: [],
      openModal : false,
      address : null,
      balance : null,
      blockDetail : {}
    };
  }

  // Initial Mounting
  componentDidMount = () => {
    this.getBlocks();
  };

  setBlockDetail(data){
    this.setState({
      openModal : true,
      blockDetail : data
    })
  }

  // Close modal
  closeModal(){
    this.setState({
      openModal : false
    })
  }


  // Render Balance

  async renderBalance(){

    const { address } = this.state
    const balance = await axios.get(baseURL + `?module=account&action=balance&address=${address}&apikey=${apiKey}`);
    this.setState({
      balance : balance.data.result
    })
  }

  getBlocks = async () => {
      const { latestBlock } = this.props;
      let blocks = [];
      if (latestBlock) {
        for (let i = 0; i < 10; i++) {
          const blockDetail = await axios.get(baseURL + `?module=proxy&action=eth_getBlockByNumber&tag=${(latestBlock - i).toString(16)}&boolean=true&apikey=${apiKey}`);
          const { result } = blockDetail.data;
          blocks.push(
            <Table.Row key={i}>
              <Table.Cell>
                {latestBlock - i}
              </Table.Cell>
              <Table.Cell textAlign='center'>
                <Button color="green" onClick={ () => this.setBlockDetail(result) } >Details</Button>
              </Table.Cell>
            </Table.Row>
          );
          this.setState({
            latestBlocks: blocks,
          });
        }
      }
  };


  render() {

      const { balance } = this.state

      return (
        <Container>
          <Header textAlign="center" className="heading-style" as="h2">Ethereum latest blocks</Header>
          <Input onChange={ (e) =>  this.setState({ address : e.target.value }) } />
          <Button  color="blue"  onClick={ () => this.renderBalance()  }>Get Balance <Icon name='right arrow' /></Button>
          { balance ? <p className="current">Your current balance is {balance}</p> : "" }

          <Table celled> 
              <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Block No.</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
                  </Table.Row>
              </Table.Header>
              <Table.Body>{this.state.latestBlocks}</Table.Body>
              <ModalDetail  blockDetail={this.state.blockDetail}  close={() => this.closeModal()}  open={this.state.openModal} />
          </Table>
        </Container>
      );
  }
}

export default LatestBlocks;
