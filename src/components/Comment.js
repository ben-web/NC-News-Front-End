import React from 'react';
import { Media } from 'reactstrap';
import * as utils from '../utils';
import Avatar from './Avatar';

const Comment = ({ comment }) => {
  console.log(comment.created_by.avatar_url)
  return (
    <Media tag="li">
      <Media left top href={`/user/${comment.created_by.username}`}>
        <Avatar avatarUrl={comment.created_by.avatar_url} userName={comment.created_by.name} />
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