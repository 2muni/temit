import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Modal, Input, Row, Icon } from 'react-materialize'

const Form = ({
  post,
  tags,
  handleTags,
  handleChange,
  handleSubmit,
}) => (
  <div className="submit-card">
    <div className="submit-header">새 글 작성</div>
    <div className="submit-form">
      <section>
        <div className="section-title">글 제목</div>
        <div className="text submit-title">
          <input name="title" placeholder="제목을 입력하세요" required
            onChange={handleChange}
            value={post.title}  
          />
        </div>
      </section>
      <section>
        <div className="section-title">태그 설정</div>
        <div className="text submit-tags">
          <input name="tag" placeholder="태그를 입력하세요"
            onChange={handleChange}
            value={post.tag} 
          />
          <div className="btn util" onClick={handleTags}>등록</div>
        </div>
        <div className="tags-wrapper">{tags && tags.map((tag, i) => (
          <div key={i} className="chip">
            {tag}<div data-id={i} className="material-icons" onClick={handleTags}>close</div>
          </div>
        ))}</div>
      </section>
      <section>
      <div className="section-title">썸네일 지정</div>
        <div className="submit-thumbnail">
          <Row>
            <Input s={12} type="file" label="업로드" name="thumbnail" 
              onChange={handleChange}
              accept=".jpg, .jpeg, .png"
              />
          </Row>
        </div>
      </section>
    </div>
    <div className="submit-footer">
      <div className="btns-group">
        <Button className="modal-action modal-close">뒤로가기</Button>
      {post.title && post.body ? 
        <Button className="submit modal-action modal-close" onClick={handleSubmit}>작성하기</Button> :
        <Button>작성하기</Button>
      }
      </div>
    </div>
  </div>
)

const EditorNav = ({
  post,
  tags,
  handleTags,
  handleChange,
  handleSubmit,
}) => (
  <nav className="post-editor-nav-wrapper">
      <Link to="/" className="logo">temit</Link>
      <div className="modal-wrapper">
        <Modal
          trigger={<Button>작성하기</Button>}
          modalOptions={{
            inDuration: 150,
            outDuration: 150,
          }}
        >
          <div><Form
            post={post}
            tags={tags}
            handleTags={handleTags}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          /></div>
        </Modal>
      </div>
  </nav>
)

export default EditorNav