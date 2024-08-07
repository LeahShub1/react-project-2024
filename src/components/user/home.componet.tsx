import { useEffect, useState } from "react";
import Nav from "./nav.component"
import { Detail } from "../../interface/bussiness.interface";
import axios from "axios";
import { Gallery } from './galery.component';

export const Home = () => {

    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString !== null ? JSON.parse(tokenString) : null;

    const [detail, setDetail] = useState<Detail>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [name] = useState("phtography");

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <h1>{detail?.name}</h1>
            <h4>{detail?.description}</h4>
            <Gallery  />
            <footer className="footer-nav">
            <div className="footer-content">
                <p><strong>Address:</strong> {detail?.address}</p>
                <p><strong>Phone:</strong> {detail?.phone}</p>
                <p><strong>Email:</strong> {detail?.email}</p>
            </div>
        </footer>
        </>
    )
}