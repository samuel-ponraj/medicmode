import React, {  useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
import { db, storage } from '../../../firebase'; // Adjust the path as necessary
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage imports
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

const EditPost = () => {
  const { state } = useLocation();
  const [author, setAuthor] = useState(state.author || '');
  const [coAuthor, setCoAuthor] = useState(state.coAuthor || '');
  const [title, setTitle] = useState(state.title || '');
  const [category, setCategory] = useState(state.category || '');
  const [content, setContent] = useState(state.content || '');
  const [keyword, setKeyword] = useState(state.keyword || []);
  const [reference, setReference] = useState(state.reference || '');
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(state.thumbnail || '');
  const [youtubeUrl, setYoutubeUrl] = useState(state.youtubeUrl || '');

  const navigate = useNavigate()

  const postId = state.id;

  // Handle thumbnail image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const storageRef = ref(storage, `thumbnails/${file.name}`);
      uploadBytes(storageRef, file)
        .then(() => getDownloadURL(storageRef))
        .then((url) => {
          setThumbnail(url);
          setPreview(url);
        })
        .catch((error) => {
          toast.error('Error uploading image');
          console.error('Error uploading image:', error);
        });
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDoc(doc(db, 'blogPosts', postId), {
        author,
        coAuthor,
        title,
        category,
        content,
        keyword,
        reference,
        thumbnail: thumbnail || state.thumbnail, 
        approved: 'no',
        youtubeUrl
      });
      toast.success('Post updated successfully');

      navigate('/dashboard')
    } catch (error) {
      toast.error('Error updating post');
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="create-post-container">
      <Toaster position="top-center" richColors />
      <h1>Edit Blog</h1>
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
            value={keyword.join(', ')}
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
              required
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
                onClick={() => {
                  setPreview('');
                  setThumbnail(null);
                }}
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
        <div className="p-field">
              <label htmlFor="youtubeUrl">Youtube Link</label>
              <InputText
                id="youtubeUrl"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
        </div>

        <Button className="create-post-btn" type="submit" label="Update Post" />
      </form>
    </div>
  );
};

export default EditPost;
