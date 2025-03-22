import styled from 'styled-components';
import { FaGamepad, FaBook, FaClipboardList, FaGlobe } from 'react-icons/fa';

// Enhanced Data for the practice modes (cards)
const practiceModes = [
  {
    id: 1,
    icon: <FaGamepad />,
    title: 'Interactive Games',
    description: 'Learn through fun and engaging games designed to improve vocabulary and grammar.',
    buttonText: 'Play Now',
    level: 'Beginner',
    duration: '10-15 minutes',
    category: 'Vocabulary & Grammar',
    image: '/images/interactive-games.jpg',  // Optional image
  },
  {
    id: 2,
    icon: <FaClipboardList />,
    title: 'Mock Exams',
    description: 'Test your knowledge with timed exams that simulate real language proficiency tests.',
    buttonText: 'Start Test',
    level: 'Intermediate',
    duration: '30 minutes',
    category: 'Proficiency Test',
    image: '/images/mock-exams.jpg',  // Optional image
  },
  {
    id: 3,
    icon: <FaBook />,
    title: 'Daily Lessons',
    description: 'Structured lessons covering grammar, vocabulary, and pronunciation.',
    buttonText: 'Begin Lesson',
    level: 'All Levels',
    duration: '20-25 minutes',
    category: 'Grammar, Vocabulary & Pronunciation',
    image: '/images/daily-lessons.jpg',  // Optional image
  },
  {
    id: 4,
    icon: <FaGlobe />,
    title: 'Real-world Challenges',
    description: 'Practice with authentic content from news articles, videos, and conversations.',
    buttonText: 'Try Challenge',
    level: 'Advanced',
    duration: '15-20 minutes',
    category: 'Practical Language Use',
    image: '/images/real-world-challenges.jpg',  // Optional image
  },
  {
    id: 5,
    icon: <FaBook />,
    title: 'Pronunciation Practice',
    description: 'Focus on improving your pronunciation with audio exercises and feedback.',
    buttonText: 'Start Practice',
    level: 'Beginner',
    duration: '10-15 minutes',
    category: 'Pronunciation',
    image: '/images/pronunciation-practice.jpg',  // Optional image
  },
  {
    id: 6,
    icon: <FaGamepad />,
    title: 'Vocabulary Building',
    description: 'Expand your vocabulary with themed word lists and flashcards.',
    buttonText: 'Start Learning',
    level: 'All Levels',
    duration: '15 minutes',
    category: 'Vocabulary',
    image: '/images/vocabulary-building.jpg',  // Optional image
  },
];

const PracticeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #636e72;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const PracticeCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const CardIcon = styled.div`
  font-size: 2.5rem;
  color: #6c5ce7;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #2d3436;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: #636e72;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const CardDetails = styled.div`
  font-size: 0.9rem;
  color: #636e72;
  margin-bottom: 1rem;
`;

const StartButton = styled.button`
  background: #6c5ce7;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #5b4bc4;
  }
`;

const PracticePage = () => {
  return (
    <PracticeContainer>
      <Header>
        <Title>Practice Your Language Skills</Title>
        <Subtitle>Choose from different practice modes to improve your language proficiency</Subtitle>
      </Header>

      <CardGrid>
        {practiceModes.map((mode) => (
          <PracticeCard key={mode.id}>
            <CardIcon>{mode.icon}</CardIcon>
            <CardTitle>{mode.title}</CardTitle>
            <CardDescription>{mode.description}</CardDescription>
            <CardDetails>
              <strong>Level:</strong> {mode.level} | 
              <strong> Duration:</strong> {mode.duration} | 
              <strong> Category:</strong> {mode.category}
            </CardDetails>
            <StartButton>{mode.buttonText}</StartButton>
          </PracticeCard>
        ))}
      </CardGrid>
    </PracticeContainer>
  );
};

export default PracticePage;
