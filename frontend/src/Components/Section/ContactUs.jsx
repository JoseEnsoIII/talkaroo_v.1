import React, { useState } from "react";
import styled from "styled-components";
import { FaEnvelope, FaUser, FaPhone } from "react-icons/fa";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.phone.trim() || !/^\d+$/.test(formData.phone))
      newErrors.phone = "Valid phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", phone: "" });
      setErrors({});
    }
  };

  return (
    <Container>
      <LeftSection>
        <BackgroundImage />
        <Content>
          <MainTitle>Get in Touch</MainTitle>
          <SubTitle>We're here to help you </SubTitle>
        </Content>
      </LeftSection>
      <RightSection>
        <FormContainer>
          <FormTitle>Contact Form</FormTitle>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <FaUser />
              <StyledInput
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </InputGroup>
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

            <InputGroup>
              <FaEnvelope />
              <StyledInput
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </InputGroup>
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

            <InputGroup>
              <FaPhone />
              <StyledInput
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </InputGroup>
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}

            <SubmitButton type="submit">Send Message</SubmitButton>
          </Form>
        </FormContainer>
      </RightSection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  min-height: 80vh;
  width: 100%;
  overflow: hidden;
  border: 1px solid transparent;
  border-image: linear-gradient(135deg, #4A90E2 0%, #6C5CE7 100%);
  border-image-slice: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  position: relative;
  background: #f0f4f8;
  min-height: 300px;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1528747045269-390fe33c19f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGNvbnRhY3R8ZW58MHx8MHx8fDA%3D') center/cover;
  opacity: 0.9;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: 2rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MainTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color:white;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  color:white;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const RightSection = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #4A90E2 0%, #6C5CE7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-shadow: -5px 0 15px rgba(0,0,0,0.05);

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    min-height: 100vh;
    padding: 3rem 1rem;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;


const FormTitle = styled.h2`
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  width: 100%;

  svg {
    color: #4a5568;
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 0.95rem;
  padding: 0.3rem 0;

  &::placeholder {
    color: #a0aec0;
  }
`;

const SubmitButton = styled.button`
  background: #4a90e2;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #357abd;
    transform: translateY(-1px);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.85rem;
  margin-top: -0.8rem;
`;

export default ContactForm;
