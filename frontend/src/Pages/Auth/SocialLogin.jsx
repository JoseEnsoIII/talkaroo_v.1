import { useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SocialLoginModal = ({ provider, onClose }) => {
  const isGoogle = provider === 'google';

  // Dynamic configuration
  const providerConfig = {
    google: {
      title: 'Google Login',
      logo: 'https://icons8.com/icon/V5cGWnc9R4xj/google',
      color: '#4285F4',
    },
  };

  useEffect(() => {
    if (!isGoogle) {
      onClose();
    }
  }, [provider, onClose, isGoogle]);

const handleSuccess = async (authCode) => {
  try {
    const response = await fetch("http://localhost:5001/api/auth/google/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: authCode }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onClose();
      window.location.reload();
    } else {
      alert(data.error || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Server error, try again.");
  }
};


  const googleLogin = useGoogleLogin({
    flow: "auth-code",  // Request an authorization code instead of a token
    onSuccess: (codeResponse) => handleSuccess(codeResponse.code),
    onError: () => alert("Google login failed"),
  });
  
  if (!isGoogle) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <LoginModal 
        color={providerConfig[provider].color} 
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <LanguageDecoTop />
        <LogoWrapper>
        <GoogleIcon />
        </LogoWrapper>

        <TitleContainer>
          <Title>Continue with Google</Title>
          <Subtitle>Start your language journey today!</Subtitle>
        </TitleContainer>

        <ButtonContainer>
          <GoogleButton onClick={googleLogin}>
            <GoogleIcon />
            <ButtonText>Sign in with Google</ButtonText>
            <ArrowIcon />
          </GoogleButton>
        </ButtonContainer>

        <FooterText>
          By continuing, you agree to our <br />
          <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
        </FooterText>

        <CloseButton onClick={onClose}>&times;</CloseButton>
      </LoginModal>
    </ModalOverlay>
  );
};

// Styled Components (keep only relevant ones)
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(18, 22, 33, 0.95);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoginModal = styled(motion.div)`
  background: linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%);
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 440px;
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 16px;
  }
`;

const LanguageDecoTop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  background: rgba(66, 133, 244, 0.1);
  border-radius: 0 0 0 100px;

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

const LogoWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const TitleContainer = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  color: #2f3542;
  margin-bottom: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }

  @media (max-width: 320px) {
    font-size: 1.375rem;
  }
`;

const Subtitle = styled.p`
  color: #747d8c;
  font-size: 1rem;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
`;

const SocialButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    border-radius: 8px;
  }
`;

const GoogleButton = styled(SocialButton)`
  background: linear-gradient(135deg, #4F46E5 0%, #6366f1 100%);
`;

const ButtonText = styled.span`
  flex-grow: 1;
  text-align: center;
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const FooterText = styled.p`
  color: #747d8c;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 1rem 0;

  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin: 0.75rem 0;
  }

  a {
    color: #4285f4;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #747d8c;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  transition: all 0.2s;

  &:hover {
    color: #2f3542;
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    top: 0.75rem;
    right: 0.75rem;
  }
`;
const ArrowIcon = styled.span`
  &::after {
    content: '→';
    font-weight: 700;
    opacity: 0.8;
  }
`;
const GoogleIcon = styled.img.attrs({
  src: "/icon/google_logo.svg",
  alt: "Google Logo",
})`
  width: 24px;
  height: 24px;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;

export default SocialLoginModal;