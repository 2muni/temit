import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Modal, Input, Row, Tag } from 'react-materialize'

const EditorNav = ({
  post,
  tags,
  handleTags,
  handleChange,
  handleSubmit,
}) => (
  <nav>
    <div className="nav-wrapper">
      <Link to="/" className="brand-logo">temit</Link>
      <ul className="right">
        <li>
        
      <Modal
      className='submit-wrapper'
  trigger={<Button>작성하기</Button>}>
  <form className="submit-card" onSubmit={handleSubmit}>
      <div className="submit-header">새 글 작성하기</div>
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
            <Tag key={i} data-id={i} onClick={handleTags}>{tag}</Tag>
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
          <div className="btn cansel">뒤로가기</div>
          <Button type="submit" className="submit">작성하기</Button>
        </div>
      </div>
    </form>
</Modal>
        </li>
      </ul>
    </div>
  </nav>
)

export default EditorNav