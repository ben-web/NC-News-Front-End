import React, { Component } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import * as api from '../api';
import * as utils from '../utils';

dayjs.extend(advancedFormat);

class Article extends Component {
  state = {
    article: null
  }

  render() {
    const { article } = this.state;
    if (article) {
      const displayDate = dayjs(article.created_at).format('Do MMM YYYY');
      return (
        <div>
          <h1 className="display-4">{article.title}</h1>
          <h2 className="display-5 text-muted">
            {article.created_by.name}
            <span className="d-block float-right font-italic">{displayDate}</span>
          </h2>
          <img className="article-image" src={utils.randomImageUrl(840, 400)} alt={article.title} width="100%" />
          <p>{article.body}</p>
        </div>
      );
    } else return (<p>loading</p>)
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