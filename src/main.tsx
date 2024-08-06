import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from './components/user/home.componet.tsx';
import { Services } from './components/user/services.components.tsx';
import { Meeting } from './components/user/meeting.component.tsx';
import { HomeAdmin } from './components/admin/homeAdmin.component.tsx';
import { BusinessDetail } from './components/admin/businessDetail.component.tsx';
import { BusinessServices } from './components/admin/businessServices.component.tsx';
import { MeetingList } from './components/admin/meetingList.component.tsx';
import { Users } from './components/admin/users.component.tsx';
import SignUp from './components/signUp.component.tsx';
import { AuthProvider } from './context/auth.context.tsx';
import SignIn from './components/signIn.component.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Home
      }, {
        path: "/signin",
        Component:SignIn
      }, {
        path: "/signup",
        Component: SignUp
      },
      {
        path: "/services",
        Component: Services
      }, {
        path: '/meeting',
        Component: Meeting
      }
    ]
  }, {
    path: "/admin",
    Component: HomeAdmin,

    children: [
      {
        path: "/admin/businessDetail",
        Component:BusinessDetail
      },
      {
        path:"/admin/businessServices",
        Component: BusinessServices
      },
      {
        path:"/admin/meetings",
        Component:MeetingList
      },{
        path:"/admin/users",
        Component:Users
      }
      
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
