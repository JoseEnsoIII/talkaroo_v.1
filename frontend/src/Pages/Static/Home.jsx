import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import About from "../../Components/compo/compo-pages/AboutUs";
import Contact from "../../Components/compo/compo-pages/ContactUs";

// Styled components
const Container = styled.div`
  background: url("/images/language.jpg") no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  background-color: rgb(255, 255, 255);
  text-align: center;
  padding: 2rem;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-shadow: 
  text-decoration:none;
    -1px -1px 0 black,  
    1px -1px 0 black,
    -1px 1px 0 black,
    1px 1px 0 black;
`;

const SubHeading = styled.p`
  font-size: 1.25rem;
  color: rgb(255, 255, 255);
  margin-top: 0.5rem;
  text-shadow: 
    -1px -1px 0 black,  
    1px -1px 0 black,
    -1px 1px 0 black,
    1px 1px 0 black;
`;

const Button = styled(Link)`
  background-color: ${({ primary }) => (primary ? "#3182ce" : "#e2e8f0")};
  color: ${({ primary }) => (primary ? "white" : "#2d3748")};
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  text-decoration: none;
  margin-top: 5%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ primary }) => (primary ? "#2b6cb0" : "#edf2f7")};
  }
`;

// Updated styled component for button container
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Home = () => {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    // Retrieve user info from localStorage
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

    // Fetch enrolled courses from localStorage (Assuming it's stored as an array)
    const storedCourses = localStorage.getItem("enrolledCourses");
    if (storedCourses) {
      try {
        const parsedCourses = JSON.parse(storedCourses);
        setEnrolledCourses(parsedCourses || []);
      } catch (error) {
        console.error(
          "Error parsing enrolled courses data from localStorage:",
          error
        );
      }
    }
  }, []);

  return (
    <>
      <Container>
        <div>
          <Heading>Master a New Language with Confidence</Heading>
          <SubHeading>
            Unlock new opportunities by learning a language that fits your goals.
          </SubHeading>
          <ButtonWrapper>
            <Button to="/courses" primary>
              Get Started
            </Button>
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
