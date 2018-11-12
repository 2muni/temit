import React, { Fragment } from 'react';
import { Icon, Button } from 'react-materialize'

const UserHead = ({
  currentUser,
  user,
  isEdit,
  edit,
  handleToggle,
  handleChange,
  handleSubmit,
  handleFollow,
  addImage,
}) => (
  <div className="user-head">
  {isEdit ?
    <Fragment>
    <label className="user-thumbnail" htmlFor="img">
        <div className="edit-thumbnail circle"><Icon>add_a_photo</Icon></div>
        <img className="circle" src={edit.thumbnail}/>
    </label>
    <input onChange={addImage} id="img" type="file" accept="image/*;capture=camera" style={{display: 'none'}}/>
    <div className="user-info">
      <div className="btns">
        <Button className="cancel" onClick={handleToggle}>취소</Button>
        <Button onClick={handleSubmit}>저장하기</Button>
      </div>
      <div className="user-name">
        <input
          name="name"
          onChange={handleChange}
          value={edit.name}
        />
      </div>
      <div className="divider"></div>
      <div className="user-bio">
        <input
          name="bio"
          onChange={handleChange}
          value={edit.bio}
          placeholder="한줄 설명"
        />
      </div>
    </div>
    </Fragment>
  :
    <Fragment>
    <img className="user-thumbnail circle" src={user.thumbnail}></img>
    <div className="user-info">
      <div className="btns">
      {currentUser.id !== user.id ?
        <Button onClick={handleFollow}>구독하기</Button> :
        <Button onClick={handleToggle}>편집하기</Button>
      }</div>
      <div className="user-name">
        <div>{user.name}</div>
      </div>
      <div className="divider"></div>
      <div className="user-bio">
        <div>{user.bio}</div>
      </div>
    </div>
    </Fragment>
  }</div>
)

export default UserHead;