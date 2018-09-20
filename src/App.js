import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Container, Col, Row } from 'reactstrap';
import Articles from './components/Articles';
import Navigation from './components/Navigation';

class App extends Component {

  state = {
    currentUser: {
      _id: "5b785a65f0e7ab0ac5c99ee5",
      username: "jessjelly",
      name: "Jess Jelly",
      avatar_url: "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg"
    },
    topics: [
      { title: 'Coding is Fun', slug: 'coding' },
      { title: 'Football and Games', slug: 'football' },
      { title: 'Cooking with Gas', slug: 'cooking' },
    ]
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <header className="py-3" id="top">
              <a href="/" className="logo text-dark">NC News</a>
            </header>
          </Col>
        </Row>
        <Row>
          <Col>
            <Navigation topics={this.state.topics} />
          </Col>
        </Row>
        <main>
          <Row>
            <Col lg="9">
              <Switch>
                <Route exact path="/" component={Articles} />
                <Route path="/topics/:topic"
                  render={({ match }) =>
                    <Articles match={match}
                      currentTopic={this.state.currentTopic}
                      topics={this.state.topics} />}
                />
                <Route component={this.NoMatch} />
              </Switch>
            </Col>
            <Col>
              <aside>
                <h2>Sidebar</h2>
                <p>sort options, top users, etc</p>
              </aside>
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

  NoMatch = ({ location }) => (
    <div>
      <h1>404
        <small className="ml-2 text-muted">Route Not Found</small></h1>
      <p>No match for <code>{location.pathname}</code></p>
    </div>
  );


}

export default App;
