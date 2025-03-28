import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  height: 80vh;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
`;

const LeftContainer = styled.div`
  flex: 1;
  background-image: url('https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVnaXN0cmF0aW9ufGVufDB8fDB8fHww');
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  padding: 20px;

  @media (max-width: 768px) {
    min-height: 100vh;
    padding: 40px 20px;
  }
`;

const FormWrapper = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 350px;
  max-width: 90%;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.8rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
  min-height: 44px;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 14px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const PasswordStrength = styled.div`
  height: 5px;
  width: 100%;
  background: #eee;
  border-radius: 3px;
  margin: 5px 0;
  position: relative;  
  overflow: hidden;

  @media (max-width: 480px) {
    height: 4px;
  }
`;

const StrengthBar = styled.div`
  height: 100%;
  width: ${props => props.strength}%;
  background: ${props => props.color};
  transition: all 0.3s ease;
  animation: ${pulse} 1.5s infinite;
`;

const PolicyList = styled.ul`
  font-size: 12px;
  color: #666;
  padding-left: 15px;
  margin: 5px 0;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 11px;
    padding-left: 10px;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  z-index: 1000;
  width: 80%;
  max-width: 300px;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 15px;

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ShowPasswordWrapper = styled.div`
  margin-top: 10px;
  text-align: left;

  @media (max-width: 480px) {
    margin-top: 8px;
  }
`;

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordColor, setPasswordColor] = useState("#ff0000");
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false); // Track if the password field has been interacted with
  const [showPopup, setShowPopup] = useState(false); // Popup visibility state
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const navigate = useNavigate();

  // Password policy requirements
  const passwordRequirements = [
    { regex: /.{8,}/, description: "At least 8 characters" },
    { regex: /[A-Z]/, description: "At least one uppercase letter" },
    { regex: /[a-z]/, description: "At least one lowercase letter" },
    { regex: /[0-9]/, description: "At least one number" },
    { regex: /[^A-Za-z0-9]/, description: "At least one special character" },
  ];

  // Username policy: 3-20 characters, letters and numbers only
  const validateUsername = (username) => {
    return /^[a-zA-Z0-9]{3,20}$/.test(username);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    passwordRequirements.forEach((req) => {
      if (req.regex.test(password)) strength++;
    });
    return strength;
  };

  const updatePasswordStrength = (password) => {
    const strength = calculatePasswordStrength(password);
    setPasswordStrength((strength / passwordRequirements.length) * 100);
    
    if (strength < 2) setPasswordColor("#ff0000");
    else if (strength < 4) setPasswordColor("#ffd700");
    else setPasswordColor("#00ff00");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === "password") {
      updatePasswordStrength(value);
    }
    
    if (name === "username") {
      setUsernameValid(validateUsername(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check username validity
    if (!validateUsername(formData.username)) {
      setError("Username must be 3-20 characters (letters and numbers only)");
      return;
    }

    // Check password strength
    if (calculatePasswordStrength(formData.password) < 3) {
      setError("Password does not meet minimum strength requirements");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/auth/register", formData);
      alert(res.data.message);
      setShowPopup(true); // Show popup on successful registration
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  const handleRedirectLogin = () => {
    navigate("/login");
  };

  return (
    <Container>
      <LeftContainer />
      <RightContainer>
        <FormWrapper>
          <Title>Register</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="username"
              placeholder="Username (3-20 alphanumeric)"
              value={formData.username}
              onChange={handleChange}
              required
            />
            
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              onFocus={() => setPasswordFocused(true)} // Track when the password field is focused
              onBlur={() => setPasswordFocused(false)} // Track when the password field is blurred
            />
            <PasswordStrength>
              <StrengthBar strength={passwordStrength} color={passwordColor} />
            </PasswordStrength>

            {/* Only show password requirements if the password field has been interacted with */}
            {passwordFocused && (
              <>
                <PolicyList>
                  {passwordRequirements.map((req, index) => (
                    <li key={index}>{req.description}</li>
                  ))}
                </PolicyList>
                
              </>
            )}

            <Button 
              type="submit"
              disabled={!usernameValid || passwordStrength < 60}
            >
              Register
            </Button>
          </form>
          <Button onClick={handleRedirectLogin} style={{ marginTop: '10px' }}>
            Go to Login
          </Button>
        </FormWrapper>
      </RightContainer>

      {/* Popup for successful registration */}
      {showPopup && (
        <>
          <Overlay />
          <Popup>
            <h3>Registration Successful!</h3>
            <Button onClick={handleRedirectLogin}>Go to Login</Button>
          </Popup>
        </>
      )}
    </Container>
  );
};

export default RegisterForm;
