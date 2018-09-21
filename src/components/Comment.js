import React from 'react';
import { Media } from 'reactstrap';
import * as utils from '../utils';

const Comment = ({ comment }) => {
  console.log(comment)
  return (
    <Media tag="li">
      <Media left top href={`/user/${comment.created_by.username}`}>
        <img src="${comment.created_by.avatar_url}"
          alt={`${comment.created_by.name}'s avatar`}
        />
      </Media>
      <Media body>
        <Media heading>
          {comment.created_by.name} {utils.formatDate(comment.created_at)}
        </Media>
        {comment.body}
      </Media>
    </Media>
  );
};

export default Comment;