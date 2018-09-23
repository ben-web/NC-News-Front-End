import React, { Component } from 'react';
import * as api from '../api';
import * as utils from '../utils';
import ArticleMeta from './ArticleMeta';
import Comments from './Comments';
import ErrorMessage from './ErrorMessage';


class Article extends Component {
  state = {
    article: null,
    error: null
  }

  render() {

    const { article, error } = this.state;

    if (error) return <ErrorMessage error={error} />
    if (!article) return <p>Loading...</p>

    document.title = article.title;

    return (
      <div>
        <h1 className="display-4">{article.title}</h1>
        <img className="article-image" src={utils.randomImageUrl(840, 400)} alt={article.title} width="100%" />
        <h2 className="display-5 text-muted">
          {article.created_by.name}
          <span className="d-block float-right font-italic">{utils.formatDate(article.created_at)}</span>
        </h2>
        <p>{article.body}</p>
        <div className="float-right">
          <ArticleMeta article={article} />
        </div>
        <span className="clearfix">&nbsp;</span>
        <aside>
          <Comments articleId={article._id} />
        </aside>
      </div>
    );
  }

  componentDidMount() {
    this.getArticle();
  }

  async getArticle() {
    const { id } = this.props.match.params;
    const { article, error } = await api.fetchArticle(id);
    console.log('fetchArticle called');

    if (error) return this.setState({ error });
    this.setState({ article });
  }

}

export default Article;