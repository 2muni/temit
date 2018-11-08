import React from 'react';
import { Icon, Button } from 'react-materialize';

const handleHeight = (e) => {
  e.target.style.height = '1rem';
  e.target.style.height = (e.target.scrollHeight)+"px";
}

//<span onClick={handleClick}><Icon className="add-person">person_add</Icon></span>
//<span onClick={handleClick}><Icon className="add-tag">local_offer</Icon></span>

const SSWrite = ({
  addImage,
  handleClick,
  handleSubmit,
  handleChange,
  body,
  preview
}) => (
  <div className="snapshot-write">
    <div className="write-head">
      <Button onClick={handleSubmit}>업로드</Button>
    </div>
    <div className="write-body">
      <img src={preview}/>
      <textarea
        id="text"
        rows={1}
        onKeyDown={handleHeight}
        onKeyUp={handleHeight}
        value={body}
        onChange={handleChange}
      />
      <div className="image-wrapper"></div>
    </div>
    <div className="write-options">
      <div className="btns">
        <label htmlFor="img"><Icon>add_a_photo</Icon></label>
        <input onChange={addImage} id="img" type="file" accept="image/*;capture=camera" style={{display: 'none'}}></input>
      </div>
      <div className="length">
        <span>{body.length}/150</span>
      </div>
    </div>
  </div>
);

export default SSWrite;