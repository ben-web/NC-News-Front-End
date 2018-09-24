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
import * as api from '../api';

class Votes extends Component {
  state = {
    modalIsOpen: false,
    voteChange: 0,
    voted: false
  }

  render() {
    const {
      currentUser,
      entity: {
        created_by: { name },
        votes,
      }
    } = this.props;

    const {
      modalIsOpen,
      voteChange,
      voted
    } = this.state;

    const votingDisabled = !currentUser || voted;
    let votesDisplay = votes + voteChange;

    return (
      <div className="d-inline-block">
        <Button color="secondary" outline
          onClick={this.toggleModal}
          disabled={votingDisabled}>
          Votes <Badge color="dark">{votesDisplay}</Badge>
        </Button>

        <Modal isOpen={modalIsOpen} toggle={this.toggleModal} backdrop={true}>
          <ModalHeader toggle={this.toggleModal} className="bg-light">
            Vote on {name}'s content
          </ModalHeader>
          <ModalBody className="text-center">
            <div className="meta-legend">
              Votes <Badge color="dark">{votesDisplay}</Badge>
            </div>
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
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  handleVote = (direction) => {

    this.makeVote(direction);

    this.setState({
      voted: true,
      voteChange: direction === 'up'
        ? 1
        : -1
    });
  }

  async makeVote(direction) {
    const {
      entity: {
        _id,
      },
      entityType
    } = this.props;

    if (entityType === 'comment') {
      await api.VoteComment(_id, direction);
    } else if (entityType === 'article') {
      await api.VoteArticle(_id, direction);
    }
  }

}

Votes.propTypes = {
  currentuser: propTypes.object,
  entity: propTypes.object.isRequired,
  entityType: propTypes.string.isRequired
}

export default Votes;