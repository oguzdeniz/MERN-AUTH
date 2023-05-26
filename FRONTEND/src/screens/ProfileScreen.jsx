import { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import styles from './RegisterScreen.module.css'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateMutation } from '../store/slices/usersApiSlice'
import { setCredentials } from '../store/slices/authSlice'

function ProfileScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const [update, { isLoading }] = useUpdateMutation()

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
  }, [userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log('submit')
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      try {
        const newData = {
          _id: userInfo._id,
          name,
          password,
        }

        console.log("newData:", newData)

        const res = await update({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap()
        dispatch(setCredentials({ ...res }))
        navigate('/')
        toast.success('User updated successfully')
      } catch (error) {
        toast.error(error?.data?.message)
      }
      console.log('else, submit')
    }
  }
// $2a$12$SRm890BBFS33GphnAoa2PecEayhg41t / IVib8CtfsUSAFaJ7YZLki
  return (
    <FormContainer>
      <h1>Update Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          {/* <Form.Label>Enter Name</Form.Label> */}
          <Form.Control
            className={styles.myInput}
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          {/* <Form.Label>Email Address</Form.Label> */}
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          {/* <Form.Label>Enter Password</Form.Label> */}
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          {/* <Form.Label>Confirm Password</Form.Label> */}
          <Form.Control
            type="password"
            placeholder="Enter Password Again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {isLoading && <Loader />}
        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>
    </FormContainer>
  )
}
export default ProfileScreen
