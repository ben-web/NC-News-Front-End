import React from 'react';
import { Media } from 'reactstrap';
import * as utils from '../utils';
import Avatar from './Avatar';
import Votes from './Votes';

const Comment = ({ comment }) => {
  console.log(comment.created_by.avatar_url)
  return (
    <Media tag="li" className="my-4">
      <Media left top href={`/users/${comment.created_by.username}`}>
        <Avatar avatarUrl={comment.created_by.avatar_url} userName={comment.created_by.name} />
      </Media>
      <Media body>
        <Media heading>
          {comment.created_by.name}
          <small className="float-right text-muted">{utils.formatDate(comment.created_at)}</small>
        </Media>
        {comment.body}
        <Votes entity={comment} 
        entityType="comment"/>
      </Media>
    </Media>
  );
};

export default Comment;