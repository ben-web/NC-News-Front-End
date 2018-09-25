import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardColumns,
  CardFooter,
  CardHeader,
  CardImg,
  CardLink,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';
import * as api from '../api';
import * as utils from '../utils';
import ArticleMeta from './ArticleMeta';
import ErrorMessage from './ErrorMessage';
import ArticleSort from './ArticleSort';

class Articles extends Component {

  state = {
    articles: null,
    error: null,
    sortCriteria: 'created_at'
  }

  render() {
    const currentTopic = this.props.match.params.topic;
    const { currentUser } = this.props;

    let pageHeading = 'All Articles';
    if (currentTopic) {
      pageHeading = this.getTopicTitle(currentTopic);
    }
    document.title = pageHeading;

    const {
      articles,
      error,
      sortCriteria
    } = this.state;

    if (error) return <ErrorMessage error={error} />
    if (!articles) return <p>Loading articles...</p>

    return (
      <div>
        <h1 className="display-4">{pageHeading}</h1>
        <h2 className="display-5 text-muted">{articles.length} articles</h2>
        <ArticleSort changeSort={this.changeSort}
          sortCriteria={sortCriteria} />
        <CardColumns>
          {
            articles.map(article => {
              return (
                <Card key={article._id}
                  className="text-center">
                  <CardImg top width="100%"
                    src={article.imageUrl} alt="Article Leader" />
                  <CardHeader>
                    {utils.formatDate(article.created_at)}
                  </CardHeader>
                  <CardBody>
                    <CardTitle >
                      {article.title}
                    </CardTitle>
                    <CardSubtitle className="my-3 text-muted">
                      {article.created_by.name}
                      <span className="d-block mt-2 font-italic">
                        {utils.formatDate(article.created_at)}
                      </span>
                    </CardSubtitle>
                    <CardText>
                      {article.body.split(' ').splice(0, 34).join(' ')}&hellip;
                    </CardText>
                    <CardLink tag={Link} to={`/article/${article._id}`}>
                      Read More
                    </CardLink>
                  </CardBody>
                  <CardFooter>
                    <ArticleMeta article={article}
                      currentUser={currentUser} />
                  </CardFooter>
                </Card>
              )
            })
          }
        </CardColumns>
      </div>
    );
  }

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.topic !== this.props.match.params.topic) {
      this.getArticles();
    }
  }

  async getArticles() {
    const { topic } = this.props.match.params;
    const {
      articles,
      error
    } = (!topic)
        ? await api.fetchArticles()
        : await api.fetchArticlesByTopic(topic);

    if (error) return this.setState({ error });

    this.setState({
      articles: this.sortArticles(articles)
    });
  }

  sortArticles = (articles, sortCriteria) => {
    sortCriteria = (sortCriteria)
      ? sortCriteria
      : this.state.sortCriteria;

    if (sortCriteria === 'created_at') {
      articles.sort((a, b) => b[sortCriteria].localeCompare(a[sortCriteria]));
    } else {
      articles.sort((a, b) => b[sortCriteria] - a[sortCriteria]);
    }

    return articles;
  }

  changeSort = (sortCriteria) => {
    const articles = this.sortArticles([...this.state.articles], sortCriteria);
    this.setState({
      articles,
      sortCriteria
    });
  }

  getTopicTitle = (slug) => {
    const { topics } = this.props;
    const currentTopic = topics.find((topic) => topic.slug === slug);
    const topicTitle = currentTopic
      ? currentTopic.title
      : 'Not Found';
    return topicTitle;
  }

}

Articles.propTypes = {
  currentUser: propTypes.object,
  match: propTypes.object.isRequired,
  topics: propTypes.arrayOf(propTypes.object).isRequired
}

export default Articles;