import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import * as api from '../api';

class DeleteComment extends Component {
  state = {
    error: null,
    modalIsOpen: false
  }

  render() {
    const { 
      comment, 
      currentUser 
    } = this.props;
    const { 
      error, 
      modalIsOpen 
    } = this.state;

    if (error) return (
      <Alert color="danger">
        Could not delete comment: {error.errorCode} {error.errorMessage}
      </Alert>
    )

    if (comment.created_by.username !== currentUser.username) return null;

    return (
      <div className="d-inline-block">
        <Button color="danger"
          onClick={this.toggleModal}>
          Delete
        </Button>
        <Modal isOpen={modalIsOpen} 
        toggle={this.toggleModal} 
        backdrop={true}>
          <ModalHeader toggle={this.toggleModal} 
          className="bg-light">
            Confirm Delete
          </ModalHeader>
          <ModalBody className="text-center">
            Are you sure you'd like to delete this comment?
          </ModalBody>
          <ModalFooter className="bg-light">
            <Button color="danger"
              onClick={() => this.handleDelete(comment._id)}>
              Delete
              </Button>
            &nbsp;
            <Button color="secondary"
              onClick={this.toggleModal}>
              Cancel
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

  async handleDelete(commentId) {
    const { comment, error } = await api.deleteComment(commentId);
    if (error) return this.setState({ error });
    this.props.removeComment(comment);
  }

}

DeleteComment.propTypes = {
  comment: propTypes.object.isRequired,
  currentUser: propTypes.object.isRequired,
  removeComment: propTypes.func.isRequired
}

export default DeleteComment;

