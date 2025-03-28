import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import About from "../../Components/compo/compo-pages/AboutUs";
import Contact from "../../Components/compo/compo-pages/ContactUs";

// Styled Components
const Container = styled.div`
  background: url("/images/language.jpg") no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  padding: 2rem;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    min-height: 40vh;
  }

  @media (max-width: 480px) {
    min-height: 35vh;
  }
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  -webkit-text-stroke: 1px black;
  text-decoration: none;
  max-width: 90%;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const SubHeading = styled.p`
  font-size: 1.25rem;
  color: white;
  margin-top: 0.5rem;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
  width: 100%;
  max-width: 80%;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    max-width: 95%;
  }
`;

const Button = styled(Link)`
  background-color: ${({ primary }) => (primary ? "#3182ce" : "#e2e8f0")};
  color: ${({ primary }) => (primary ? "white" : "#2d3748")};
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
  text-align: center;

  &:hover {
    background-color: ${({ primary }) => (primary ? "#2b6cb0" : "#edf2f7")};
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 5%;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const Home = () => {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.username) {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }

    const storedCourses = localStorage.getItem("enrolledCourses");
    if (storedCourses) {
      try {
        const parsedCourses = JSON.parse(storedCourses);
        setEnrolledCourses(parsedCourses || []);
      } catch (error) {
        console.error("Error parsing enrolled courses data from localStorage:", error);
      }
    }
  }, []);

  return (
    <>
      <Container>
        <div>
          <Heading>Master a New Language with Confidence</Heading>
          <SubHeading>Unlock new opportunities by learning a language that fits your goals.</SubHeading>
          <ButtonWrapper>
            <Button to="/courses" primary>Get Started</Button>
            <Button to="/courses">Explore Courses</Button>
          </ButtonWrapper>
        </div>
      </Container>
      <About />
      <Contact />
    </>
  );
};

export default Home;
