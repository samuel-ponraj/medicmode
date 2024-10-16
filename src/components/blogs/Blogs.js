import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, setDoc, doc, getDoc, deleteDoc } from 'firebase/firestore'; 
import { db } from '../../firebase'; 
import './Blogs.css';
import blogheader from '../../assets/header-images/blog.png';
import CategoryIcon from '@mui/icons-material/Category';
import ArchiveIcon from '@mui/icons-material/Archive';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Blog = ({userEmail, logged}) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('show-all');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogCollection = collection(db, 'blogPosts');
        const querySnapshot = await getDocs(query(blogCollection, orderBy('dateCreated', 'desc')));
        const blogs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched blogs:', blogs);
        setBlogPosts(blogs);

        // Check if user has liked posts
        const newLikedPosts = new Set(); // Create a new Set for liked posts
        const likesPromises = blogs.map(async (blog) => {
          const userDocRef = doc(collection(db, `blogPosts/${blog.id}/likes`), userEmail);
          const userLikeDoc = await getDoc(userDocRef);
          if (userLikeDoc.exists()) {
            newLikedPosts.add(blog.id); // Add blog ID to the set of liked posts
          }
        });
        await Promise.all(likesPromises);
        setLikedPosts(newLikedPosts); // Update the state with the new Set

        // Extract unique categories, years, and months for filters
        const categories = [...new Set(blogs.map(blog => blog.category))];
        setCategories(categories);

        const years = [...new Set(blogs.map(blog => new Date(blog.dateCreated).getFullYear()))];
        setYears(years);

        const months = [...new Set(blogs.map(blog => new Date(blog.dateCreated).getMonth() + 1))];
        setMonths(months);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      }
    };

    fetchBlogs();
    
  }, [userEmail]);


  const filteredBlogs = blogPosts.filter(blog => {
    const matchesCategory = selectedCategory === 'show-all' || blog.category === selectedCategory;
    const matchesYear = !selectedYear || new Date(blog.dateCreated).getFullYear().toString() === selectedYear;
    const matchesMonth = !selectedMonth || (new Date(blog.dateCreated).getMonth() + 1).toString() === selectedMonth;

    return matchesCategory && matchesYear && matchesMonth;
  });

  const recentBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const otherBlogs = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : [];

  const showBlogOptions = () => setIsDrawerOpen(true);
  const closeBlogOptions = () => setIsDrawerOpen(false);

  
  
  const handleLike = async (blogId) => {

	if (!logged) {
        alert("Please log in to like a post."); // Alert if user is not logged in
        return; // Exit the function if not logged in
    }


    const likeRef = collection(db, `blogPosts/${blogId}/likes`);
    const userDocRef = doc(likeRef, userEmail);

    const userLikeDoc = await getDoc(userDocRef);
    
    if (userLikeDoc.exists()) {
      // User has liked, so remove their like
      await deleteDoc(userDocRef);
      likedPosts.delete(blogId); // Remove from liked posts
    } else {
      // User has not liked, so add their like
      await setDoc(userDocRef, { email: userEmail });
      likedPosts.add(blogId); // Add to liked posts
    }

    setLikedPosts(new Set(likedPosts)); // Update state to trigger re-render
  };

  


  return (
    <div className="blogs">
      <div className="blog-header">
        <img className="blog-header-image" src={blogheader} alt="Blog Header" />
        <div className="blog-heading">
          <h1>
            Our Latest <span style={{ color: 'var(--orange)' }}>Blogs</span> &{' '}
            <span style={{ color: 'var(--orange)' }}>News</span>
          </h1>
        </div>
        
        <div className="blog-search-bar" onClick={showBlogOptions}>
          <p>Search</p>
          <SearchIcon />
        </div>
      </div>

      <div className="primary">
        {recentBlog ? (
          <div className="primary-blog">
            <div className="blog-image-container">
              <Link to={`/blog/${recentBlog.id}`} target="_blank" rel="noopener noreferrer">
                <img src={recentBlog.thumbnail} alt={recentBlog.title} />
              </Link>
            </div>
            <div className="descriptions">
              <div className="details">
                <p>{new Date(recentBlog.dateCreated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</p>
                <p>{recentBlog.category.toUpperCase()}</p>
              </div>
              <div className="title">
                <Link to={`/blog/${recentBlog.id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <h2>{recentBlog.title}</h2>
                </Link>
              </div>
            </div>
            <div className="likes">
			{likedPosts.has(recentBlog.id) ? (
					<FavoriteIcon 
						onClick={() => handleLike(recentBlog.id)} 
						style={{ 
							background: 'none', 
							border: 'none',
							cursor: 'pointer',
							padding: '0',
						}} 
						sx={{ color: 'red'}} // Change color for liked state
					/>
				) : (
					<FavoriteBorderIcon 
						onClick={() => handleLike(recentBlog.id)} 
						style={{ 
							background: 'none', 
							border: 'none',
							cursor: 'pointer',
							padding: '0',
						}} 
						sx={{ color: 'var(--dark-green)' }} // Change color for unliked state
					/>
				)}
              <ChatBubbleOutlineIcon style={{ cursor: 'pointer' }} /> 
              <ShareIcon style={{ cursor: 'pointer' }} />
            </div>
          </div>
        ) : (
          <p>No data found for the selected filters.</p>
        )}

        <div className={`blog-options ${isDrawerOpen ? 'open' : ''}`}>
          <div className="drawer-header">
            <CloseIcon onClick={closeBlogOptions} style={{ cursor: 'pointer', position: 'absolute', right: '20px', color: 'var(--dark-green)' }} />
          </div>
          <div className="categories">
            <h1>
              <CategoryIcon style={{ fontSize: '20px', marginRight: '8px' }} /> Categories
            </h1>
            <div className="options">
              <select value={selectedCategory} onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedYear('');
                setSelectedMonth('');
                setIsDrawerOpen(false);
              }}>
                <option value="show-all">Show All</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="archives">
            <h1>
              <ArchiveIcon style={{ fontSize: '20px', marginRight: '8px' }} /> Archives
            </h1>
            <div className="options">
              <select value={selectedMonth} onChange={(e) => { setSelectedMonth(e.target.value); setIsDrawerOpen(false) }}>
                <option value="">Select Month</option>
                {months.map(month => (
                  <option key={month} value={month}>{new Date(0, month - 1).toLocaleString('default', { month: 'long' })}</option>
                ))}
              </select>

              <select style={{ marginLeft: '8px' }} value={selectedYear} onChange={(e) => { setSelectedYear(e.target.value); setIsDrawerOpen(false) }}>
                <option value="">Select Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="secondary">
        {otherBlogs.length > 0 ? (
          otherBlogs.map(blog => (
            <div key={blog.id} className="other-blogs">
              <div className="blog-image-container">
                <Link to={`/blog/${blog.id}`} target="_blank" rel="noopener noreferrer" >
                  <img src={blog.thumbnail} alt={blog.title} />
                </Link>
              </div>
              <div className="descriptions">
                <div className="details">
                  <p>{new Date(blog.dateCreated).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</p>
                  <p>{blog.category.toUpperCase()}</p>
                </div>
                <div className="title">
                  <Link to={`/blog/${blog.id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <h2>{blog.title}</h2>
                  </Link>
                </div>
              </div>
              <div className="likes">
			  {likedPosts.has(blog.id) ? (
					<FavoriteIcon 
						onClick={() => handleLike(blog.id)} 
						style={{ 
							background: 'none', 
							border: 'none',
							cursor: 'pointer',
							padding: '0',
						}} 
						sx={{ color: 'red' }} // Change color for liked state
					/>
				) : (
					<FavoriteBorderIcon 
						onClick={() => handleLike(blog.id)} 
						style={{ 
							background: 'none', 
							border: 'none',
							cursor: 'pointer',
							padding: '0',
						}} 
						sx={{ color: 'var(--dark-green)'}} // Change color for unliked state
					/>
				)} 
                <ChatBubbleOutlineIcon style={{ cursor: 'pointer' }} /> 
                <ShareIcon style={{ cursor: 'pointer' }} />
              </div>
            </div>
          ))
        ) : (
          <p>No other blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
