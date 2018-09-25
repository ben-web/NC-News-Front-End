import React from 'react';
import propTypes from 'prop-types';
import { Media } from 'reactstrap';
import * as utils from '../utils';
import Avatar from './Avatar';
import DeleteComment from './DeleteComment';
import Votes from './Votes';

const Comment = ({ 
  comment, 
  currentUser, 
  removeComment }) => {
  return (
    <Media tag="li" className="my-3 pt-3 border-top border-light">
      <Media left top 
      href={`/users/${comment.created_by.username}`}>
        <Avatar avatarUrl={comment.created_by.avatar_url} 
        userName={comment.created_by.name} />
      </Media>
      <Media body>
        <Media heading>
          {comment.created_by.name}
          <small className="float-right text-muted font-italic">
          {utils.formatDate(comment.created_at)}
          </small>
        </Media>
        {comment.body}
        <div className="d-block my-2 float-right">
          {comment && currentUser &&
            <DeleteComment comment={comment}
              currentUser={currentUser}
              removeComment={removeComment} />}
          &nbsp;
          <Votes entity={comment}
            entityType="comment"
            currentUser={currentUser} />
        </div>
      </Media>
    </Media>
  );
};

Comment.propTypes = {
  comment: propTypes.object.isRequired,
  currentUser: propTypes.object,
  removeComment: propTypes.func.isRequired
}

export default Comment;