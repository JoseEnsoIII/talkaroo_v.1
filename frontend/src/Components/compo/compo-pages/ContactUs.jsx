import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiCheckCircle, FiGlobe, FiMail, FiMessageSquare } from "react-icons/fi";

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  padding: 2rem;
   background: linear-gradient(135deg, #4A90E2 0%, #6C5CE7 100%);
  background-size: 400% 400%;
  animation: ${gradientBackground} 15s ease infinite;
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 500px;
  margin: auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  text-align: center;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

const Description = styled.p`
  text-align: center;
  color: #718096;
  margin-bottom: 2rem;
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  background: #f0fff4;
  border: 1px solid #68d391;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #2f855a;
`;

const InputContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const InputLabel = styled.label`
  display: block;
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => props.error ? "#fc8181" : "#e2e8f0"};
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
    outline: none;
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => props.error ? "#fc8181" : "#e2e8f0"};
  border-radius: 10px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
    outline: none;
  }
`;

const ErrorMessage = styled.span`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
   background: linear-gradient(135deg, #4A90E2 0%, #6C5CE7 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(66, 153, 225, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
`;

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) error = `${name} is required`;
    if (name === "email" && value.trim() && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));
    if (Object.values(errors).some((error) => error) || Object.values(formData).some((v) => !v.trim())) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch {
      setErrors({ api: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

 return (
    <Container>
      <FormCard>
        <Title>
          <FiGlobe size="1.2em" />
          Contact Us
        </Title>
        <Description>
          Have questions about language courses or need learning resources? We're here to help!
        </Description>

        {success && (
          <SuccessMessage>
            <FiCheckCircle size="1.2em" />
            {success}
          </SuccessMessage>
        )}

        <form onSubmit={handleSubmit}>
          <InputContainer>
            <InputLabel>
              <FiMail />
              Full Name
            </InputLabel>
            <StyledInput
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              error={errors.name}
              disabled={isSubmitting}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </InputContainer>

          <InputContainer>
            <InputLabel>
              <FiMail />
              Email Address
            </InputLabel>
            <StyledInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              error={errors.email}
              disabled={isSubmitting}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputContainer>

          <InputContainer>
            <InputLabel>
              <FiMessageSquare />
              Your Message
            </InputLabel>
            <StyledTextarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              error={errors.message}
              disabled={isSubmitting}
            />
            {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
          </InputContainer>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <LoadingSpinner />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </SubmitButton>
        </form>
      </FormCard>
    </Container>
  );
};

export default ContactUs;