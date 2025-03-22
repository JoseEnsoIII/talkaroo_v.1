import styled from 'styled-components';
import { FaRobot, FaMicrophone, FaCommentDots, FaMagic, FaChartLine } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

const AiPage = () => {
  const chatMessages = [
    { id: 1, text: "Hi! I'm LinguaBot. What would you like to practice today?", type: 'ai' },
    { id: 2, text: "Bonjour! Comment ça va?", type: 'user' },
    { id: 3, text: "Excellent start! That means 'Hello! How are you?' in French. Let's continue!", type: 'ai' },
  ];

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <Title>Smart Language Learning with AI</Title>
          <SubTitle>Practice 24/7 with our intelligent language assistant</SubTitle>
          <StatsContainer>
            <StatItem>
              <FaChartLine size={24} />
              <StatText>40% Faster Learning</StatText>
            </StatItem>
            <StatItem>
              <FaMagic size={24} />
              <StatText>Real-time Corrections</StatText>
            </StatItem>
          </StatsContainer>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>AI-Powered Features</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FaRobot size={40} color="#00b894" />
            <FeatureTitle>Smart Chat Assistant</FeatureTitle>
            <FeatureText>Practice conversations with our AI tutor in realistic scenarios</FeatureText>
          </FeatureCard>

          <FeatureCard>
            <FaMicrophone size={40} color="#00b894" />
            <FeatureTitle>Pronunciation Analysis</FeatureTitle>
            <FeatureText>Instant feedback on your accent and speaking skills</FeatureText>
          </FeatureCard>

          <FeatureCard>
            <FaCommentDots size={40} color="#00b894" />
            <FeatureTitle>Grammar Correction</FeatureTitle>
            <FeatureText>Real-time writing improvements and suggestions</FeatureText>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <ChatSection>
        <SectionTitle>Try Our AI Chat</SectionTitle>
        <ChatContainer>
          <ChatWindow>
            {chatMessages.map((message) => (
              <Message key={message.id} type={message.type}>
                {message.text}
              </Message>
            ))}
          </ChatWindow>
          <ChatInputContainer>
            <ChatInput placeholder="Type your message in your target language..." />
            <SendButton>
              <FiSend size={20} />
            </SendButton>
          </ChatInputContainer>
        </ChatContainer>
      </ChatSection>

      <HowItWorksSection>
        <SectionTitle>How Our AI Works</SectionTitle>
        <StepsContainer>
          <Step>
            <StepNumber>1</StepNumber>
            <StepTitle>Natural Language Processing</StepTitle>
            <StepText>Advanced algorithms understand your input</StepText>
          </Step>
          <Step>
            <StepNumber>2</StepNumber>
            <StepTitle>Contextual Analysis</StepTitle>
            <StepText>AI evaluates grammar and vocabulary usage</StepText>
          </Step>
          <Step>
            <StepNumber>3</StepNumber>
            <StepTitle>Personalized Feedback</StepTitle>
            <StepText>Tailored suggestions based on your level</StepText>
          </Step>
        </StepsContainer>
      </HowItWorksSection>

      <TestimonialsSection>
        <SectionTitle>What Learners Say</SectionTitle>
        <TestimonialsGrid>
          <TestimonialCard>
            "The AI tutor helped me improve my Spanish conversation skills faster than any textbook!"
          </TestimonialCard>
          <TestimonialCard>
            "I love the instant pronunciation feedback - it's like having a native speaker with me 24/7!"
          </TestimonialCard>
        </TestimonialsGrid>
      </TestimonialsSection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  font-family: 'Inter', sans-serif;
  color: #2d3436;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #4A90E2 0%, #6C5CE7 100%);
  padding: 6rem 2rem;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: white;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SubTitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255,255,255,0.9);
  margin-bottom: 2rem;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
`;

const StatText = styled.span`
  font-size: 1.1rem;
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  background: #f8f9fa;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;
const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #2d3436;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin: 1rem 0;
  color: #2d3436;
`;

const FeatureText = styled.p`
  color: #636e72;
  line-height: 1.6;
`;

const ChatSection = styled.section`
  padding: 4rem 2rem;
  background: white;
`;

const ChatContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;

const ChatWindow = styled.div`
  height: 400px;
  background: #f8f9fa;
  padding: 1.5rem;
  overflow-y: auto;
`;

const Message = styled.div`
  max-width: 70%;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 15px;
  background: ${props => props.type === 'ai' ? '#00b894' : '#fff'};
  color: ${props => props.type === 'ai' ? 'white' : '#2d3436'};
  float: ${props => props.type === 'ai' ? 'left' : 'right'};
  clear: both;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const ChatInputContainer = styled.div`
  display: flex;
  background: white;
  padding: 1rem;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  margin-right: 1rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00b894;
  }
`;

const SendButton = styled.button`
  background:linear-gradient(135deg, #4A90E2 0%, #6C5CE7 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s;

  &:hover {
    background: #00cec9;
  }
`;

const HowItWorksSection = styled.section`
  padding: 4rem 2rem;
  background: #f8f9fa;
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Step = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background:linear-gradient(135deg, #4A90E2 0%, #6C5CE7 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-weight: bold;
`;

const StepTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const StepText = styled.p`
  color: #636e72;
`;

const TestimonialsSection = styled.section`
  padding: 4rem 2rem;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TestimonialCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  font-style: italic;
  color: #636e72;
`;

export default AiPage;