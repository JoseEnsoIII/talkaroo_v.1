import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GoogleLoginModal from "./SocialLogin";
import FBLoginModal from './FB_Login';
import GoogleLogo from '/icon/FB.svg';
import MetaLogo from '/icon/google_logo.svg';
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Server error, try again.");
    } finally {
      setLoading(false);
    }
  };

  const completeLogin = (data) => {
    setMessage("Login successful!");
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/");
  };

  const handleMetaLogin = () => {
    setSelectedProvider("facebook");
    setShowSocialModal(true);
  };

  const handleCloseModal = () => {
    setShowSocialModal(false);
  };

  const GoogleIcon = () => (
    <img src={GoogleLogo} alt="Google Logo" width="24" height="24" />
  );
  
  const MetaIcon = () => (
    <img src={MetaLogo} alt="Meta Logo" width="24" height="24" />
  );
  
  return (
<Container>
      <LeftImageSection>
        <ImageContent>
          <h2>Welcome Back!</h2>
          <p>Sign in to continue your journey with us</p>
          <img src="https://source.unsplash.com/random/800x600?nature" alt="" />
          <Separator>
            <span style={{ color: "white" }}>OR</span>
          </Separator>
          <OAuthButtonGroup>
  <GoogleButton
    style={{
      backgroundImage: 'linear-gradient(135deg, #4285F4 0%, #357ABD 100%)',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}
    type="button"
    onClick={() => {
      setSelectedProvider("google");
      setShowSocialModal(true);
    }}
  >
    <GoogleIcon />
    Sign in with Google
  </GoogleButton>

  <MetaButton
    style={{
      backgroundImage: 'linear-gradient(135deg, #1877F2 0%, #166FE5 100%)',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}
    type="button"
    onClick={handleMetaLogin}
  >
    <MetaIcon />
    Sign in with Facebook
  </MetaButton>
</OAuthButtonGroup>
        </ImageContent>
      </LeftImageSection>

      <RightFormSection>
        <Card>
          <Title>Login</Title>
          {message && <ErrorMessage>{message}</ErrorMessage>}

          {!message ? (
            <Form onSubmit={handleLogin}>
              <InputGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>

              <InputGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <SubmitButton type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </SubmitButton>
                <RegisterLink>
                  Don't have an account? <a href="/signup">Register</a>
                </RegisterLink>
                <ForgotPasswordButton>
                  Forgot your password?{" "}
                  <a href="/forgot-password">Click here</a>
                </ForgotPasswordButton>
              </InputGroup>
            </Form>
          ) : null}
        </Card>
        {showSocialModal && (
          selectedProvider === "facebook" ? (
            <FBLoginModal 
              provider={selectedProvider} 
              onClose={handleCloseModal} 
            />
          ) : (
            <GoogleLoginModal
              provider={selectedProvider}
              onClose={handleCloseModal}
            />
          )
        )}
      </RightFormSection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  min-height: 80vh;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftImageSection = styled.div`
  flex: 1;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVnaXN0cmF0aW9ufGVufDB8fDB8fHww")
      center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 4rem 2rem;
    min-height: 300px;
  }
`;

const ImageContent = styled.div`
  max-width: 600px;
  h2 {
    color: white;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }
  p {
    color: white;
    font-size: 1.2rem;
    margin-bottom: 2rem;
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
  img {
    display: none;
    @media (max-width: 768px) {
      display: block;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      border-radius: 8px;
    }
  }
`;

const RightFormSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #f8fafc;

  @media (max-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const Card = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  height: auto;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin-bottom: 2rem;
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;


const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #475569;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }

  &:disabled {
    background-color: #f8fafc;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4f46e5;
  }

  &:disabled {
    background-color: #a5b4fc;
    cursor: not-allowed;
  }
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  color: #64748b;
  font-size: 0.875rem;
  margin: 1rem 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`;

const OAuthButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const OAuthButton = styled.button`
  padding: 0.75rem;
  font-size: 0.875rem;
  border-radius: 15px;

  @media (max-width: 480px) {
    padding: 0.65rem;
    font-size: 0.8125rem;
  }

  img {
    @media (max-width: 480px) {
      width: 20px;
      height: 20px;
    }
  }
`;

const GoogleButton = styled(OAuthButton)`
  border-color: #e2e8f0;
`;

const MetaButton = styled(OAuthButton)`
  border-color: #e2e8f0;
`;

const RegisterLink = styled.p`
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;

  a {
    color: #6366f1;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ResendCode = styled.div`
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  color: #6366f1;
  font-weight: 500;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    color: #94a3b8;
    cursor: not-allowed;
  }
`;

const BackToLogin = styled.button`
  background: none;
  border: none;
  color: #64748b;
  font-size: 0.875rem;
  cursor: pointer;
  text-align: center;
  margin-top: 1rem;

  &:hover {
    color: #6366f1;
    text-decoration: underline;
  }
`;

const ForgotPasswordButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #e2e8f0;
  color: #475569;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  margin-top: 1rem;

  &:hover {
    background-color: #d1d5db;
  }

  a {
    color: #6366f1;
    text-decoration: none;
    font-weight: 600;
  }
`;

export default LoginForm;