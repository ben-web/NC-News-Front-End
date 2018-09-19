import React, { Component } from 'react';
import * as api from '../api';

class Articles extends Component {

  state = {
    articles: [{
      _id: "5b785a68f0e7ab0ac5c99ee7",
      votes: 0,
      title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
      created_by: {
        _id: "5b785a65f0e7ab0ac5c99ee5",
        username: "jessjelly",
        name: "Jess Jelly",
        avatar_url: "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
        __v: 0
      },
      body: "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
      created_at: "2017-07-20T20:57:53.256Z",
      belongs_to: "coding",
      __v: 0,
      comments: 6
    }]
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
      </div>
    );
  }

  componentDidMount() {
    const articles = api.fetchArticles()
      .then(articles => {
        console.log(articles)
      });
  }

}

export default Articles;