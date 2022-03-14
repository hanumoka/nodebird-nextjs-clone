import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';
import PropTypes from 'prop-types';

const UserProfile = ({ setIsLoggedIn }) => {

  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <Card actions={[
      <div key={'twit'}>짹짹</div>,
      <div key={'followings'}>팔로잉</div>,
      <div key={'followers'}>팔로우</div>,
    ]}>
      <Card.Meta avatar={<Avatar>hanu</Avatar>} title='hanumoka' />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

UserProfile.propTypes = {
  setIsLoggedIn : PropTypes.func
}

export default UserProfile;