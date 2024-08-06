import  { useState, useContext, FormEvent } from 'react';

import { AuthContext } from '../context/auth.context';
import { signInData } from '../interface/user.interface';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const authContext = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate()

  const handleSumbit = async (e: FormEvent) => {
    e.preventDefault();
    const data: signInData = formValues
    try {
      await authContext?.signIn(data)
      alert('login successful!');
      if (authContext?.user?.isAdmin) {
        navigate('/admin')
        return;  
      }
      navigate('/')
    } catch (err) {
      alert(err.message);
      alert('login failed!');
      setFormValues({
        name: "",
        password: "",
      });

    }
  };

  return (
    <div>
      <h2>You know us, logIn here</h2>
      <form onSubmit={handleSumbit}>
        <div>
          <input type="text" value={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} placeholder='name' required />
        </div>
        <div>
          <input type="password" value={formValues.password} onChange={(e) => setFormValues({ ...formValues, password: e.target.value })} placeholder='password' required />
        </div>
        <button type="submit">SignIn</button>
      </form>
    </div>
  );
};

export default SignIn;