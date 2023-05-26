import { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../store/slices/usersApiSlice'
import { setCredentials } from '../store/slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    console.log("in useEffect, userInfo:", userInfo)
    if (!userInfo) {
      navigate("/login")
    }
  }, [userInfo, navigate])

  // Submit Form
  const submitHandler = async (e) => {
    e.preventDefault()
    console.log('submit')
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      console.log({ res })
      navigate('/')
      toast.success(`User '${res.name}' successfully logged in`)
    } catch (error) {
      console.log('error:', error.data.message)
      toast.error(error.data.message)
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placehoder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placehoder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>

        <Row className="py-3">
          <Col>
            New Customer? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}
export default LoginScreen
