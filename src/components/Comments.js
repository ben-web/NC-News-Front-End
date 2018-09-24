import React from 'react';
import { Media } from 'reactstrap';
import Comment from './Comment';

const Comments = ({ comments, currentUser, removeComment}) => {
  if (!comments) return <p>No comments for this article</p>
  return (
    <Media list>
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

export default Comments;
