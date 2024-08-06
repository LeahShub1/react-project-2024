import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import "../../styles/list.css"
import { Detail } from '../../interface/bussiness.interface';

export const BusinessDetail = () => {

    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString !== null ? JSON.parse(tokenString) : null;

    const [detail, setDetail] = useState<Detail>();
    const [editingDetail, setEditingDetail] = useState<Partial<Detail>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState("phtography");

    useEffect(() => {

        const fetchsetDetail = async () => {
            if (!token) {
                setError("No token found. Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/businesses/${name}`, {

                    headers: {
                        authorization: `Bearer ${token}`
                    }
                },);
                setDetail(response.data);
            } catch (error) {
                console.error('Error fetching detail:', error);
                setError('Error fetching detail.');
            } finally {
                setLoading(false);
            }

        };

        fetchsetDetail();
    }, [token]);

    const handleEdit = (key: keyof Detail) => {
        setEditingDetail((prev) => ({
            ...prev,
            [key]: detail?.[key]
        }));
    };

    const handleChange = (key: keyof Detail, value: string) => {
        setEditingDetail((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const handleBlur = async (key: keyof Detail) => {
        if (detail) {
            const updatedDetail = { ...detail, [key]: editingDetail[key] };

            try {
                await axios.put(`http://localhost:3000/businesses/updateBusiness/${detail.name}`, updatedDetail, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                setDetail(updatedDetail);
                if (key === 'name' && typeof editingDetail.name === 'string') {
                    setName(editingDetail.name);
                }
            } catch (error) {
                console.error('Error updating detail:', error);
                setError('Error updating detail.');
            } finally {
                setEditingDetail((prev) => ({
                    ...prev,
                    [key]: undefined
                }));
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="page-container">
            <div className="section-container">
                <h2 className="section-header">Our Details</h2>
                <div className="item-details">
                    <p>
                        <p>
                            <strong>name:</strong>
                            {detail?.name}
                        </p>
                    </p>
                    <p>
                        <strong>address:</strong>
                        {editingDetail.address !== undefined ? (
                            <input
                                type="text"
                                value={editingDetail.address}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('address', e.target.value)}
                                onBlur={() => handleBlur('address')}
                                autoFocus
                            />
                        ) : (
                            <span onClick={() => handleEdit('address')}>{detail?.address}</span>
                        )}
                    </p>
                    <p>
                        <strong>phone:</strong>
                        {editingDetail.phone !== undefined ? (
                            <input
                                type="text"
                                value={editingDetail.phone}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('phone', e.target.value)}
                                onBlur={() => handleBlur('phone')}
                                autoFocus
                            />
                        ) : (
                            <span onClick={() => handleEdit('phone')}>{detail?.phone}</span>
                        )}
                    </p>
                    <p>
                        <strong>email:</strong>
                        {editingDetail.email !== undefined ? (
                            <input
                                type="text"
                                value={editingDetail.email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
                                onBlur={() => handleBlur('email')}
                                autoFocus
                            />
                        ) : (
                            <span onClick={() => handleEdit('email')}>{detail?.email}</span>
                        )}
                    </p>
                    <p>
                        <strong>description:</strong>
                        {editingDetail.description !== undefined ? (
                            <input
                                type="text"
                                value={editingDetail.description}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('description', e.target.value)}
                                onBlur={() => handleBlur('description')}
                                autoFocus
                            />
                        ) : (
                            <span onClick={() => handleEdit('description')}>{detail?.description}</span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
