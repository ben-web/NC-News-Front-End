import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

class Votes extends Component {
  state = {
    modalIsOpen: false,
    voteChange: 0,
    voted: false
  }

  render() {
    const {
      entity: {
        votes,
        created_by: { name }
      }
    } = this.props;

    const {
      modalIsOpen,
      voteChange,
      voted
    } = this.state;

    let votesDisplay = votes + voteChange;

    return (
      <div>
        <Button color="secondary" outline
          onClick={this.toggleModal}
          disabled={voted}>
          Votes <Badge color="dark">{votesDisplay}</Badge>
        </Button>

        <Modal isOpen={modalIsOpen} toggle={this.toggleModal} backdrop={true}>
          <ModalHeader toggle={this.toggleModal} className="bg-light">
            Vote on {name}'s content
          </ModalHeader>
          <ModalBody className="text-center">
            Votes
            <br />
            <Badge color="dark">{votesDisplay}</Badge>
          </ModalBody>
          <ModalFooter className="bg-light">
            <Button color="primary"
              onClick={() => this.handleVote('up')}
              disabled={voted}>
              Vote Up
              </Button>
            &nbsp;
            <Button color="secondary"
              onClick={() => this.handleVote('down')}
              disabled={voted}>
              Vote Down
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  toggleModal = () => {
    console.log('toggleModal called')
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  handleVote = (direction) => {
    /* Call API */
    console.log('handleVote called')

    this.setState({
      voted: true,
      voteChange: direction === 'up'
        ? 1
        : -1
    });
  }

}

Votes.propTypes = {
  entity: propTypes.object.isRequired,
  entityType: propTypes.string.isRequired
}

export default Votes;