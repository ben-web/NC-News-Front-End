import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import propTypes from 'prop-types';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label
} from 'reactstrap';
import * as api from '../api';

class NewArticle extends Component {
  state = {
    article: null,
    body: '',
    error: null,
    submitText: 'Submit Article',
    submitting: false,
    title: '',
    topic: 'coding'
  }
  render() {
    const {
      article,
      body,
      error,
      submitText,
      submitting,
      title,
      topic
    } = this.state;

    if (error) return (
      <Alert color="danger">
        Could not post article: {error.errorCode} {error.errorMessage}
      </Alert>
    )

    const {
      currentUser,
      topics
    } = this.props;

    if (!currentUser) return <Redirect to='/' />
    if (article) return <Redirect to={`/article/${article._id}`} />

    document.title = 'Post New Article';

    return (
      <div>
        <h1>Post New Article</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="title">
              Title
            </Label>
            <Input type="text"
              name="title"
              onChange={this.handleInput}
              value={title}
              autoFocus
              required
              disabled={submitting} />
            <FormText>
              Choose a meaningful title
              </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="topic">Topic</Label>
            <Input type="select" name="topic"
              onChange={this.handleInput}
              disabled={submitting}
              value={topic}>
              {
                topics.map(topic => {
                  return <option key={topic.slug}
                    value={topic.slug}>{topic.title}</option>
                })
              }
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="body">
              Your article
            </Label>
            <Input type="textarea"
              name="body"
              onChange={this.handleInput}
              value={body}
              required
              disabled={submitting} />
            <FormText>
              Please check your spelling before submitting
            </FormText>
          </FormGroup>
          <Button color="primary" disabled={submitting}>{submitText}</Button>
        </Form>
      </div>
    );
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      submitting: true,
      submitText: 'Sending...'
    })
    this.sendArticle();
  }

  async sendArticle() {
    const { currentUser } = this.props;
    const {
      body,
      title,
      topic
    } = this.state;

    const {
      article,
      error } = await api.postArticle(
        body,
        title,
        topic,
        currentUser._id
      )

    if (error) return this.setState({ error });

    this.setState({ article });
  }

}

NewArticle.propTypes = {
  currentUser: propTypes.object.isRequired,
  topics: propTypes.arrayOf(propTypes.object).isRequired
}

export default NewArticle;