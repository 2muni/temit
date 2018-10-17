import React, { Component } from 'react';
import { PostList } from '../components'

class Home extends Component {

  state = {
    posts: [
      {
        "id": "fc45d080-c62a-11e8-bc23-b911dbba0b89",
        "title": "Create-react-app V2 릴리즈! 무슨 변경 사항이 있을까?",
        "body": "리액트 개발자라면 애용하고 계실 도구인 create-react-app 의 v2 버전이 릴리즈되었습니다! 기존에 만든 자료들을 업데이트해야 한다는 점 (특히 책... 따흑... )은 조금 귀찮긴 하지만, 좋아하는 도구가 더 멋져졌으니까, 정말 듣기좋은 소식인데요!  이 포스트에서는 v2 에서 어떠한 변화가 적용되었는지 한번 살펴보도록 하겠습니다.  > 업데이...",
        "thumbnail": "https://images.velog.io/post-images/velopert/621f9250-c636-11e8-bc23-b911dbba0b89/-2018-10-02-8.27.17.png",
        "created_at": "2018-10-02T10:07:35.816Z",
        "updated_at": "2018-10-17T00:29:38.970Z",
        "tags": [],
        "categories": [],
        "url_slug": "create-react-app-v2",
        "likes": 12,
        "comments_count": 23,
        "is_temp": false,
        "user": {},
        "meta": {}
      }
    ]
  }

  render() {
    return(
      <>
        <div className="main-column left">

        </div>

        <div className="main-column right">

        </div>
      </>
    );
  }
}

export default Home;