import React, { useState } from 'react';
import './CreatePost.css';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor'; 
import { db, storage } from '../../../firebase'; // Adjust the path as necessary
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage imports
import { useLocation, useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [author, setAuthor] = useState('');
  const [coAuthor, setCoAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [keyword, setKeyword] = useState([]);
  const [reference, setReference] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let thumbnailURL = '';

      // If a thumbnail is uploaded, upload it to Firebase Storage
      if (thumbnail) {
        const storageRef = ref(storage, `thumbnails/${thumbnail.name}`);
        const uploadSnapshot = await uploadBytes(storageRef, thumbnail);
        thumbnailURL = await getDownloadURL(uploadSnapshot.ref); // Get the URL of the uploaded thumbnail
      }

      // Add the post data to Firestore, including the thumbnail URL
      const docRef = await addDoc(collection(db, 'blogPosts'), {
        author,
        coAuthor,
        title,
        category,
        content,
        keyword,
        reference,
        thumbnail: thumbnailURL, // Store the URL, not the File object
        dateCreated: new Date().toISOString(),
      });

      console.log('Document written with ID: ', docRef.id);

      // Reset the form after submission
      setAuthor('');
      setCoAuthor('');
      setTitle('');
      setCategory('');
      setContent('');
      setKeyword([]);
      setReference('');
      setThumbnail(null);
      setPreview(null);

      if (location.pathname === '/blog/create-post') {
        alert("Your blog has been successfully received! It will be reflected in our site in 24hrs.");
        navigate('/blog'); // Navigate to the blog page
      } else if (location.pathname === '/dashboard/create-post') {
        alert("Blog saved successfully!"); // Show success alert
      }

    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Create a preview of the image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setThumbnail(null);
    setPreview(null);
  };

  return (
    <div className="create-post-container">
      <h1>Create Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="p-field">
          <label htmlFor="author">Author Full Name</label>
          <InputText
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="p-field">
          <label htmlFor="coAuthor">Co Authors Name (If applicable) (Separate by comma)</label>
          <InputText
            id="coAuthor"
            value={coAuthor}
            onChange={(e) => setCoAuthor(e.target.value)}
          />
        </div>

        <div className="p-field">
          <label htmlFor="title">Title of the Blog</label>
          <InputText
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="p-field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select a Category</option>
            <option value="Blog">Blog</option>
            <option value="Article">Article</option>
            <option value="Case Study">Case Study</option>
            <option value="Opinion Piece">Opinion Piece</option>
            <option value="Review">Review</option>
          </select>
        </div>

        <div className="p-field">
          <label htmlFor="keyword">Keywords (Optional) (Separate by comma)</label>
          <input
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.split(',').map(kw => kw.trim()))}
          />
        </div>

        <div className="p-field">
          <label htmlFor="reference">References (If applicable)</label>
          <input
            id="reference"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
        </div>

        <div className="p-field">
          <label htmlFor="thumbnail">Upload Thumbnail Image</label>
          {!preview && (
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={handleImageUpload}
            />
          )}

          {preview && (
            <div className="thumbnail-preview" style={{ marginTop: '10px', position: 'relative' }}>
              <img
                src={preview}
                alt="Thumbnail Preview"
                style={{ width: 'auto', height: '150px', objectFit: 'cover' }}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  color: 'gray',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  fontSize: '20px',
                  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                }}
              >
                &times;
              </button>
            </div>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="content">Content</label>
          <Editor
            className="content-editor"
            id="content"
            value={content}
            onTextChange={(e) => setContent(e.htmlValue)} // Get the HTML value
            required
            style={{ minHeight: '300px', backgroundColor: 'white' }}
          />
        </div>

        <Button className="create-post-btn" type="submit" label="Create Post" />
      </form>
    </div>
  );
};

export default CreatePost;
