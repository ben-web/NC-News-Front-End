import React from 'react';
import propTypes from 'prop-types';
import { Media } from 'reactstrap';
import Comment from './Comment';

const Comments = ({
  comments,
  currentUser,
  removeComment
}) => {
  if (!comments) return <p>No comments for this article</p>
  return (
    <Media list className="pl-1 pl-sm-4">
      {
        comments.map(comment => {
          return <Comment key={comment._id}
            comment={comment}
            currentUser={currentUser}
            removeComment={removeComment} />
        })
      }
    </Media>
  );
};

Comments.propTypes = {
  article: propTypes.object.isRequired,
  comments: propTypes.arrayOf(propTypes.object),
  currentUser: propTypes.object,
  removeComment: propTypes.func.isRequired
}

export default Comments;
