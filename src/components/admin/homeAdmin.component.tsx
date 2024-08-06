import { Outlet, useNavigate } from "react-router-dom"
import NavAdmin from "./navAdmin.component"
import axios from "axios"
import { useEffect } from "react"

export const HomeAdmin = () => {

    const navigate = useNavigate();
    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString !== null ? JSON.parse(tokenString) : null;

    useEffect(() => {
        const isAdmin = async () => {
            try {
                const response = await axios.get('http://localhost:3000/customers/isAdmin', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                if (response.status !== 200) {
                    alert('not authorized');
                    navigate("/signin");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                alert(error)
                navigate("/signin");
            }
        };

        if (token) {
            isAdmin();
        } else {
            navigate("/signin");
        }
    }, [token, navigate]);

    return (
        <>
            <NavAdmin />
            <Outlet />
        </>
    )
}