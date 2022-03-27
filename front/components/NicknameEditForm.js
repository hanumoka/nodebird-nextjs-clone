import { Form, Input } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

function NicknameEditForm() {
  const { me, changeNicknameDone } = useSelector((state) => state.user);
  const [nickname, onChangeNickname, setNickname] = useInput(me?.nickname || '');
  const dispatch = useDispatch();
  // const [form] = Form.useForm();

  // useEffect(() => {
  //   if (changeNicknameDone) {
  //     setNickname('');
  //     form.resetFields();
  //   }
  // }, [changeNicknameDone, form, setNickname]);

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [dispatch, nickname]);

  return (
    <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </Form>
  );
}

export default NicknameEditForm;
