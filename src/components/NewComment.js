import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label
} from 'reactstrap';
import * as api from '../api';

class NewComment extends Component {

  state = {
    comment: null,
    commentBody: '',
    error: null,
    submitText: 'Publish Comment',
    submitting: false
  }

  render() {
    const {
      commentBody,
      error,
      submitting,
      submitText
    } = this.state;

    if (error) return (
      <Alert color="danger">
        Could not post comment: {error.errorCode} {error.errorMessage}
      </Alert>
    )

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="commentBody">
            Your comment
          </Label>
          <Input type="textarea"
            name="commentBody"
            onChange={this.handleInput}
            value={commentBody}
            required
            disabled={submitting} />
          <FormText>
            Post something meaningful here
            </FormText>
        </FormGroup>
        <Button color="primary" disabled={submitting}>{submitText}</Button>
      </Form>
    );
  }

  handleInput = e => {
    this.setState({
      commentBody: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.commentBody.length > 3) {
      this.setState({
        submitting: true,
        submitText: 'Saving...'
      })
      this.sendComment()
    }
  }

  async sendComment() {
    const {
      addComment,
      article,
      currentUser
    } = this.props;
    const {
      comment,
      error } = await api.postComment(
        article._id,
        this.state.commentBody,
        currentUser._id
      )

    if (error) return this.setState({ error });

    addComment(comment);

    this.setState({
      commentBody: '',
      submitting: false,
      submitText: 'Publish Comment'
    })
  }
}

NewComment.propTypes = {
  addComment: propTypes.func.isRequired,
  article: propTypes.object.isRequired,
  currentUser: propTypes.object
}

export default NewComment;