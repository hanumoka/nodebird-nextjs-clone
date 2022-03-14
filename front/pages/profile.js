import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {

  const followingList = [{nickname: 'hanu1'},{nickname: 'hanu2'},{nickname: 'hanu3'},];
  const followerList = [{nickname: 'hanu1'},{nickname: 'hanu2'},{nickname: 'hanu3'},];

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;