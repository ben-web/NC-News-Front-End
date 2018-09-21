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

class Articles extends Component {

  state = {
    articles: []
  }

  render() {

    let pageHeading = 'All Articles';
    if (this.props.match.params.topic) {
      const { topics } = this.props;
      const topicTitle = topics.find((topic) => topic.slug === this.props.match.params.topic).title;
      pageHeading = `${topicTitle}`;
    }
    document.title += ` ${pageHeading}`;

    const articleCount = this.state.articles.length;

    return (
      <div>
        <h1 className="display-4">{pageHeading}</h1>
        <p>{articleCount} articles</p>
        <CardColumns>
          {
            this.state.articles.map(article => {
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
                    Votes: {article.votes} | Comments: {article.comments}
                    <br/>
                    {article.belongs_to}
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

  getArticles = () => {
    const { topic } = this.props.match.params;
    if (topic) {
      api.fetchArticlesByTopic(topic)
        .then(articles => this.setState({ articles }));
      console.log('fetchArticlesByTopic called');
    } else {
      api.fetchArticles()
        .then(articles => this.setState({ articles }));
      console.log('fetchArticles called');
    }
  }

}

export default Articles;