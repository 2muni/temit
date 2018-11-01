import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

const PostBody = ({
  article
}) => (
  <Fragment>
    <img className="article-thumbnail" src={article.thumbnail}/>
    <div className="article-content"/>
    <div className="article-tags">
      {article.tags.map((tag, i) => (
        <Link key={i} to={`/${tag.id}`}>{tag.tag}</Link>
      ))}
    </div>
  </Fragment>
)

export default PostBody;