import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from "react-router-dom";
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/dashboard');
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return;
    }
    
    let result = await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    result = await result.json();
    if (result.auth) {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', JSON.stringify(result.auth));
      navigate('/dashboard');
    } else {
      alert("Please enter correct details");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-3">
      <Card className="p-4 shadow-lg rounded login-card main-card">
        <Card.Body>
          <h2 className="text-center mb-4 admin-text">Patient Login</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email ID</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" className="rounded" />
              {error && !email && <span className="text-danger">Please enter your email</span>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="rounded" />
              {error && !password && <span className="text-danger">Please enter your password</span>}
            </Form.Group>
            <div className="text-center mt-2">
              <Form.Text className="text-muted">
                Not Registered? <Link to="/register" className="text-primary fw-bold">Click here</Link>
              </Form.Text>
            </div>
            <div className="d-grid mt-4">
              <Button variant="primary" size="lg" className="rounded login-btn" onClick={handleLogin}>
                Login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
