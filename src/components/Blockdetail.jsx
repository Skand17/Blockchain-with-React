import React, {Component} from 'react'
import { Button ,  Modal } from 'semantic-ui-react'

class ModalDetail extends Component {

    constructor(props){
        super(props)
        this.state  = {
            open : false
        }
    }


    // Rendered Modal Popup for block details
    
    render(){

        const { blockDetail : {   difficulty , gasLimit, parentHash, hash,  size ,stateRoot,  transactionsRoot, totalDifficulty } , open, close } = this.props

        return (
            <Modal
                onClose={() => close(false)}
                open={open}
            >
            <Modal.Header>Block Details</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                    <ul>
                        <li>
                            <label>Hash</label>
                            <span>{hash}</span>
                        </li>
                        <li>
                            <label>Parent Hash</label>
                            <span>{parentHash}</span>
                        </li>
                        <li>
                            <label>Difficulty</label>
                            <span>{difficulty}</span>
                        </li>
                        <li>
                            <label>State Root</label>
                            <span>{stateRoot}</span>
                        </li>
                        <li>
                            <label>Gas Limit</label>
                            <span>{gasLimit}</span>
                        </li>
                        <li>
                            <label>Size</label>
                            <span>{size}</span>
                        </li>
                        <li>
                            <label>Transactions Root</label>
                            <span>{transactionsRoot}</span>
                        </li>
                        <li>
                            <label>Total Difficulty</label>
                            <span>{totalDifficulty}</span>
                        </li>
                    </ul>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color='black' onClick={() => close(false)}>
                Close
              </Button>
            </Modal.Actions>
          </Modal>
        )
    }

}

export default ModalDetail
