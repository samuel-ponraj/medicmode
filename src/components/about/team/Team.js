import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase'; // Adjust the import based on your Firebase configuration
import './Team.css';

const Team = () => {
    // eslint-disable-next-line
    const [faculties, setFaculties] = useState([]);
    const [groupedFaculties, setGroupedFaculties] = useState({
        group1: [],
        group2: [],
        group3: [] // Added group3 for remaining members
    });

    useEffect(() => {
        // Function to fetch faculties from Firestore
        const fetchFaculties = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'faculties'));
                const facultyData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setFaculties(facultyData);
                groupFaculties(facultyData); // Group faculties after fetching
            } catch (error) {
                console.error('Error fetching faculty data:', error);
            }
        };

        const groupFaculties = (facultyData) => {
            const grouped = {
                group1: [],
                group2: [],
                group3: []
            };

            const group1Names = ['Jabez', 'Praisy Abigail', 'Sivanesh E']; // Define names for group 1
            const group2Names = ['Mangaipagan S', 'Praveen P', 'Sneha V', 'Sujaritha N', 'Bargavi P']; // Define names for group 2

            facultyData.forEach(member => {
                if (group1Names.includes(member.name)) {
                    grouped.group1.push(member);
                } else if (group2Names.includes(member.name)) {
                    grouped.group2.push(member);
                } else {
                    grouped.group3.push(member); // Remaining members go into group3
                }
            });

            setGroupedFaculties(grouped);
        };

        fetchFaculties(); // Fetch faculties on component mount
    }, []);

    return (
        <div className='team-members'>
            {/* Render Group 1 */}
            {groupedFaculties.group1.length > 0 && (
                <div className="group group1">
                    {groupedFaculties.group1.map((member) => (
                        <div key={member.id} className="members">
                            <img className="member-photo" src={member.image} alt={`${member.name}`} />
                            <h3>{member.name}</h3>
                            <p>{member.designation}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Render Group 2 with Marquee */}
            {groupedFaculties.group2.length > 0 && (
                <div className="group group2">
                        {groupedFaculties.group2.map((member) => (
                            <div key={member.id} className="members">
                                <img className="member-photo" src={member.image} alt={`${member.name}`} />
                                <h3>{member.name}</h3>
                                <p>{member.designation}</p>
                            </div>
                        ))}
                </div>
            )}

            {/* Render Group 3 */}
            {groupedFaculties.group3.length > 0 && (
                <div className="group group3">
                        {groupedFaculties.group3.map((member) => (
                            <div key={member.id} className="members">
                                <img className="member-photo" src={member.image} alt={`${member.name}`} />
                                <h3>{member.name}</h3>
                                <p>{member.designation}</p>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Team;
