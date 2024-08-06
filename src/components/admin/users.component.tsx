
import { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/list.css";
import { User } from '../../interface/user.interface';

export const Users = () => {
    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString !== null ? JSON.parse(tokenString) : null;

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/customers', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [token]);

    const nonAdminUsers = users.filter(user => !user.isAdmin);

    return (
        <>
            <div className="page-container">
                <div className="section-container">
                    <h2 className="section-header">רשימת לקוחות</h2>
                    {nonAdminUsers.length === 0 ? (
                        <p>לא נמצאו לקוחות</p>
                    ) : (
                        <ul className="list">
                            {nonAdminUsers.map((user) => (
                                <li key={user.id} className="list-item">
                                    <div className="item-details">
                                        <p><strong>שם:</strong> {user.name}</p>
                                        <p><strong>אימייל:</strong> {user.email}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};