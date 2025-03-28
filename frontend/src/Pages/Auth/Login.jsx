import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [isResending, setIsResending] = useState(false);
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

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5001/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      const data = await response.json();
      if (response.ok) {
        completeLogin(data);
      } else {
        setMessage(data.error || "Verification failed");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setMessage("Server error, try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5001/api/auth/resend-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("New verification code sent");
      } else {
        setMessage(data.error || "Failed to resend code");
      }
    } catch (error) {
      console.error("Resend error:", error);
      setMessage("Server error, try again.");
    } finally {
      setIsResending(false);
    }
  };

  const completeLogin = (data) => {
    setMessage("Login successful!");
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/");
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage("");
    try {
      localStorage.setItem("token", "google-token-dummy");
      navigate("/");
    } catch (error) {
      setMessage(error.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleMetaLogin = async () => {
    setLoading(true);
    setMessage("");
    try {
      localStorage.setItem("token", "meta-token-dummy");
      navigate("/");
    } catch (error) {
      setMessage(error.message || "Meta login failed");
    } finally {
      setLoading(false);
    }
  };

  const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.835 0 3.456.989 4.518 2.468l3.199-3.048A9.97 9.97 0 0012.545 2C7.319 2 3.136 5.877 3.136 12c0 6.123 4.183 10 9.409 10 2.6 0 4.936-1.033 6.612-2.71l-3.236-3.126c-.862.81-2.114 1.293-3.376 1.293-2.773 0-5.128-2.155-5.128-5.457 0-3.302 2.355-5.457 5.128-5.457 1.474 0 2.707.538 3.612 1.433l2.577-2.523z"
      />
    </svg>
  );

  const MetaIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-8.965h-2.5V11.08h2.5V8.41c0-2.49 1.586-3.84 3.923-3.84 1.112 0 2.06.08 2.34.116v2.72h-1.61c-1.26 0-1.504.598-1.504 1.47v1.93h3.03l-.4 3.02h-2.63V24h5.116c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0"
      />
    </svg>
  );

  return (
    <Container>
      <LeftImageSection>
        <ImageContent>
          <h2>Welcome Back!</h2>
          <p>Sign in to continue your journey with us</p>
          <img
            src="https://source.unsplash.com/random/800x600?nature"
            alt=""
          />
          <Separator>
            <span style={{ color: "white" }}>OR</span>
          </Separator>
          <OAuthButtonGroup>
            <GoogleButton
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <GoogleIcon />
              Continue with Google
            </GoogleButton>

            <MetaButton
              type="button"
              onClick={handleMetaLogin}
              disabled={loading}
            >
              <MetaIcon />
              Continue with Meta
            </MetaButton>
          </OAuthButtonGroup>
        </ImageContent>
      </LeftImageSection>

      <RightFormSection>
        <Card>
          <Title>Login</Title>
          {message && <ErrorMessage>{message}</ErrorMessage>}

          {needsVerification ? (
            <VerificationForm onSubmit={handleVerification}>
              <VerificationMessage>
                We've sent a 6-digit code to {email}
              </VerificationMessage>

              <InputGroup>
                <Label>Verification Code</Label>
                <Input
                  type="text"
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </InputGroup>

              <ResendCode>
                Didn't receive code?{" "}
                <ResendButton
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                >
                  {isResending ? "Sending..." : "Resend Code"}
                </ResendButton>
              </ResendCode>

              <SubmitButton type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify Code"}
              </SubmitButton>

              <BackToLogin onClick={() => setNeedsVerification(false)}>
                ← Back to Login
              </BackToLogin>
            </VerificationForm>
          ) : (
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
          )}
        </Card>
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
    url("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVnaXN0cmF0aW9ufGVufDB8fDB8fHww") center/cover;
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

const VerificationForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const VerificationMessage = styled.p`
  color: #64748b;
  text-align: center;
  font-size: 0.875rem;
  margin-bottom: 1rem;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: white;
  color: #475569;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8fafc;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
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
