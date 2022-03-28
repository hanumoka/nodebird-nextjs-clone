import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

function Profile() {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me]);

  if (!me) {
    return null;
  }
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowList header="팔로워" data={me.Followers} />
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

export default Profile;
