import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Container, Col, Row } from 'reactstrap';
import * as api from './api';
import Article from './components/Article';
import Articles from './components/Articles';
import ErrorMessage from './components/ErrorMessage';
import Navigation from './components/Navigation';

class App extends Component {

  state = {
    currentUser: {
      _id: "5b785a65f0e7ab0ac5c99ee5",
      username: "jessjelly",
      name: "Jess Jelly",
      avatar_url: "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg"
    },
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
    if (!topics) return <p>Loading topics...</p>
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
                <Route exact path="/" component={Articles} />
                <Route path="/topics/:topic"
                  render={({ match }) =>
                    <Articles match={match}
                      topics={topics} />
                  } />
                <Route path="/article/:id"
                  render={({ match }) =>
                    <Article match={match} />
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
              <p><a href="#top">Back to top</a></p>
              <p><small>&copy; NC News 2018</small></p>
            </footer>
          </Col>
        </Row>
      </Container>
    );
  }

  componentDidMount() {
    this.getTopics();
  }

  async getTopics() {
    const { topics, error } = await api.fetchTopics()
    if (error) return this.setState({ error });
    this.setState({ topics });
  }

  signOut = () => {
    this.setState({
      currentUser: null
    })
  }

}

export default App;
