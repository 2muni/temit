import React from 'react'
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';

const CardThumbnail = ({
  post
}) => (
  <Link className="post-thumbnail" to={`/post/${post.id}`}>
  {post.thumbnail ?
    <img src={post.thumbnail}/> :
    <Icon>image</Icon>}
  </Link>
)

export default CardThumbnail