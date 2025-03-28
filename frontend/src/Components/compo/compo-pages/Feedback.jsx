import React, { useState } from 'react';
import styled from 'styled-components';

const FeedbackPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: 'general',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <FormContainer>
        {submitted ? (
          <ThankYouMessage>
            <h2>🎉 Thank you for your feedback!</h2>
            <p>We appreciate your input and will use it to improve your experience.</p>
          </ThankYouMessage>
        ) : (
          <>
            <Title>Share Your Feedback</Title>
            <StyledForm onSubmit={handleSubmit}>
              <InputGroup>
                <Label>Your Name</Label>
                <InputWrapper>
                  <UserIcon />
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                </InputWrapper>
              </InputGroup>

              <InputGroup>
                <Label>Email Address</Label>
                <InputWrapper>
                  <EmailIcon />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  />
                </InputWrapper>
              </InputGroup>

              <InputGroup>
                <Label>Feedback Type</Label>
                <SelectWrapper>
                  <Select
                    name="feedbackType"
                    value={formData.feedbackType}
                    onChange={handleChange}
                  >
                    <option value="general">General</option>
                    <option value="bug">Bug Report</option>
                    <option value="suggestion">Suggestion</option>
                  </Select>
                </SelectWrapper>
              </InputGroup>

              <InputGroup>
                <Label>Your Message</Label>
                <TextArea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your feedback here..."
                  rows="4"
                />
              </InputGroup>

              <SubmitButton type="submit">Send Feedback</SubmitButton>
            </StyledForm>
          </>
        )}
      </FormContainer>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: 1rem;
  @media (max-width: 480px) {
    padding: 1.5rem;
    margin: 0.5rem;
    border-radius: 0.75rem;
  }
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #4a5568;
  font-weight: 500;
  font-size: 0.9rem;
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    outline: none;
  }

  &::placeholder {
    color: #a0aec0;
    font-size: 0.9rem;
  }
  @media (max-width: 480px) {
    padding: 0.65rem 0.9rem 0.65rem 2.2rem;
    font-size: 0.9rem;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  appearance: none;
  background-color: white;
  box-sizing: border-box;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    outline: none;
  }
  @media (max-width: 480px) {
    padding: 0.65rem 0.9rem;
    font-size: 0.9rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  resize: vertical;
  box-sizing: border-box;
  min-height: 120px;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    outline: none;
  }

  &::placeholder {
    color: #a0aec0;
    font-size: 0.9rem;
  }
  @media (max-width: 480px) {
    font-size: 0.9rem;
    min-height: 100px;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.9rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    transform: translateY(-2px);
  }
  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
`;

const ThankYouMessage = styled.div`
  text-align: center;
  padding: 1.5rem;
  h2 {
    color: #2d3748;
    margin-bottom: 1rem;
    font-family: 'Poppins', sans-serif;
    font-size: 1.5rem;
  }
  p {
    color: #4a5568;
    line-height: 1.6;
    font-size: 0.95rem;
  }
`;

// Updated SVG Icons with responsive sizing
const iconStyle = `
  position: absolute;
  left: 1rem;
  width: 1.2rem;
  height: 1.2rem;
  color: #a0aec0;
  pointer-events: none;
`;

const UserIcon = () => (
  <svg
    style={iconStyle}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm0 4v4m0 0v4m0-4H8m8 0H8"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    style={iconStyle}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12l-6 6M3 12l6-6M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"
    />
  </svg>
);

export default FeedbackPage;
