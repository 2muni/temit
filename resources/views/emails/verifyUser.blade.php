<!DOCTYPE html>
<html>
<head>
    <title>Welcome Email</title>
</head>

<body>
  <h2>Welcome to the site {{$user['name']}}</h2>
  <br/>
  temit 서비스의 이용을 위한 사용자의 메일 주소 {{$user['email']}} 로 발송된 인증 메일입니다.
  아래 링크를 클릭하여 서비스를 시작하세요.
  <br/>
  <a href="{{url('user/verify', $user->verifyUser->token)}}">서비스 시작</a>
</body>

</html>