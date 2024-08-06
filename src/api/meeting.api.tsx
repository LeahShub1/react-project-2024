import axios from "axios";
import { Meeting } from "../interface/bussiness.interface";

export const addMeeting = async (data:Meeting) => {
    const tokenString = localStorage.getItem('jwtToken');
    const token = tokenString !== null ? JSON.parse(tokenString) : null;
    try {
        await axios.post(
            'http://localhost:3000/meetings/addMeeting',
            data,
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        );
    }
    catch (err) {
        throw new Error(err.response.data.error);
    }

}