import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './store/slices/authSlice'

const App = () => {
  console.log('in app')
  const { userInfo } = useSelector((state) => state.auth)
  const  dispatch  = useDispatch()

  useEffect(() => {
    dispatch(logout())
  }, [])

  return (
    <>
      <Header />
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  )
}
export default App
