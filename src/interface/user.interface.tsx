import { ReactNode } from "react"

export interface User {
    id: number
    name: string
    email: string
    password: string
    isAdmin: boolean
}

export interface signUpData {
    name: string
    email: string
    password: string
}

export interface signInData {
    name: string
    password: string
}

export interface AuthProviderProps{
    children: ReactNode; 
}
