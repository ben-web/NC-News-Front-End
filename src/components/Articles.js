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
        <h1 className="display-4">{pageHeading}</h1>
        <CardColumns>
          {
            this.state.articles.map(article => {
              const randomNumber = Math.floor(Math.random() * 85);
              const randomImageUrl = `https://picsum.photos/g/318/180?image=${randomNumber}`
              return (
                <Card key={article._id} className="text-center">
                  <CardImg top width="100%" src={randomImageUrl} alt="Card image cap" />
                  <CardBody>
                    <CardTitle>{article.title}</CardTitle>
                    <CardSubtitle>{article.created_by.name}</CardSubtitle>
                    <CardText>
                      {article.body.split(' ').splice(0, 34).join(' ')}&hellip;
                    </CardText>
                    <CardLink href="#">Read More</CardLink>
                    
                  </CardBody>
                  <CardFooter>
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
    api.fetchArticles()
      .then(articles => this.setState({ articles }));
  }

}

export default Articles;