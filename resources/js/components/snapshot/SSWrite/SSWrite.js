import React from 'react';
import { Icon, Button } from 'react-materialize';

const handleHeight = (e) => {
  e.target.style.height = '0';
  e.target.style.height = (e.target.scrollHeight)+"px";
}

const SSWrite = () => (
  <div className="snapshot-write">
    <div className="write-head">
      <Button>업로드</Button>
    </div>
    <div className="write-body">
      <textarea
        onKeyUp={handleHeight}
      />
      <div className="image-wrapper"></div>
    </div>
    <div className="write-options">
      <div className="btns">
        <Icon>add_a_photo</Icon>
        <Icon>person_add</Icon>
        <Icon>local_offer</Icon>
      </div>
      <div className="length">
        <span>dsfsdf</span>
      </div>
    </div>
  </div>
);

export default SSWrite;