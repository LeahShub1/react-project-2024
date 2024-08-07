import './App.css'
import { Outlet } from 'react-router-dom'
import Nav from './components/user/nav.component'

function App() {

  return (
    <>         
       <Nav />
      <Outlet />
    </>
  )
}
export default App
