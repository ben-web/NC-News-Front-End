import React from 'react';
import { once } from 'lodash';
import avatar from './avatar.svg';

const Avatar = ({ avatarUrl, userName}) => {

  const replaceAvatar = (e) => {
    e.target.src = avatar
  }

  return (
    <div>
      <img src={avatarUrl}
        alt={`${userName}'s avatar`}
        height="64px" width="64px"
        className="mr-3 rounded-circle"
        onError={once((e) => replaceAvatar(e))}
      />
    </div>
  );
};

export default Avatar;