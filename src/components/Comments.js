import React, { Component } from 'react';
import { Media } from 'reactstrap';
import * as api from '../api';
import Comment from './Comment';
import ErrorMessage from './ErrorMessage';

class Comments extends Component {
  state = {
    comments: null,
    error: null
  }

  render() {
    const { currentUser } = this.props;
    const { comments, error } = this.state;

    if (error) return <ErrorMessage error={error} />
    if (!comments) return <p>No comments for this article</p>

    return (
      <Media list>
        {
          comments.map(comment => {
            return <Comment key={comment._id} 
            comment={comment} 
            currentUser={currentUser}/>
          })
        }
      </Media>
    );
  }

  componentDidMount() {
    this.getComments();
  }

  async getComments() {
    const { articleId } = this.props;
    const { comments, error } = await api.fetchCommentsByArticleId(articleId)
    
    if (error && error.errorCode !== 404) return this.setState({ error })

    comments.sort((a, b) => a.created_at.localeCompare(b.created_at));

    this.setState({ comments });
  }
}

export default Comments;