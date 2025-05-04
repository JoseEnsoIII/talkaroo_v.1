import React from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

const CoursesPage = () => {
  const courses = [
    // Language Courses
    {
      id: 1,
      category: 'language',
      title: 'English Mastery',
      description: 'Comprehensive English course covering grammar, vocabulary, and conversation',
      level: 'Beginner',
      duration: '8 weeks'
    },
    {
      id: 2,
      category: 'language',
      title: 'Spanish Essentials',
      description: 'Learn basic Spanish for travel and everyday communication',
      level: 'Beginner',
      duration: '6 weeks'
    },
    {
      id: 3,
      category: 'language',
      title: 'EPS Korea',
      description: 'Professional French for business environments',
      level: 'Beginner',
      duration: '10 weeks'
    },
    
    // Coding Courses
    {
      id: 4,
      category: 'coding',
      title: 'Python Fundamentals',
      description: 'Learn Python programming from scratch',
      level: 'Beginner',
      duration: '8 weeks'
    },
    {
      id: 5,
      category: 'coding',
      title: 'Web Development',
      description: 'Build websites with HTML, CSS, and JavaScript',
      level: 'Beginner',
      duration: '12 weeks'
    },
    {
      id: 6,
      category: 'coding',
      title: 'React Masterclass',
      description: 'Advanced React patterns and best practices',
      level: 'Intermediate',
      duration: '10 weeks'
    },
    
    // AI Courses
    {
      id: 7,
      category: 'ai',
      title: 'AI Basics',
      description: 'Introduction to Artificial Intelligence concepts',
      level: 'Beginner',
      duration: '6 weeks'
    },
    {
      id: 8,
      category: 'ai',
      title: 'Machine Learning',
      description: 'Practical ML with Python and scikit-learn',
      level: 'Intermediate',
      duration: '12 weeks'
    },
    {
      id: 9,
      category: 'ai',
      title: 'Deep Learning',
      description: 'Neural networks and advanced AI techniques',
      level: 'Advanced',
      duration: '14 weeks'
    }
  ];

  const handleAddCourse = (courseId) => {
    console.log(`Added course ${courseId}`);
    // Add your logic here for adding the course
  };

  return (
    <CoursesContainer>
      <CourseGrid>
        {courses.map(course => (
          <CourseCard key={course.id}>
            <CardHeader>
              <CategoryLabel category={course.category}>
                {course.category.toUpperCase()}
              </CategoryLabel>
              <LevelBadge>{course.level}</LevelBadge>
            </CardHeader>
            <CardBody>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <Duration>{course.duration}</Duration>
            </CardBody>
            <CardFooter>
              <AddButton onClick={() => handleAddCourse(course.id)}>
                <FaPlus /> Add
              </AddButton>
            </CardFooter>
          </CourseCard>
        ))}
      </CourseGrid>
    </CoursesContainer>
  );
};

// Styled Components
const CoursesContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CourseCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #f8f9fa;
`;

const CategoryLabel = styled.span`
  font-weight: bold;
  color: ${props => 
    props.category === 'language' ? '#3b82f6' : 
    props.category === 'coding' ? '#10b981' : 
    '#8b5cf6'};
`;

const LevelBadge = styled.span`
  background: #e2e8f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const CardBody = styled.div`
  padding: 1.5rem;
  flex-grow: 1;

  h3 {
    margin: 0 0 1rem 0;
    color: #1e293b;
  }

  p {
    color: #64748b;
    margin: 0 0 1rem 0;
  }
`;

const Duration = styled.div`
  color: #475569;
  font-size: 0.9rem;
`;

const CardFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #4f46e5;
  }
`;

export default CoursesPage;