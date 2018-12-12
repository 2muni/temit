import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-materialize'
import { CardContent, CardThumbnail } from './'

const PostList = ({ list }) => (
  <div className="postcard-list">
  {list.map((post, i) => (
    <div key={i} className="postcard">
      <CardThumbnail post={post}/>
      <CardContent post={post}/>
    </div>))}
      <Link to='/write'>
        <Button floating icon='mode_edit' className='floatBtn circle' large style={{bottom: '45px', right: '335px'}}/>
      </Link>
  </div>
)

export default PostList;
