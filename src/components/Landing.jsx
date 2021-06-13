import React, { Component } from "react";
import axios from "axios";
import LatestBlocks from "./Latestblocks";

const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
const baseURL = process.env.REACT_APP_BASE_URL;

class Landing extends Component {


  // Initial Constructor called
  constructor() {
    super();
    this.state = {
      latestBlock: 0,
    };
  }


  // Initial component mount
  async componentDidMount() {
    const latestBlock = await axios.get(baseURL + `?module=proxy&action=eth_blockNumber&apikey=${apiKey}`);
    this.setState({
      latestBlock: parseInt(latestBlock.data.result),
    })
  }

  // Rendering latest block on component
  getLatestBlocks = () => {
    if (this.state.latestBlock) {
      return <LatestBlocks latestBlock={this.state.latestBlock}></LatestBlocks>;
    }
  };

  render() {
    return (
      <div>
           {this.getLatestBlocks()}
      </div>
    );
  }
}

export default Landing;
