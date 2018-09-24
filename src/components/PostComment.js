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

class PostComment extends Component {

  state = {
    comment: null,
    commentBody: '',
    error: null,
    submitText: 'Submit Post',
    submitting: false
  }

  render() {
    const { currentUser } = this.props;
    const { commentBody, error, submitting, submitText } = this.state;

    if (!currentUser) return (null);

    if (error) return (
      <Alert color="danger">
        Could not post comment: {error.errorCode} {error.errorMessage}
      </Alert>
    )

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="commentBody">Your comment</Label>
          <Input type="textarea"
            name="commentBody"
            onChange={this.handleInput}
            value={commentBody}
            required
            disabled={submitting} />
          <FormText>Post something meaningful here</FormText>
        </FormGroup>
        <Button color="primary" disabled={submitting}>{submitText}</Button>
      </Form>
    );
  }

  handleInput = (e) => {
    this.setState({
      commentBody: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.commentBody.length > 3) {
      this.setState({
        submitting: true,
        submitText: 'Sending...'
      })
      this.sendComment()
    }
  }

  async sendComment() {
    const { addComment, article, currentUser } = this.props;
    const { comment, error } = await api.postComment(
      article._id,
      this.state.commentBody,
      currentUser._id
    )

    if (error) return this.setState({ error });

    addComment(comment);

    this.setState({
      commentBody: '',
      submitting: false,
      submitText: 'Submit Post'
    })
  }
}

PostComment.propTypes = {
  article: propTypes.object,
  currentUser: propTypes.object
}

export default PostComment;