import React, { Component } from 'react';
import * as api from '../api';
import * as utils from '../utils';
import Comments from './Comments';

class Article extends Component {
  state = {
    article: null
  }

  render() {
    const { article } = this.state;
    if (!article) return <p>Loading...</p>
    return (
      <div>
        <h1 className="display-4">{article.title}</h1>
        <h2 className="display-5 text-muted">
          {article.created_by.name}
          <span className="d-block float-right font-italic">{utils.formatDate(article.created_at)}</span>
        </h2>
        <img className="article-image" src={utils.randomImageUrl(840, 400)} alt={article.title} width="100%" />
        <p>{article.body}</p>
        <Comments articleId={article._id} />
      </div>
    );
  }

  componentDidMount() {
    this.getArticle();
  }

  getArticle = () => {
    const { id } = this.props.match.params;
    api.fetchArticle(id)
      .then(article => this.setState({ article }));
    console.log('fetchArticle called');
  }

}

export default Article;