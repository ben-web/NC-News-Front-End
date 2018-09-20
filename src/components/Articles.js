import React, { Component } from 'react';
import {
  Button,
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
                  <CardImg top width="100%" src={utils.randomImageUrl(500, 300)} alt="Card image cap" />
                  <CardBody>
                    <CardTitle>{article.title}</CardTitle>
                    <CardSubtitle className="my-3 text-muted">{article.created_by.name}</CardSubtitle>
                    <CardText>
                      {article.body.split(' ').splice(0, 34).join(' ')}&hellip;
                    </CardText>
                    <CardLink href="#">Read More</CardLink>
                  </CardBody>
                  <CardFooter>
                    {article.belongs_to}
                    <br />
                    Votes: {article.votes} | Comments: {article.comments}
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
    if (this.props  && this.props.match.params.topic !== this.props.match.params.topic) {
      this.getArticles();
    }
  }

  getArticles = () => {
    const { topic } = this.props.match.params;
    if (topic) {
      api.fetchArticlesByTopic(topic)
        .then(articles => this.setState({ articles }));
    } else {
      api.fetchArticles()
        .then(articles => this.setState({ articles }));
    }
  }

}

export default Articles;