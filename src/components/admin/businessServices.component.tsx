import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import "../../styles/list.css"
import { Service } from '../../interface/bussiness.interface';

export const BusinessServices = () => {

    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString !== null ? JSON.parse(tokenString) : null;
    const [editingService, setEditingService] = useState<{ [key: string]: Partial<Service> }>({});
    const [newService, setNewService] = useState<Partial<Service>>({});
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            if (!token) {
                setError("No token found. Please log in.");
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get('http://localhost:3000/services', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
                setError('Error fetching services.');
            } finally {
                setLoading(false);
            }
        }
        fetchServices();
    }, [token]);
    const handleEdit = (serviceName: string, key: keyof Service) => {
        setEditingService((prev) => ({
            ...prev,
            [serviceName]: { ...prev[serviceName], [key]: services.find(s => s.name === serviceName)?.[key] }
        }));
    };

    const handleChange = (serviceName: string, key: keyof Service, value: string | number) => {
        setEditingService((prev) => ({
            ...prev,
            [serviceName]: { ...prev[serviceName], [key]: value }
        }));
    };

    const handleBlur = async (serviceName: string, key: keyof Service) => {
        const updatedService = services.find(s => s.name === serviceName)
        if (updatedService) {
            updatedService[key] = editingService[serviceName][key] as any;

            try {
                await axios.put(`http://localhost:3000/services/updateService/${updatedService.name}`, updatedService, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                setServices((prev) =>
                    prev.map((s) => (s.name === serviceName ? { ...s, [key]: updatedService[key] } : s))
                );
            } catch (error) {
                console.error('Error updating service:', error);
                setError('Error updating service.');
            } finally {
                setEditingService((prev) => ({
                    ...prev,
                    [serviceName]: { ...prev[serviceName], [key]: undefined }
                }));
            }
        }
    };

    const handleAddService = async (e: FormEvent) => {
        e.preventDefault();
        if (!newService.name || !newService.price || !newService.duration || !newService.description) {
            setError('All fields are required for the new service.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/services/addService', newService, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setServices((prev) => [...prev, response.data]);
            setNewService({});
            setShowForm(false);
        } catch (error) {
            console.error('Error adding new service:', error);
            setError('Error adding new service.');
        }

    }
    const handleNewServiceChange = (key: keyof Service, value: string | number) => {
        setNewService((prev) => ({
            ...prev,
            [key]: value
        }));
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
                <h2 className="section-header">List of services</h2>
                <ul className="list">
                    {services.map((service) => (
                        <li key={service.name} className="list-item">
                            <div className="item-details">
                                <p><strong>name:</strong> {service.name}
                                </p>
                                <p>
                                    <strong>price:</strong>
                                    {editingService[service.name]?.price !== undefined ? (
                                        <input
                                            type="number"
                                            value={editingService[service.name].price}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(service.name, 'price', parseFloat(e.target.value))}
                                            onBlur={() => handleBlur(service.name, 'price')}
                                            autoFocus
                                        />
                                    ) : (
                                        <span onClick={() => handleEdit(service.name, 'price')}>{service.price}</span>
                                    )}
                                </p>
                                <p>
                                    <strong>duration:</strong>
                                    {editingService[service.name]?.duration !== undefined ? (
                                        <input
                                            type="text"
                                            value={editingService[service.name].duration}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(service.name, 'duration', e.target.value)}
                                            onBlur={() => handleBlur(service.name, 'duration')}
                                            autoFocus
                                        />
                                    ) : (
                                        <span onClick={() => handleEdit(service.name, 'duration')}>{service.duration}</span>
                                    )}
                                </p>
                                <p>
                                    <strong>description:</strong>
                                    {editingService[service.name]?.description !== undefined ? (
                                        <input
                                            type="text"
                                            value={editingService[service.name].description}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(service.name, 'description', e.target.value)}
                                            onBlur={() => handleBlur(service.name, 'description')}
                                            autoFocus
                                        />
                                    ) : (
                                        <span onClick={() => handleEdit(service.name, 'description')}>{service.description}</span>
                                    )}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
                <button onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add New Service'}
                </button>
                {showForm && (
                    <form onSubmit={handleAddService}>
                          
                            <input
                            placeholder='name'
                                type="text"
                                value={newService.name || ''}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleNewServiceChange('name', e.target.value) }
                            />
                      
                            <input
                            placeholder='price'
                                type="number"
                                value={newService.price || ''}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleNewServiceChange('price', parseFloat(e.target.value))}
                            />
                            <input
                            placeholder='duration'
                                type="text"
                                value={newService.duration || ''}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleNewServiceChange('duration', e.target.value)}
                            />
                            <input
                            placeholder='description'
                                type="text"
                                value={newService.description || ''}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleNewServiceChange('description', e.target.value)}
                            />
                        <button type="submit">Add Service</button>
                    </form>
                )}

            </div>
        </div>
    );
};
