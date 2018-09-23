import React, { Component } from 'react';
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
import ErrorMessage from './ErrorMessage';
import ArticleMeta from './ArticleMeta';

class Articles extends Component {

  state = {
    articles: null,
    error: null
  }

  render() {
    const currentTopic = this.props.match.params.topic;

    let pageHeading = 'All Articles';
    if (currentTopic) {
      pageHeading = this.getTopicTitle(currentTopic);
    }
    document.title = pageHeading;

    const { articles, error } = this.state;

    if (error) return <ErrorMessage error={error} />
    if (!articles) return <p>Loading articles...</p>

    return (
      <div>
        <h1 className="display-4">{pageHeading}</h1>
        <p>{articles.length} articles</p>
        <CardColumns>
          {
            articles.map(article => {
              return (
                <Card key={article._id} className="text-center">
                  <CardImg top width="100%" src={utils.randomImageUrl(500, 300)} alt="Article Leader" />
                  <CardHeader>{utils.formatDate(article.created_at)}</CardHeader>
                  <CardBody>
                    <CardTitle>{article.title}</CardTitle>
                    <CardSubtitle className="my-3 text-muted">
                      {article.created_by.name}
                      <span className="d-block mt-2 font-italic">{utils.formatDate(article.created_at)}</span>
                    </CardSubtitle>
                    <CardText>
                      {article.body.split(' ').splice(0, 34).join(' ')}&hellip;
                    </CardText>
                    <CardLink href={`/article/${article._id}`}>Read More</CardLink>
                  </CardBody>
                  <CardFooter>
                    <ArticleMeta article={article} />
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

  async getArticles() {
    const { topic } = this.props.match.params;
    const { articles, error } = (!topic)
      ? await api.fetchArticles()
      : await api.fetchArticlesByTopic(topic);

    console.log('fetchArticles called');

    if (error) return this.setState({ error });
    this.setState({ articles });
  }

  getTopicTitle = (slug) => {
    const { topics } = this.props;
    const currentTopic = topics.find((topic) => topic.slug === slug);
    const topicTitle = currentTopic ? currentTopic.title : 'Not Found';
    return topicTitle;
  }

}

export default Articles;