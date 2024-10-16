import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase'; // Adjust the path as necessary
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './ReviewPost.css';

const ReviewPost = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvalStatus, setApprovalStatus] = useState({}); // State for approval status
  const [approvedPosts, setApprovedPosts] = useState([]); // State for approved blog posts

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blogPosts'));
        const posts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBlogPosts(posts);

        // Initialize approval status for each post
        const initialApprovalStatus = {};
        posts.forEach((post) => {
          initialApprovalStatus[post.id] = false; // Set default approval status to false
        });
        setApprovalStatus(initialApprovalStatus);
      } catch (error) {
        console.error('Error fetching blog posts: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleApprovalChange = async (postId) => {
    const isApproved = approvalStatus[postId]; // Get current approval status
    const newApprovalStatus = !isApproved; // Toggle approval status

    setApprovalStatus((prevState) => ({
      ...prevState,
      [postId]: newApprovalStatus, // Update local state
    }));

    // Find the approved post
    const approvedPost = blogPosts.find((post) => post.id === postId);
    if (approvedPost) {
      if (!approvedPosts.includes(approvedPost)) {
        setApprovedPosts((prevApproved) => [...prevApproved, approvedPost]);
      }

      try {
        // Update Firestore document to include the approved field
        await updateDoc(doc(db, 'blogPosts', postId), {
          approved: newApprovalStatus ? 'yes' : 'no', // Set the approved field based on new status
        });
      } catch (error) {
        console.error('Error updating blog post approval status: ', error);
      }
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return 'N/A'; // Handle missing or undefined dates
    }

    if (typeof date === 'object' && date.seconds) {
      const timestamp = new Date(date.seconds * 1000);
      return formatDateString(timestamp);
    }

    const parsedDate = new Date(date);
    return formatDateString(parsedDate);
  };

  const formatDateString = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, 'blogPosts', postId)); // Delete post from Firestore
      setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId)); // Remove post from state
    } catch (error) {
      console.error('Error deleting blog post: ', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="review-post-container">
        <h1>Review Post</h1>
        {blogPosts.length > 0 ? (
          <div className="scroll">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date Created</th>
                <th>Blog Title</th>
                <th>Author Name</th>
                <th>Co Authors</th>
                <th>Category</th>
                <th>Content</th>
                <th>Thumbnail</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map((post, index) => (
                <tr key={post.id}>
                  <td>{index + 1}</td>
                  <td>{formatDate(post.dateCreated)}</td>
                  <td>{post.title}</td>
                  <td>{post.author}</td>
                  <td>{post.coAuthor}</td>
                  <td>{post.category}</td>
                  <td>
                    <Link to={`/blog/${post.id}`} target="_blank" rel="noopener noreferrer">
                      View Post
                    </Link>
                  </td>
                  <td>
                    {post.thumbnail ? (
                      <Link to={post.thumbnail} target="_blank" rel="noopener noreferrer">
                        View Thumbnail
                      </Link>
                    ) : (
                      <>No Image</>
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() => handleApprovalChange(post.id)}
                      className={`approve-btn ${approvalStatus[post.id] ? 'approved' : 'pending'}`}
                    >
                      {approvalStatus[post.id] ? 'Approved' : 'Approve'}
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(post.id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        ) : (
          <div>No blog posts available.</div>
        )}
      </div>
    </>
  );
};

export default ReviewPost;
