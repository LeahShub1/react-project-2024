import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import "../../styles/list.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Meeting } from '../../interface/bussiness.interface';

export const MeetingList = () => {
    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString !== null ? JSON.parse(tokenString) : null;

    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [editingMeeting, setEditingMeeting] = useState<Partial<Meeting>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await axios.get('http://localhost:3000/meetings', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                setMeetings(response.data);
            } catch (error) {
                console.error('Error fetching meetings:', error);
                setError('Error fetching meetings.');
            } finally {
                setLoading(false);
            }
        };

        fetchMeetings();
    }, [token]);

    const cancelMeeting = async (meetingId: number) => {
        try {
            await axios.delete(`http://localhost:3000/meetings/deleteMeeting/${meetingId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setMeetings(meetings.filter(meeting => meeting.id !== meetingId));
        } catch (error) {
            console.error('Error canceling meeting:', error);
        }
    };

    const handleEdit = (id: number, key: keyof Meeting, value: string) => {
        setEditingMeeting((prev) => ({
            ...prev,
            [key]: value,
            id
        }));
    };

    const handleBlur = async (meeting: Meeting, key: keyof Meeting) => {
        if (editingMeeting.id === meeting.id) {
            const updatedMeeting = { ...meeting, [key]: editingMeeting[key] };

            try {
                await axios.put(`http://localhost:3000/meetings/updateMeeting/${meeting.id}`, updatedMeeting, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                setMeetings((prevMeetings) =>
                    prevMeetings.map((m) =>
                        m.id === meeting.id ? updatedMeeting : m
                    )
                );
            } catch (error) {
                console.error('Error updating meeting:', error);
            } finally {
                setEditingMeeting({});
            }
        }
    };

    const filteredMeetings = meetings.filter(meeting =>
        meeting.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="section-container">
            <input
                type="text"
                placeholder="search by name user"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            <h2 className="section-header">רשימת פגישות</h2>

            {filteredMeetings.length === 0 ? (
                <p>לא נמצאו פגישות</p>
            ) : (
                <ul className="list">
                    {filteredMeetings.map((meeting) => (
                        <li key={meeting.id} className="list-item">
                            <div className="item-details">
                                <p><strong>type service</strong> {meeting.serviceType}</p>
                                <p><strong>date</strong>
                                    {editingMeeting.id === meeting.id && editingMeeting.date !== undefined ? (
                                        <input
                                            type="date"
                                            value={editingMeeting.date}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleEdit(meeting.id, 'date', e.target.value)}
                                            onBlur={() => handleBlur(meeting, 'date')}
                                            autoFocus
                                        />
                                    ) : (
                                        <span onClick={() => handleEdit(meeting.id, 'date', new Date(meeting.date).toISOString().substring(0, 10))}>
                                            {new Date(meeting.date).toLocaleDateString()}
                                        </span>
                                    )}
                                </p>
                                <p><strong>time</strong>
                                    {editingMeeting.id === meeting.id && editingMeeting.time !== undefined ? (
                                        <input
                                            type="time"
                                            value={editingMeeting.time}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleEdit(meeting.id, 'time', e.target.value)}
                                            onBlur={() => handleBlur(meeting, 'time')}
                                            autoFocus
                                        />
                                    ) : (
                                        <span onClick={() => handleEdit(meeting.id, 'time', meeting.time)}>
                                            {meeting.time}
                                        </span>
                                    )}
                                </p>
                                <p><strong>name user</strong> {meeting.customerName}</p>
                                <p><strong>email</strong> {meeting.email}</p>
                                <p><strong>note</strong> {meeting.note}</p>
                            </div>
                            <button onClick={() => cancelMeeting(meeting.id)} className="delete-button">
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
