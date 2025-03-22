import React, { useState } from 'react';
import styled from 'styled-components';

const Payment = ({ selectedLanguage, selectedLevel }) => {
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing
  };

  return (
    <Container>
      <PaymentContainer>
        <Header>
          <h1>Complete Your Subscription</h1>
          <p>Unlock full access to all language courses and features</p>
        </Header>

        <PlanSelection>
          <h3>Selected Course: {selectedLanguage} - {selectedLevel}</h3>
          <p>$9.99/month (billed annually)</p>
        </PlanSelection>

        <PaymentForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <Input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </FormGroup>

          <FormGroup>
            <label>Card Information</label>
            <CardDetails>
              <Input 
                type="text" 
                placeholder="Card Number" 
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required 
              />
              <Input 
                type="text" 
                placeholder="MM/YY" 
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required 
              />
              <Input 
                type="text" 
                placeholder="CVC" 
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                required 
              />
            </CardDetails>
            <CardIcons>
              <img src="/visa-icon.png" alt="Visa" />
              <img src="/mastercard-icon.png" alt="Mastercard" />
              <img src="/amex-icon.png" alt="American Express" />
            </CardIcons>
          </FormGroup>

          <Terms>
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">I agree to the Terms of Service and Privacy Policy</label>
          </Terms>

          <PayButton type="submit">Pay Now - $119.88</PayButton>
        </PaymentForm>

        <SecureMessage>
          🔒 Secure payment processing. All transactions are encrypted.
        </SecureMessage>
      </PaymentContainer>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  min-height: 100vh;
`;

const PaymentContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    color: #2c3e50;
    margin-bottom: 10px;
    font-size: 28px;
  }

  p {
    color: #7f8c8d;
  }
`;

const PlanSelection = styled.div`
  background: #ecf0f1;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;

  h3 {
    color: #2c3e50;
    margin-bottom: 8px;
  }

  p {
    color: #3498db;
    font-weight: bold;
  }
`;

const PaymentForm = styled.form`
  display: grid;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const CardDetails = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 15px;
  margin-top: 8px;
`;

const CardIcons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  img {
    height: 30px;
  }
`;

const Terms = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;

  input {
    margin: 0;
  }

  label {
    color: #34495e;
  }
`;

const PayButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;

  &:hover {
    background-color: #2980b9;
  }
`;

const SecureMessage = styled.p`
  text-align: center;
  color: #95a5a6;
  margin-top: 20px;
  font-size: 14px;
`;

export default Payment;
