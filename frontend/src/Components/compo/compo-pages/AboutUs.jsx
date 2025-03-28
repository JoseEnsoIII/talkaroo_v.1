import styled from 'styled-components';
import { FaGlobe, FaComments, FaMobileAlt } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <Title>Unlock the World Through Language</Title>
          <SubTitle>Join 10 Million+ Learners Worldwide</SubTitle>
          <CTAButton>Start Learning Now</CTAButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Why Choose Talkaroo?</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FaGlobe size={40} color="#4A90E2" />
            <FeatureTitle>100+ Languages</FeatureTitle>
            <FeatureText>From Spanish to Swahili, we've got you covered</FeatureText>
          </FeatureCard>
          <FeatureCard>
            <FaComments size={40} color="#4A90E2" />
            <FeatureTitle>Native Speaker Conversations</FeatureTitle>
            <FeatureText>Practice with real conversations</FeatureText>
          </FeatureCard>
          <FeatureCard>
            <FaMobileAlt size={40} color="#4A90E2" />
            <FeatureTitle>Learn Anywhere</FeatureTitle>
            <FeatureText>Mobile-friendly platform</FeatureText>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
    </Container>
  );
};

const Container = styled.div`
  font-family: 'Inter', sans-serif;
  color: #2d3436;
  width: 100%;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #4A90E2 0%, #6C5CE7 100%);
  padding: 6rem 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

const HeroContent = styled.div`
  max-width: 800px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled.button`
  background: #FF7675;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 1rem;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin: 1rem 0;
`;

const FeatureText = styled.p`
  color: #636e72;
  line-height: 1.6;
`;

export default AboutPage;
