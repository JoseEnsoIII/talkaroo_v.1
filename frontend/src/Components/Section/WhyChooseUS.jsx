import styled from 'styled-components';
import { 
  FaChalkboardTeacher, 
  FaChartLine, 
  FaRocket, 
  FaLayerGroup, FaUser
} from 'react-icons/fa';

const WhyChooseUsPage = () => {
  return (
    <Container>
      <WhyChooseUsSection>
        <SectionTitle>
          <GradientText>Why Choose Talkaroo?</GradientText>
        </SectionTitle>
        <WhyGrid>
          <WhyCard>
            <IconWrapper>
              <FaChalkboardTeacher />
            </IconWrapper>
            <WhyTitle>Certified Native Teachers</WhyTitle>
            <WhyText>Learn from experienced instructors who are native speakers with cultural immersion techniques.</WhyText>
          </WhyCard>

          <WhyCard>
            <IconWrapper>
              <FaChartLine />
            </IconWrapper>
            <WhyTitle>AI-Powered Learning</WhyTitle>
            <WhyText>Smart progress tracking and adaptive lessons that evolve with your skills.</WhyText>
          </WhyCard>

          <WhyCard>
            <IconWrapper>
              <FaRocket />
            </IconWrapper>
            <WhyTitle>Interactive Practice</WhyTitle>
            <WhyText>Speech recognition, and gamified challenges for real-world fluency.</WhyText>
          </WhyCard>

          <WhyCard>
            <IconWrapper>
              <FaLayerGroup />
            </IconWrapper>
            <WhyTitle>Flexible Learning</WhyTitle>
            <WhyText>Seamless cross-device sync with offline mode and bite-sized lessons.</WhyText>
          </WhyCard>
        </WhyGrid>
      </WhyChooseUsSection>

      <TestimonialsSection>
    <SectionTitle>
      <GradientTexts>Success Stories</GradientTexts>
    </SectionTitle>
    <TestimonialsGrid>
      <TestimonialCard>
        <QuoteIcon>“</QuoteIcon>
        <StudentAvatar>
          <FaUser />
        </StudentAvatar>
        <TestimonialText>The cultural immersion modules helped me become conversationally fluent in Spanish within 6 months!</TestimonialText>
        <StudentInfo>
          <StudentName>John Tanaka</StudentName>
          <StudentLocation>Tokyo, Japan</StudentLocation>
        </StudentInfo>
      </TestimonialCard>

      <TestimonialCard>
        <QuoteIcon>“</QuoteIcon>
        <StudentAvatar>
          <FaUser />
        </StudentAvatar>
        <TestimonialText>Finally a platform that makes learning feel like play! The VR conversations boosted my confidence.</TestimonialText>
        <StudentInfo>
          <StudentName>Sarah Müller</StudentName>
          <StudentLocation>Berlin, Germany</StudentLocation>
        </StudentInfo>
      </TestimonialCard>

      <TestimonialCard>
        <QuoteIcon>“</QuoteIcon>
        <StudentAvatar>
          <FaUser />
        </StudentAvatar>
        <TestimonialText>From basic phrases to business French in 3 months - the AI tutor adapted perfectly to my pace.</TestimonialText>
        <StudentInfo>
          <StudentName>James Okonjo</StudentName>
          <StudentLocation>Lagos, Nigeria</StudentLocation>
        </StudentInfo>
      </TestimonialCard>
    </TestimonialsGrid>
  </TestimonialsSection>
    </Container>
  );
};

// Modern Styled Components
const Container = styled.div`
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #2d3436;
  overflow-x: hidden;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 4rem;
  padding: 0 1rem;
`;
const GradientTexts = styled.span`
  background: black;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;
const GradientText = styled.span`
  background: white;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const WhyChooseUsSection = styled.section`
  padding: 6rem 1.5rem;
  background: #4F46E5;
`;

const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const WhyCard = styled.article`
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 12px 32px rgba(0,0,0,0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  border: 1px solid rgba(0,0,0,0.03);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.1);
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #4A90E2 0%, #6C5CE7 100%);
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 1.8rem;
  transition: transform 0.3s ease;

  ${WhyCard}:hover & {
    transform: scale(1.1) rotate(8deg);
  }
`;

const WhyTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin: 1rem 0;
  color: #2d3436;
`;

const WhyText = styled.p`
  color: #636e72;
  line-height: 1.7;
  font-size: 1rem;
`;

const StudentAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #4A90E2; /* Background color for the user icon */
  display: grid;
  place-items: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2.5rem; /* Adjust the size of the icon */
  box-shadow: 0 8px 24px rgba(74,144,226,0.2);
`;

const TestimonialsSection = styled.section`
  padding: 6rem 1.5rem;
  background: linear-gradient(15deg, #ffffff 0%, #f8f9fa 100%);
`;

const TestimonialCard = styled.article`
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  position: relative;
  box-shadow: 0 12px 32px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const QuoteIcon = styled.div`
  font-size: 4rem;
  font-family: serif;
  color: #4A90E2;
  opacity: 0.2;
  position: absolute;
  top: -1rem;
  left: 1rem;
`;

const TestimonialText = styled.p`
  color: #2d3436;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const StudentInfo = styled.div`
  text-align: center;
`;

const StudentName = styled.p`
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 0.25rem;
`;

const StudentLocation = styled.p`
  color: #636e72;
  font-size: 0.9rem;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export default WhyChooseUsPage;