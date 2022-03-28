import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

// function TextInput({ value }) {
//   return <div>{value}</div>;
// }
//
// TextInput.propTypes = {
//   value: PropTypes.string,
// };

function Signup() {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/'); // push 는 뒤로가기가 가능하지만, replace 는 뒤로가기가 블가능 하다.
    }
  }, [me]);

  useEffect(() => {
    if (signUpDone) {
      Router.replace('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const [email, onEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }

    console.log(email, nickname, password);
    dispatch({ type: SIGN_UP_REQUEST, data: { email, password, nickname } });
  }, [password, passwordCheck, term]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>회원가입 | NodeBird</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit} style={{ padding: 10 }}>
          <div>
            <label htmlFor="user-email">이메일</label>
            <br />
            <Input name="user-email" type="email" value={email} required onChange={onEmail} />
          </div>
          <div>
            <label htmlFor="user-nick">닉네임</label>
            <br />
            <Input name="user-nick" value={nickname} required onChange={onChangeNickname} />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
          </div>
          <div>
            <label htmlFor="user-password-check">비밀번호체크</label>
            <br />
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              하누모카의 말을 잘 들을 것을 동의합니다.
            </Checkbox>
            {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit" loading={signUpLoading}>
              가입하기
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
}

// 아래 부분이 home 보다 먼저 실행된다. (서버사이드 렌더링 요청)
// 프론트 서버에서 실행되는 부분
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  // front 서버가 백엔드 서버로 요청을 보낼때 쿠키를 삽입?
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Signup;
