import styled from 'styled-components';

const plans = [
  {
    level: "Basic",
    title: "Perfect for casual learners getting started",
    price: "FREE",
    features: [
      " Access to 1 language",
      " 10 beginner lessons",
      " Limited practice quizzes",
      " Community support"
    ],
    buttonText: "Start for Free",
    buttonLink: "/signup/basic"
  },
  {
    level: "Pro",
    title: "Ideal for committed learners – pay per course",
    price: "$29",
    features: [
      " All Basic features +",
      " Full lesson library access",
      " Interactive grammar & vocab exercises",
      " AI pronunciation coach"
    ],
    buttonText: "Upgrade to Pro",
    buttonLink: "/signup/pro"
  },
  {
    level: "Premium",
    title: "Best for serious learners and polyglots",
    price: "$35",
    features: [
      " All Pro features +",
      " Access to all languages",
      " 1-on-1 tutor sessions",
      " Official course completion certificates"
    ],
    buttonText: "Go Premium",
    buttonLink: "/signup/premium"
  }
];



const PricingSection = () => (
  <StyledSection>
    <Title>Course Pricing</Title>
    <PlansGrid>
      {plans.map((plan, index) => (
        <PlanCard key={index} isHighlighted={index === 1}>
          <PlanLevel>{plan.level}</PlanLevel>
          
          {plan.price && <PlanPrice>{plan.price}</PlanPrice>}
          
          <PlanTitle>{plan.title}</PlanTitle>

          <FeaturesList>
            {plan.features.map((feature, i) => (
              <FeatureItem key={i}>{feature}</FeatureItem>
            ))}
          </FeaturesList>

          <SignupButton isHighlighted={index === 1}>{plan.buttonText}</SignupButton>
        </PlanCard>
      ))}
    </PlansGrid>
  </StyledSection>
);

const StyledSection = styled.section`
  padding: 5rem 1.5rem;
  background: white;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
`;
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #2d3436;
  margin: 0 auto 3rem auto;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    width: 60px;
    height: 4px;
    background: #6c5ce7;
    display: block;
    margin: 0.75rem auto 0;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;


const PlanCard = styled.article`
  background: ${props => props.isHighlighted ? '#f8f5ff' : '#fff'};
  border-radius: 16px;
  padding: 2.5rem 2rem;
  border: 1px solid ${props => props.isHighlighted ? '#6c5ce7' : '#e0e0e0'};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: ${props => props.isHighlighted ? '0 10px 30px rgba(108, 92, 231, 0.15)' : '0 5px 15px rgba(0, 0, 0, 0.03)'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.isHighlighted ? '0 15px 35px rgba(108, 92, 231, 0.2)' : '0 10px 25px rgba(0, 0, 0, 0.08)'};
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const PlanLevel = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const PlanPrice = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #6c5ce7;
  margin: 1rem 0;
  position: relative;
  
  &::before {
    content: attr(data-price);
    font-size: 1.5rem;
    position: absolute;
    top: 0.5rem;
    left: -1rem;
  }
`;

const PlanTitle = styled.p`
  font-size: 0.95rem;
  color: #636e72;
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.5;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 2.5rem;
  width: 100%;
  display: grid;
  gap: 0.75rem;
`;

const FeatureItem = styled.li`
  color: #2d3436;
  padding: 0.5rem 0;
  font-size: 0.95rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &::before {
    content: "✓";
    color: #6c5ce7;
    font-weight: bold;
  }
`;

const SignupButton = styled.button`
  background: ${props => props.isHighlighted ? '#6c5ce7' : 'white'};
  color: ${props => props.isHighlighted ? 'white' : '#6c5ce7'};
  border: 1px solid #6c5ce7;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  font-weight: 600;
  margin-top: auto;
  box-shadow: ${props => props.isHighlighted ? '0 4px 14px rgba(108, 92, 231, 0.3)' : 'none'};

  &:hover {
    background: ${props => props.isHighlighted ? '#5d4bcf' : '#f8f5ff'};
    transform: translateY(-2px);
    box-shadow: ${props => props.isHighlighted ? '0 6px 20px rgba(108, 92, 231, 0.4)' : '0 4px 10px rgba(108, 92, 231, 0.1)'};
  }

  &:active {
    transform: translateY(0);
  }
`;

export default PricingSection;