import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, CardColumns, CardText, CardTitle, CardFooter } from 'reactstrap';
import * as api from '../api';

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

    return (
      <div>
        <h1>{pageHeading}</h1>
        <p>Displays all articles or articles by topic</p>
        <CardColumns>
          {
            this.state.articles.map(article => {
              return (
                
                <Card key={article._id}>
                  <CardHeader>Header</CardHeader>
                  <CardBody>
                    <CardTitle>{article.title}</CardTitle>
                    <CardText>{article.body.substring(0, 300)}...</CardText>
                  </CardBody>
                  <CardFooter>Footer</CardFooter>
                </Card>
                
              )
            })
          }



        </CardColumns>


        <Row>
          <Col sm="6">
            Article
          </Col>
          <Col sm="6">
            Article
          </Col>
        </Row>
      </div>
    );
  }

  componentDidMount() {
    api.fetchArticles()
      .then(articles => this.setState({ articles }));
  }

}

export default Articles;