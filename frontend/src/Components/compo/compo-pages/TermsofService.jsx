import styled from 'styled-components';

const TermsOfService = () => {
  return (
    <Container>
    <Title>Terms of Service</Title>
    <LastUpdated>Last Updated: August 2023</LastUpdated>

    <Content>
      <Section>
        <SectionTitle>1. Acceptance of Terms</SectionTitle>
        <Paragraph>
          By accessing or using our services, you agree to be bound by these Terms of Service.
          If you disagree with any part of the terms, you may not access the service.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>2. User Responsibilities</SectionTitle>
        <Paragraph>
          You agree to provide accurate information when creating an account, maintain the
          security of your credentials, not engage in unlawful activities, and comply with
          all applicable laws and regulations.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>3. Intellectual Property</SectionTitle>
        <Paragraph>
          All content and trademarks are the property of [Your Company] or its licensors.
          You may not reproduce or redistribute content without permission, use automated
          systems to access our services, or modify our intellectual property.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>4. Termination</SectionTitle>
        <Paragraph>
          We reserve the right to terminate or suspend access to our service immediately,
          without prior notice, for any breach of these Terms.
        </Paragraph>
      </Section>
    </Content>

    <ContactSection>
      <Paragraph>
        For questions about these Terms, contact us at: <Email href="mailto:legal@company.com">legal@company.com</Email>
      </Paragraph>
    </ContactSection>
  </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 100vh;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  background: #f9f9f9;
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  color: #2c3e50;
`;

const LastUpdated = styled.p`
  color: #666;
  font-size: 14px;
  text-align: left;
  margin-bottom: 30px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Section = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
  color: #34495e;
`;

const Paragraph = styled.p`
  font-size: 16px;
  color: #555;
`;

const ContactSection = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  text-align: center;
  border-top: 1px solid #ddd;
`;

const Email = styled.span`
  font-weight: bold;
  color: #007bff;
`;

export default TermsOfService;
