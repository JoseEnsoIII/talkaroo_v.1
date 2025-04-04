import styled from "styled-components";
import {
  FaUserPlus,
  FaBookOpen,
  FaEdit,
  FaMicrophoneAlt,
  FaCheckCircle,
  FaAward ,FaVideo,
  FaClipboardList,
} from "react-icons/fa";

const AboutPage = () => {
  return (
    <Container>
      <FeaturesSection>
        <SectionTitle>
          <GradientText>Your Learning Journey</GradientText>
        </SectionTitle>
        <ProcessFlow>
          {processSteps.map((step, index) => (
            <ProcessStep key={index}>
              <StepNumber>{index + 1}</StepNumber>
              <StepIcon>{step.icon}</StepIcon>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
              {index < processSteps.length - 1 && <StepConnector />}
            </ProcessStep>
          ))}
        </ProcessFlow>
      </FeaturesSection>

      <CourseSection>
        <SectionTitle>
          <GradientTexts>Learning Pathways</GradientTexts>
        </SectionTitle>
        <CoursesGrid>
          {courses.map((course, index) => (
            <CourseCard key={index}>
              <CourseLevel>{course.level}</CourseLevel>
              <CourseTitle>{course.title}</CourseTitle>
              <CourseDescription>{course.description}</CourseDescription>
              <CoursePrice>{course.price}</CoursePrice>
              <EnrollButton>{course.buttonText}</EnrollButton>
            </CourseCard>
          ))}
        </CoursesGrid>
      </CourseSection>
    </Container>
  );
};

// Modern Styled Components
const Container = styled.div`
  font-family: "Inter", system-ui, -apple-system, sans-serif;
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
color:#fff;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const FeaturesSection = styled.section`
  padding: 6rem 1.5rem;
  background: #4F46E5;
`;



const ProcessFlow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }
`;
const ProcessStep = styled.div`
  position: relative;
  flex: 1 1 160px;
  min-width: 160px;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    margin: 0 0 3rem 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const StepNumber = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(45deg, #4a90e2, #6c5ce7);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin: 0 auto 1rem;
`;

const StepIcon = styled.div`
  font-size: 2rem;
  color: #4a90e2;
  margin: 1rem 0;
  svg {
    width: 40px;
    height: 40px;
  }
`;

const StepTitle = styled.h4`
  font-size: 1.1rem;
  margin: 0.5rem 0;
  color: #2d3436;
`;

const StepDescription = styled.p`
  color: #636e72;
  font-size: 0.9rem;
  line-height: 1.5;
  flex: 1;
`;

const StepConnector = styled.div`
  position: absolute;
  top: 40%;
  right: -15%;
  width: 30%;
  height: 2px;
  background: linear-gradient(90deg, #4a90e2 80%, transparent 100%);
  opacity: 0.3;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: -3px;
    width: 0;
    height: 0;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 8px solid #4a90e2;
  }

  @media (max-width: 768px) {
    right: auto;
    left: 50%;
    top: auto;
    bottom: -40px;
    width: 2px;
    height: 40px;
    background: linear-gradient(180deg, #4a90e2 80%, transparent 100%);
    transform: translateX(-50%);

    &::after {
      left: 50%;
      right: auto;
      top: auto;
      bottom: 0;
      transform: translateX(-50%);
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 8px solid #4a90e2;
    }
  }

  @media (max-width: 480px) {
    bottom: -35px;
    height: 35px;
  }
`;

const CourseSection = styled.section`
  padding: 6rem 1.5rem;
  background: linear-gradient(15deg, #ffffff 0%, #f8f9fa 100%);
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const CourseCard = styled.article`
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
  }
`;

const CourseLevel = styled.span`
  background: linear-gradient(45deg, #4a90e2, #6c5ce7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const CourseTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 1rem 0;
  color: #2d3436;
`;

const CourseDescription = styled.p`
  color: #636e72;
  line-height: 1.7;
  font-size: 1rem;
  margin-bottom: auto;
`;

const CoursePrice = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 2rem 0;
  background: linear-gradient(45deg, #2b5876, #4e4376);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const EnrollButton = styled.button`
  background: linear-gradient(45deg, #4a90e2, #6c5ce7);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 200px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(74, 144, 226, 0.3);
  }
`;

const processSteps = [
  {
    icon: <FaUserPlus />,
    title: "Enrollment",
    description: "Create your account and take our placement test",
  },
  {
    icon: <FaBookOpen />,
    title: "Vocabulary Building",
    description:
      "Learn essential words and phrases through interactive modules",
  },
  {
    icon: <FaEdit />,
    title: "Practice",
    description: "Reading and Reading Practic",
  },
  {
    icon: <FaMicrophoneAlt />,
    title: "Speaking Drills",
    description: "Practice pronunciation with speech recognition technology",
  },
  
  {
    icon: <FaVideo />,
    title: "Weekly Video Lessons",
    description: "Watch weekly video lessons to enhance your understanding",
  },
  {
    icon: <FaClipboardList />,
    title: "Weekly Exercises",
    description: "Games, Mock Tests, Weekly Exam",
  },
 
  {
    icon: <FaCheckCircle />,
    title: "Fluency Test",
    description: "Complete final assessments to prove your proficiency",
  },
  {
    icon: <FaAward />,
    title: "Get Certified",
    description: "Receive your official language proficiency certificate",
  },
];

const courses = [
  {
    level: "Level 1",
    title: "Basic Communication",
    description: "Master everyday conversations in your target language",
    price: "$FREE",
    buttonText: "Start Learning",
  },
  {
    level: "Level 2",
    title: "Workplace Fluency",
    description: "Learn professional language skills for the workplace",
    price: "$19.99",
    buttonText: "Start Learning",
  },
  {
    level: "Level 3",
    title: "Advanced Communication",
    description: "Master complex conversations for academic or business use",
    price: "$39.99",
    buttonText: "Start Learning",
  },
];

export default AboutPage;
