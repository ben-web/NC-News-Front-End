import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class ArticleSort extends Component {

  render() {
    const { sortCriteria } = this.props;

    return (
      <Form className="text-right">
        <FormGroup tag="fieldset" className="py-1 bg-light">
          <FormGroup check inline>
            <Label check>
              <Input type="radio"
                name="created_at"
                checked={sortCriteria === 'created_at'}
                onChange={this.handleInput} />
              &nbsp;
              Date
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input type="radio"
                name="votes"
                checked={sortCriteria === 'votes'}
                onChange={this.handleInput} />
              &nbsp;
              Votes
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input type="radio"
                name="comments"
                checked={sortCriteria === 'comments'}
                onChange={this.handleInput} />
              &nbsp;
              Comments
            </Label>
          </FormGroup>
        </FormGroup>
      </Form>
    );
  }

  handleInput = e => {
    this.props.changeSort(e.target.name);
  }

}

ArticleSort.propTypes = {
  changeSort: propTypes.func.isRequired,
  sortCriteria: propTypes.string.isRequired
}

export default ArticleSort;