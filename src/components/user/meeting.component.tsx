import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addMeeting } from '../../api/meeting.api';
import { AuthContext } from '../../context/auth.context';

export const Meeting = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const name = location.state?.name;
    const [formData, setFormData] = useState({
        serviceType: name,
        date: new Date(),
        time: '',
        note: '',
        customerName: authContext?.user?.name,
        email: authContext?.user?.email
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addMeeting(formData);
            alert("meeting added successfully!");
            navigate('/');

        } catch (error) {
            alert(error.message);

            console.error(error);
            alert("Failed to add meeting");

        } finally {
            setFormData({
                serviceType: name,
                date: new Date(),
                time: "",
                note: "",
                customerName: authContext?.user?.name,
                email: authContext?.user?.email
            });
        }

    }
    const handleChange = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    return (
        <>
            <div>
                <h2>Thanks for joining us for {name} Photos</h2>
                <p></p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            placeholder='date'
                        />
                    </div>
                    <div>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                            placeholder='time'
                        />
                    </div>
                    <div>
                        <textarea
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            rows={4}
                            placeholder='Anything else to tell us?
                            '
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            required
                            placeholder='name'
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder='email'
                        />
                    </div>

                    <button type="submit">שלח</button>
                </form>
            </div>
        </>
    )

}