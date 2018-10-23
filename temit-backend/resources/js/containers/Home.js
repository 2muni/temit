import React, { Component } from 'react';
import { PostList } from '../components';
import { Link } from 'react-router-dom'

class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      posts: [
        {
          "id": "1dde8440-cfc1-11e8-9da4-cd6e374a83f0",
          "title": "프라미스(Promise)",
          "body": "🌱 Background Story  JavaScript는 단일 스레드 기반으로, 두 스크립트를 동시에 실행할 수 없으며 차례로 실행해야 한다.   JS에서 실행될 준비가 된 코드 조각은 Job Queue(작업 대기열)에 보관된다. 코드 실행이 끝나면, 이 대기열을 관리하는 Event Loop에서 다음에 대기중인 작업을 실행한다.  Javascript에서 ...",
          "thumbnail": "https://images.velog.io/post-images/godori/3c7af910-cfc1-11e8-9da4-cd6e374a83f0/nice-view.jpg",
          "is_markdown": true,
          "created_at": "2018-10-14T14:54:57.157Z",
          "updated_at": "2018-10-17T10:51:37.113Z",
          "tags": [
            "promise",
            "javascript",
            "ES6"
          ],
          "categories": [],
          "url_slug": "프라미스Promise-erjn8zr7nk",
          "likes": 2,
          "comments_count": 0,
          "is_temp": false,
          "user": {
            "id": "78352ef0-c61e-11e8-8458-4f37b7730026",
            "username": "godori",
            "display_name": "GODORI",
            "short_bio": "게임 좋아하는 웹 개발자",
            "thumbnail": "https://images.velog.io/thumbnails/godori/b4b4fc00-d1f6-11e8-8b35-ef1994a882c9-.PNG"
          },
          "meta": {
            "code_theme": "dracula",
            "short_description": "🌱 Background Story  JavaScript는 단일 스레드 기반으로, 두 스크립트를 동시에 실행할 수 없으며 차례로 실행해야 한다.   JS에서 실행될 준비가 된 코드 조각은 Job Queue(작업 대기열)에 보관된다. 코드 실행이 끝나면, 이 대기열을 관"
          }
        },
        {
          "id": "23007040-cfbd-11e8-b93f-579a7dec4e42",
          "title": "Python Decorator💅 - 1",
          "body": "Python Decorator💅 - 1 ---  learnpythonmacthumb800.webp  최근에 예전에 짠 회사 코드를 정리하면서 중복되는 코드를 데코레이터로 정리해 보았습니다. 나쁘지 않은 방법인듯 하여 데코레이터를 주제로 글을 쓰게 되었습니당 괜히 쓰면 있어보이는(저는 그랬습니다🤪) 데코레이터를 알아보아요  만약 제 글이 안 읽히거나 부족...",
          "thumbnail": "https://images.velog.io/post-images/doondoony/d72cb4c0-cfbd-11e8-b93f-579a7dec4e42/1200px-Python.svg.png",
          "is_markdown": true,
          "created_at": "2018-10-14T14:26:27.781Z",
          "updated_at": "2018-10-17T10:51:48.198Z",
          "tags": [
            "decorator",
            "python"
          ],
          "categories": [],
          "url_slug": "Python-Decorator-101",
          "likes": 2,
          "comments_count": 0,
          "is_temp": false,
          "user": {
            "id": "9cbecad0-c621-11e8-8458-4f37b7730026",
            "username": "doondoony",
            "display_name": "DoonDoon",
            "short_bio": "둔둔",
            "thumbnail": "https://images.velog.io/profiles/doondoony/thumbnails/1538470831.048.png"
          },
          "meta": {
            "code_theme": "dracula",
            "short_description": "Python Decorator💅 - 1 ---  learnpythonmacthumb800.webp  최근에 예전에 짠 회사 코드를 정리하면서 중복되는 코드를 데코레이터로 정리해 보았습니다. 나쁘지 않은 방법인듯 하여 데코레이터를 주제로 글을 쓰게 되었습니당 괜히 쓰면"
          }
        },
      ]
    }
  }

  render() {
    return (
      <div className="content-wrapper">
        <div className="posts-column">
          <PostList/>
        </div>
        <div className="main-column right">
          <div className="user-profile">
            <div className="user-img-0">
              <img className="circle user-img-0" alt="user-profile" src="https://www.worldcrunch.com/assets/img/avatars/thumbnails/default-user-img-profile.jpg"/>
            </div>
            <div className="user-name">relesinc</div>
          </div>
          <Link to="/login">login</Link>
        </div>
      </div>
    );
  }
}

export default Home;