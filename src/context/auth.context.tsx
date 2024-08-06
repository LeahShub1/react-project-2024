import { createContext, useState } from "react"
import { AuthProviderProps, signInData, signUpData, User } from "../interface/user.interface"

import { SignIn, SignUp } from "../api/auth.api";

export type authContext = {
  user: User | null,
  signIn: Function,
  SignUp: Function,
}

export const AuthContext = createContext<authContext | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);

  const data: authContext = {
    user,
    async signIn(data: signInData) {

      try {
        const user = await SignIn(data)
        if (user) {
          setUser(user);
        }

      } catch (error) {
        console.error(error);
        throw new Error(error.message);

      }
    },
    async SignUp(data: signUpData) {
      try {
        const user = await SignUp(data);
        if (user) {
          setUser(user);
        }
      }
      catch (error) {
        console.error(error);
        throw error
      }
    },
  }

  return <AuthContext.Provider value={data}>
    {children}
  </AuthContext.Provider>

}
