import React, { useEffect, useState } from 'react'
import './ReviewCourse.css'
import { Link, Route, Routes } from 'react-router-dom'
import EditCourse from '../editcourse/EditCourse'
import { db } from '../../../firebase'; // Adjust the path as necessary
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const ReviewCourse = () => {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [approvalStatus, setApprovalStatus] = useState({});
    const [approvedCourses, setApprovedCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, 'courses'));
            const courses = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setCourses(courses);
    
            // Initialize approval status and approved posts
            const initialApprovalStatus = {};
            const approvedList = []; // Temporary array to hold approved posts
    
            courses.forEach((course) => {
              initialApprovalStatus[course.id] = course.approved === 'yes'; // Check Firestore approval status
              if (initialApprovalStatus[course.id]) {
                approvedList.push(course); // Add to approved list if already approved
              }
            });
    
            setApprovalStatus(initialApprovalStatus);
            setApprovedCourses(approvedList);
          } catch (error) {
            console.error('Error fetching courses: ', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchCourses();
      }, []);

    const handleApprovalChange = async (courseId) => {
        const isApproved = approvalStatus[courseId];
        const newApprovalStatus = !isApproved;
    
        setApprovalStatus((prevState) => ({
          ...prevState,
          [courseId]: newApprovalStatus,
        }));
    
        const approvedCourse = courses.find((course) => course.id === courseId);
        if (approvedCourse) {
          // Update approved posts state
          if (newApprovalStatus && !approvedCourses.includes(approvedCourse)) {
            setApprovedCourses((prevApproved) => [...prevApproved, approvedCourse]);
          } else if (!newApprovalStatus) {
            setApprovedCourses((prevApproved) => prevApproved.filter((course) => course.id !== courseId));
          }
    
          try {
            await updateDoc(doc(db, 'courses', courseId), {
              approved: newApprovalStatus ? 'yes' : 'no',
            });
          } catch (error) {
            console.error('Error updating course approval status: ', error);
          }
        }
      };
    

    const formatDate = (date) => {
        if (!date) {
          return 'N/A';
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

      const handleDelete = async (courseId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    
        if (confirmDelete) {
          try {
            await deleteDoc(doc(db, 'courses', courseId));
            setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
          } catch (error) {
            console.error('Error deleting course: ', error);
          }
        }
      };
    
      if (loading) {
        return <div>Loading...</div>;
      }

      
  return (
    <div className="review-course-container">
      <h1>Review Course</h1>
      {courses.length > 0 ? (
        <div className="scroll">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date Created</th>
                <th>Course Title</th>
                <th>Mode</th>
                <th>Audience</th>
                <th colSpan="2">Price Details</th>
                <th colSpan="2">Description</th>
                <th>Thumbnail</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={course.id}>
                  <td>{index + 1}</td>
                  <td>{formatDate(course.dateCreated)}</td>
                  <td>{course.courseTitle}</td>
                  <td>{course.mode}</td>
                  <td>{course.audience}</td>
                  <td>{course.priceDetail}</td>
                  <td>{course.price === 0 ? '-' : `Rs. ${course.price}`}</td>
                  <td>
                    <Link to={`/courses/${course.id}`} target="_blank" rel="noopener noreferrer">
                      View course
                    </Link>
                  </td>
                  <td>
                  <Link to="/dashboard/review-course/edit-course" 
                        state={{ id: course.id, 
                            courseTitle: course.courseTitle,
                            duration: course.duration,
                            mode: course.mode,
                            audience: course.audience,
                            thumbnail: course.thumbnail,
                            topics: course.topics,
                            price: course.price,
                            priceDetail: course.priceDetail,
                            trainer: course.trainer,
                            courseDescription: course.courseDescription}}>
                    Edit Course
                  </Link>

                  </td>
                  <td>
                    {course.thumbnail ? (
                      <Link to={course.thumbnail} target="_blank" rel="noopener noreferrer">
                        View Thumbnail
                      </Link>
                    ) : (
                      <>No Image</>
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() => handleApprovalChange(course.id)}
                      className={`approve-btn ${approvalStatus[course.id] ? 'approved' : 'pending'}`}
                    >
                      {approvalStatus[course.id] ? 'Approved' : 'Approve'}
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(course.id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No courses available.</div>
      )}
     <Routes>
        <Route path="edit-course" element={<EditCourse />} />  
      </Routes>

    </div>
  )
}

export default ReviewCourse