import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Badge } from 'reactstrap';
import Votes from './Votes';

class ArticleMeta extends Component {
  render() {
    const { article, currentUser } = this.props;
    const { belongs_to, comments } = article;
    return (
      <div>
        <Votes entity={article}
          entityType="article"
          currentUser={currentUser} />
        &nbsp;
        <div className="meta-legend">
          Comments <Badge color="dark">{comments}</Badge>
        </div>
        &nbsp;
        <Badge color="secondary" pill
          href={`/topics/${belongs_to}`}>
          {belongs_to}
        </Badge>
      </div>
    );
  }
}

ArticleMeta.propTypes = {
  article: propTypes.object.isRequired,
  currentuser: propTypes.object
}

export default ArticleMeta;