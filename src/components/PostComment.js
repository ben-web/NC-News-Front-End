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
    commentBody: ''
  }

  render() {
    const { article, currentUser } = this.props;
    const { commentBody } = this.state;
    console.log(this.props)
    if (!currentUser) return (null);
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="commentBody">Your comment</Label>
          <Input type="textarea"
            name="commentBody"
            id="commentBody"
            onChange={this.handleInput}
            value={commentBody}
            required />
          <FormText>Post something meaningful here</FormText>
        </FormGroup>
        <Button>Post Comment</Button>
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
    console.log('comment submitted')
    if (this.state.commentBody.length > 3) this.sendComment();
  }

  async sendComment() {
    const { article, currentUser } = this.props;
    const { comment, error } = await api.postComment(
      article._id,
      this.state.commentBody,
      currentUser._id
    )

    if (error) return this.setState({ error });
    console.log(comment)
  }
}

PostComment.propTypes = {
  article: propTypes.object,
  currentUser: propTypes.object
}

export default PostComment;