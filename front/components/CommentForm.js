import { Button, Form, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, setCommentText] = useState('');

  const onSubmitComment = useCallback(() => {
    console.log(id, post.id, commentText);
  }, [commentText]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
        <Button type="primary" htmlType="submit">
          삐약
        </Button>
        {/*<Button type="primary" htmlType="submit" loading={false}>*/}
        {/*  로그인*/}
        {/*</Button>*/}
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
