import axios from "axios";
import { User, signInData, signUpData } from "../interface/user.interface";

export const SignUp = async (data: signUpData) => {
    try {
        const response = await axios.post('http://localhost:3000/customers/signup',
            data
        );
        if (response.status === 201) {
            localStorage.setItem("jwtToken", JSON.stringify(response.data.token))

            return response.data.newCustomer as User;

        }
    } catch (error) {
        console.error('Oopssss, an error occurred during registration:', error);
        throw error;
    }

}

export const SignIn = async (data: signInData) => {
    try {

        const response = await axios.post('http://localhost:3000/customers/signin',
            data
        );
        if (response.status === 200) {
            localStorage.setItem("jwtToken", JSON.stringify(response.data.token))
            return response.data.customer as User;
        }
    }

    catch (err) {
        console.error('Oopssss, an error occurred during login:', err);
        throw new Error(err.response.data.error);
    }

}