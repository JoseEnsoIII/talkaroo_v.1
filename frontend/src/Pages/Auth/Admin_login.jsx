import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f0f2f5;
`;

const LeftImageContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  background: linear-gradient(rgba(25, 28, 36, 0.7), rgba(25, 28, 36, 0.7));
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0 ;
  border:1px solid black;
`;

const ImageContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  width: 80%;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
`;

const RightFormContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
`;

const LoginForm = styled.form`
  width: 400px;
  padding: 2rem;
  border-radius: 8px;

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    font-size: 2rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin: 0.8rem 0;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #1890ff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 1.5rem;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #40a9ff;
  }
`;

const BackButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  background: none;
  color: #1890ff;
  border: 1px solid #1890ff;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e6f7ff;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Add the missing handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/admin-login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.token) {
        if (response.data.user && response.data.user.role !== "admin") {
          setError("Access denied. Admins only!");
          return;
        }
        localStorage.setItem("adminToken", response.data.token);
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      setError(error.response?.data?.error || "Login failed. Try again.");
    }
  };

  return (
    <LoginContainer>
      <LeftImageContainer>
        {/* Replace with your actual admin/login image */}
        <Image
          src="/images/language.jpg"
          alt="Admin Portal"
        />
        <ImageContent>
          <h2 >Welcome Back</h2>
          <p style={{ color:"white"}}>Secure access to your administration dashboard</p>
        </ImageContent>
      </LeftImageContainer>

      <RightFormContainer>
        <LoginForm onSubmit={handleSubmit}>
          <h2>Admin Login</h2>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Sign In</Button>
          <BackButton type="button" onClick={() => navigate("/")}>
            Back to Home
          </BackButton>
        </LoginForm>
      </RightFormContainer>
    </LoginContainer>
  );
};

export default AdminLogin;