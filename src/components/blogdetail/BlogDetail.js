import React, { useEffect, useState } from 'react';
import './BlogDetails.css';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase'; // Adjust the path as necessary
import { doc, getDoc } from 'firebase/firestore';
import SendIcon from '@mui/icons-material/Send';

const BlogDetail = () => {
    const { postId } = useParams(); // Extract postId from the URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const docRef = doc(db, 'blogPosts', postId); // Get the specific document by ID
                const docSnap = await getDoc(docRef);
        
                if (docSnap.exists()) {
                    setPost({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching post: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]); // Only use postId as a dependency

    // Use another useEffect to set the document title
    useEffect(() => {
        if (post) {
            document.title = post.title; // Set the document title to the post's title
        }
    }, [post]); // Only depends on post

    if (loading) {
        return <div>Loading...</div>;
    }
      
    if (!post) {
        return <div>No post found.</div>;
    }
      
    return (
        <div className='blog-detail-container'>
            <div className="blog-details">
                <div className="blog-detail-title">
                    <h1>{post.title}</h1>
                </div>
                <div className="blog-detail-description">
                    <h3>By: {post.author}</h3>
                    <h3>Co-authors: {post.coAuthors || 'None'}</h3>
                    <h3>Category: {post.category}</h3>
                    <h3>{new Date(post.dateCreated).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}</h3>
                </div>
                <div className="blog-detail-content" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            {/* <div className='comment-section'>
                <div className="input-wrapper">
                    <textarea type="text" placeholder="Write a comment..." rows='2' />
                    <SendIcon />
                </div>
            </div> */}
        </div>
    );
};

export default BlogDetail;
