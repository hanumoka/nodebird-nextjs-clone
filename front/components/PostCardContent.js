import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

function PostCardContent({ postData }) {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }} as={`/hashtag/${v.slice(1)}`} key={v}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
}

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
