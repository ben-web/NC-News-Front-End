import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Container, Col, Row } from 'reactstrap';
import * as api from './api';
import Article from './components/Article';
import Articles from './components/Articles';
import ErrorMessage from './components/ErrorMessage';
import Navigation from './components/Navigation';
import NewArticle from './components/NewArticle';

class App extends Component {

  state = {
    currentUser: null,
    error: null,
    topics: null
  };

  render() {
    const {
      currentUser,
      error,
      topics
    } = this.state;

    if (error) return <ErrorMessage error={error} />
    if (!currentUser || !topics) return <p>Loading...</p>

    return (
      <Container>
        <Row>
          <Col>
            <header id="top">
              <Navigation
                currentUser={currentUser}
                topics={topics}
                signOut={this.signOut} />
            </header>
          </Col>
        </Row>
        <main>
          <Row>
            <Col>
              <Switch>
                <Route exact path="/"
                  render={({ match }) =>
                    <Articles
                      currentUser={currentUser}
                      match={match}
                      topics={topics} />
                  } /> />
                <Route path="/topics/:topic"
                  render={({ match }) =>
                    <Articles
                      currentUser={currentUser}
                      match={match}
                      topics={topics} />
                  } />
                <Route path="/article/:id"
                  render={({ match }) =>
                    <Article match={match}
                      currentUser={currentUser} />
                  } />
                <Route path="/new-article"
                  render={() =>
                    <NewArticle currentUser={currentUser}
                      topics={topics} />
                  } />
                <Route render={() =>
                  <ErrorMessage error={
                    { errorCode: 404, errorMessage: 'Page Not Found' }
                  } />
                } />
              </Switch>
            </Col>
          </Row>
        </main>
        <Row>
          <Col>
            <footer>
              <p><a href="#top"><span role="img" aria-label="Back to top of page">⬆️</span></a></p>
              <p>This React App is a student project demo created whilst studying the Full Stack Developer Course at <a href="https://northcoders.com/">Northcoders</a></p>
              <p><a href="https://github.com/ben-web/NC-News-Front-End">Github Repository</a></p>
              <p><small>Created by Ben Web</small></p>
            </footer>
          </Col>
        </Row>
      </Container>
    );
  }

  componentDidMount() {
    this.getUser();
    this.getTopics();
  }

  async getUser() {
    const { user, error } = await api.fetchUser('jessjelly');
    if (error) return this.setState({ error });
    this.setState({
      currentUser: user
    });
  }

  async getTopics() {
    const { topics, error } = await api.fetchTopics();
    if (error) return this.setState({ error });
    this.setState({ topics });
  }

  signOut = () => {
    this.setState({
      currentUser: null
    });
  }

}

export default App;
