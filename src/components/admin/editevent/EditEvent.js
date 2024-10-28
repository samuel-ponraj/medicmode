import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { InputText } from 'primereact/inputtext';
import { db } from '../../../firebase'; // import the Firestore database
import { doc, updateDoc } from 'firebase/firestore';

const EditEvent = () => {

  const { state } = useLocation();

  const eventId = state?.id;


  const [title, setTitle] = useState(state.title || '');
  const [location, setLocation] = useState(state.location || '');
  const [date, setDate] = useState(state.date || '');
  const [description, setDescription] = useState(state.description || '');

  const navigate = useNavigate()


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDoc(doc(db, 'events', eventId), {
        date,
        title,
        location,
        description,
      });
      toast.success('Event updated successfully');

      navigate('/dashboard')
    } catch (error) {
      toast.error('Error updating course');
      console.error('Error updating course:', error);
    }
  };

  return (
    <div className="create-events-container">
      <Toaster position="top-center" richColors />
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="p-field">
          <label htmlFor="title">Event Title</label>
          <InputText
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="p-field">
          <label htmlFor="location">Event Location</label>
          <InputText
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="p-field">
          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="p-field">
          <label htmlFor="description">Description</label>
          <textarea
            rows="3"
            style={{ resize: 'vertical', width: 'auto' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button className='create-events-btn' type="submit">Update Event</button>
      </form>
    </div>
  )
}

export default EditEvent