import { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/list.css"
import { Service } from '../../interface/bussiness.interface';
import { useNavigate } from 'react-router-dom';

export const Services = () => {
    const navigate = useNavigate()
    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString !== null ? JSON.parse(tokenString) : null;

    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:3000/services', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching meetings:', error);
            }
        };

        fetchServices();
    }, [token]);

    const appointmentBooking = (name: string) => {

        navigate('/meeting', { state: { name } })

    }

    return (
        <>

            <div className="page-container">
                <div className="section-container">
                    <h2 className="section-header">what do we have for you</h2>
                    <ul className="list">
                        {services.map((service) => (
                            <li key={service.name} className="list-item">
                                <div className="item-details">
                                    <strong> {service.name}</strong>
                                    <p><strong>price:</strong> {service.price}</p>
                                    <p><strong>duration:</strong> {service.duration}</p>
                                    <p><strong>description:</strong> {service.description}</p>
                                    <button onClick={() => appointmentBooking(service.name)}>sure you want 😊</button>

                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>

        </>
    )
}
