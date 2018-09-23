import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Media
} from 'reactstrap';
import * as api from '../api';
import Comment from './Comment';

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
    const { comment, commentBody, error, submitting, submitText } = this.state;

    if (!currentUser) return (null);
    if (error) return (
      <div>
        <h3 className="text-danger">{error.errorCode} Error</h3>
        <p className="text-danger">Could not save comment: {error.errorMessage}</p>
      </div>
    )
    if (comment) return (
      <Media list>
        <Comment
          comment={comment}
          currentUser={currentUser} />
      </Media>
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
      comment: comment,
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