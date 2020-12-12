import React from "react";
import Layout from "../components/shared/Layout";
import { useParams } from 'react-router-dom';
import MorePostsFromUser from '../components/post/MorePostsFromUser';
import Post from '../components/post/Post';

function PostPage() {
  const { postId } = useParams;
  return (
    <Layout>
      <Post id={postId}/>
      <MorePostsFromUser />
    </Layout>
  )
}

export default PostPage;
