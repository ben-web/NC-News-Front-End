import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';
import * as api from '../api';

class PostComment extends Component {

  state = {
    commentBody: '',
    error: null,
    submitText: 'Submit Post',
    submitting: false
  }

  render() {
    const { article, currentUser } = this.props;
    const { commentBody, error, submitting, submitText } = this.state;


    if (!currentUser) return (null);
    if (error) return (
      <div>
        <h3 className="text-danger">{error.errorCode} Error</h3>
        <p className="text-danger">Could not save comment: {error.errorMessage}</p>
      </div>
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
        <Button disabled={submitting}>{submitText}</Button>
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
    const { article, currentUser } = this.props;
    const { comment, error } = await api.postComment(
      article._id,
      this.state.commentBody,
      currentUser._id
    )

    if (error) return this.setState({ error });

    this.setState({
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