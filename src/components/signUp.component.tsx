import "../styles/sign.style.css"
import { useState, useContext, FormEvent } from 'react';
import { AuthContext } from '../context/auth.context';
import { signUpData } from '../interface/user.interface';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const authContext = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    name: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate()

  const handleSumbit = async (e:FormEvent) => {

    e.preventDefault();
    const data: signUpData =  formValues;
    
    try {
      await authContext?.SignUp(data)
      alert('Registration successful!');
      navigate('/')

    } catch (error) {
      alert('Registration failed!');
      setFormValues({
        name: "",
        password: "",
        email: ""
      });
    }

  }

  return (
    <div>
      <h2>Want a picture? Register here</h2>
      <form onSubmit={handleSumbit}>
        <div>
          <input type="text" value={formValues.name} onChange={(e) => setFormValues({...formValues,name:e.target.value})} placeholder='name' required />
        </div>
        <div>
          <input type="password" value={formValues.password} onChange={(e) => setFormValues({...formValues,password:e.target.value})} placeholder='password' required />
        </div>
        <div>
          <input type="email" value={formValues.email} onChange={(e) => setFormValues({...formValues,email:e.target.value})} placeholder='email' required />
        </div>
        <button type="submit">SignUP</button>
      </form>
    </div>
  );
};

export default SignUp;
