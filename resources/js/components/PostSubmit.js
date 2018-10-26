import React from 'react';
import { Button, Input, Row } from 'react-materialize';

const PostSubmit = ({
  post,
  handleChange,
  handleSubmit,
  handleSubmitCard,
}) => (
  <div className="submit-wrapper" style={{ display: 'none' }} onClick={handleSubmitCard}>
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
          <input name="tags" placeholder="태그를 입력하세요"
            onChange={handleChange}
            value={post.tags} 
          />
          <div className="btn util">등록</div>
        </div>
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
        <Button className="btn save">임시저장</Button>
        <Button type="submit" className="submit">작성하기</Button>
      </div>
    </div>
  </form>
</div>
)

export default PostSubmit;