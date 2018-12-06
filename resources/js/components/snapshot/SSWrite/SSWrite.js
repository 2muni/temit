import React from 'react';
import { Modal, Icon, Button } from 'react-materialize';

const handleHeight = (e) => {
  e.target.style.height = '1rem';
  e.target.style.height = (e.target.scrollHeight)+"px";
}

const Form = ({
  addImage,
  handleSubmit,
  handleChange,
  body,
  preview
}) => (
  <div className="snapshot-write">
    <div className="write-head">
      <div className="title">새로운 스냅샷 작성</div>
      <Button className="modal-action modal-close">뒤로가기</Button>
      {body ? 
        <Button className="submit " onClick={handleSubmit}>작성하기</Button> :
        <Button className="modal-action modal-close">작성하기</Button>
      }
    </div>
    <div className="write-body">
      <img src={preview}/>
      <textarea
        id="text"
        rows={1}
        onKeyDown={handleHeight}
        onBlur={handleHeight}
        value={body}
        onChange={handleChange}
        required
      />
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
)

const SSWrite = ({
  addImage,
  handleSubmit,
  handleChange,
  body,
  preview
}) => (
  <Modal
    className='modal-wrapper'
    trigger={
      <Button
        floating
        icon='add_a_photo'
        className='floatBtn circle'
        large style={{bottom: '45px', right: '335px'}}
      />}
    modalOptions={{
      inDuration: 100,
      outDuration: 100,
    }}
    >
    <div><Form
      addImage={addImage}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      body={body}
      preview={preview}
    /></div>
  </Modal>


);

export default SSWrite;




