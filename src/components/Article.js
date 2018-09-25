import React, { Component } from 'react';
import propTypes from 'prop-types';
import * as api from '../api';
import * as utils from '../utils';
import ArticleMeta from './ArticleMeta';
import Comments from './Comments';
import ErrorMessage from './ErrorMessage';
import NewComment from './NewComment';

class Article extends Component {
  state = {
    article: null,
    comments: null,
    error: null
  }

  render() {
    const { currentUser } = this.props;
    const {
      article,
      comments,
      error
    } = this.state;

    if (error) return <ErrorMessage error={error} />
    if (!article) return <p>Loading...</p>

    document.title = article.title;

    return (
      <div>
        <h1 className="display-4">{article.title}</h1>
        <img className="article-image"
          src={article.imageUrl}
          alt={article.title}
          width="100%" />
        <h2 className="display-5 text-muted">
          {article.created_by.name}
          <span className="d-block float-right font-italic">
            {utils.formatDate(article.created_at)}
          </span>
        </h2>
        <p>{article.body}</p>
        <div className="float-right">
          <ArticleMeta article={article}
            currentUser={currentUser} />
        </div>
        <span className="clearfix">&nbsp;</span>
        <aside>
          {article && <Comments article={article}
            comments={comments}
            currentUser={currentUser}
            removeComment={this.removeComment} />}
          {currentUser && <NewComment addComment={this.addComment}
            article={article}
            currentUser={currentUser} />}
        </aside>
      </div>
    );
  }

  componentDidMount() {
    this.getArticle();
    this.getComments();
  }

  async getArticle() {
    const { id } = this.props.match.params;
    const {
      article,
      error
    } = await api.fetchArticle(id);

    if (error) return this.setState({ error });
    this.setState({ article });
  }

  async getComments() {
    const { id } = this.props.match.params;
    const { 
      comments,
      error 
    } = await api.fetchCommentsByArticleId(id);

    if (error && error.errorCode !== 404) return this.setState({ error });
    if (error && error.errorCode === 404) return this.setState({ comments: null });

    comments.sort((a, b) => a.created_at.localeCompare(b.created_at));
    this.setState({ comments });
  }

  addComment = comment => {
    const { comments } = this.state;
    const newComments = [];
    if (comments) newComments.push(...comments);
    newComments.push(comment);
    this.setState({
      comments: newComments
    });
  }

  removeComment = commentToRemove => {
    let newComments = this.state.comments.filter(comment => {
      return comment._id !== commentToRemove._id;
    });
    this.setState({
      comments: newComments
    });
  }

}

Article.propTypes = {
  currentUser: propTypes.object,
  match: propTypes.object.isRequired
}

export default Article;