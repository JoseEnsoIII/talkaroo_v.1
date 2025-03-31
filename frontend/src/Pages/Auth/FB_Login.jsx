import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FBLoginModal = ({ provider, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);

  const isFacebook = provider === 'facebook';

  // Dynamic configuration
  const providerConfig = {
    facebook: {
      title: 'Facebook Login',
      logo: '/icon/FB.svg',  // Correct path to the FB.svg in the public folder
      color: '#1877F2',
    },
  };

  useEffect(() => {
    // Initialize Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v12.0'
      });
      setSdkLoaded(true);
    };

    // Load the SDK script
    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  useEffect(() => {
    if (!isFacebook) {
      onClose();
    }
  }, [provider, onClose, isFacebook]);

  const handleSuccess = async (accessToken) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/api/auth/facebook/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
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
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = () => {
    if (!sdkLoaded) {
      alert('Facebook SDK is not loaded. Please try again.');
      return;
    }

    window.FB.login(response => {
      if (response.authResponse) {
        handleSuccess(response.authResponse.accessToken);
      } else {
        alert('Facebook login cancelled or failed.');
      }
    }, { scope: 'email,public_profile' });
  };

  if (!isFacebook) return null;

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
          <FacebookIcon src={providerConfig[provider].logo} alt="Facebook Icon" />
        </LogoWrapper>

        <TitleContainer>
          <Title>Continue with Facebook</Title>
          <Subtitle>Start your language journey today!</Subtitle>
        </TitleContainer>

        <ButtonContainer>
          <FacebookButton onClick={handleFacebookLogin} disabled={loading}>
            {loading ? 'Logging in...' : (
              <>
                <FacebookIcon src={providerConfig[provider].logo} alt="Facebook Icon" />
                <ButtonText>Sign in with Facebook</ButtonText>
                <ArrowIcon />
              </>
            )}
          </FacebookButton>
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

// Styled Components (Modified)

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
`;

const LanguageDecoTop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  background: rgba(66, 133, 244, 0.1);
  border-radius: 0 0 0 100px;
`;
const LogoWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const FacebookIcon = styled.img`
  width:24px;  // Reduced size
  height:24px;  // Reduced size
  background: white;
`;


const TitleContainer = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  color: #2f3542;
  margin-bottom: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #747d8c;
  font-size: 1rem;
  margin: 0;
`;

const ButtonContainer = styled.div`
display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FacebookButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  background-color: #1877F2;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    background-color: #ccc;
  }
`;

const ButtonText = styled.span`
  flex-grow: 1;
  text-align: center;
  font-size: 1rem;
`;

const ArrowIcon = styled.span`
  &::after {
    content: '→';
    font-weight: 700;
    opacity: 0.8;
  }
`;

const FooterText = styled.p`
  color: #747d8c;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 1rem 0;

  a {
    color: #1877F2;
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
`;

export default FBLoginModal;
