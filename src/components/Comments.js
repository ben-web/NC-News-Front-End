import React, { Component } from 'react';
import { Media } from 'reactstrap';
import * as api from '../api';
import Comment from './Comment';

class Comments extends Component {
  state = {
    comments: null
  }

  render() {
    const { comments } = this.state;
    if (!comments) return <p>Loading comments...</p>
    return (
      <Media list>
        {
          comments.map(comment => {
            return <Comment key={comment._id} comment={comment} />
          })
        }
      </Media>
    );
  }

  async componentDidMount() {
    /* this.getComments(); */
    const { articleId } = this.props;
    const comments = await api.fetchCommentsByArticleId(articleId)
    console.log('fetchComments called');
    this.setState({ comments });
  }
}

export default Comments;