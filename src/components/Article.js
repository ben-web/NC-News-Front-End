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
    document.title = article.title;
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

  async componentDidMount() {
    const { id } = this.props.match.params;
    const article = await api.fetchArticle(id);
    console.log('fetchArticle called');
    this.setState({ article });
  }

}

export default Article;