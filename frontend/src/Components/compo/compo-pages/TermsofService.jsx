import styled from 'styled-components';

const TermsOfService = () => {
  return (
    <Container>
      <Title>Terms of Service</Title>
      <LastUpdated>Last Updated: August 2023</LastUpdated>

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

      <ContactSection>
        <Paragraph>
          For questions about these Terms, contact us at: legal@company.com
        </Paragraph>
      </ContactSection>
    </Container>
  );
};

// Basic Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  line-height: 1.5;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 5px;
`;

const LastUpdated = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 30px;
`;

const Section = styled.div`
  margin-bottom: 25px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
  font-size: 16px;
`;

const ContactSection = styled.div`
  margin-top: 30px;
  border-top: 1px solid #ddd;
  padding-top: 20px;
`;

export default TermsOfService;