import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

function UserProfile() {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction(me));
  }, [dispatch, me]);

  if (me) {
    return (
      <Card
        actions={[
          <div key="twit">{me.Posts.length}</div>,
          <div key="followings">{me.Followings.length}</div>,
          <div key="followers">{me.Followers.length}</div>,
        ]}
      >
        <Card.Meta avatar={<Avatar>{me.nickname && me.nickname[0]}</Avatar>} title={me.nickname} />
        <Button onClick={onLogOut} loading={logOutLoading}>
          로그아웃
        </Button>
      </Card>
    );
  }
  return null;
}

export default UserProfile;
