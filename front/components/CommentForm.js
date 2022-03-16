import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

function CommentForm({ post }) {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone } = useSelector((state) => state.post);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    console.log(id, post.id, commentText);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [id, post.id, commentText, dispatch]);

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
        {/* <Button type="primary" htmlType="submit" loading={false}> */}
        {/*  로그인 */}
        {/* </Button> */}
      </Form.Item>
    </Form>
  );
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
