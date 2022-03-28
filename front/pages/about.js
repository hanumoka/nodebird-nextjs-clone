import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';

import { Avatar, Card } from 'antd';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

function Profile() {
  const { me } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>ZeroCho | NodeBird</title>
      </Head>
      {me ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {me.Posts.length}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {me.Followings.length}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {me.Followers.length}
            </div>,
          ]}
        >
          <Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title={me.nickname} description="노드버드 매니아" />
        </Card>
      ) : null}
    </AppLayout>
  );
}

export const getStaticProps = wrapper.getStaticProps(async (context) => {
  console.log('getStaticProps');
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Profile;
