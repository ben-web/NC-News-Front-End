import React, { Component } from 'react';
import {
  Badge,
  Button
} from 'reactstrap';
import Votes from './Votes';

class ArticleInfo extends Component {
  render() {
    const { article } = this.props;
    const { belongs_to, comments } = article;
    return (
      <div>
        <Votes entity={article} entityType="article" />
        &nbsp;
        <div>
          Comments <Badge color="dark">{comments}</Badge>
        </div>
        <br />
        <Badge color="secondary" pill
          href={`/topics/${belongs_to}`}>
          {belongs_to}
        </Badge>
      </div>
    );
  }
}

export default ArticleInfo;