import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import About from "../../Components/Section/AboutUs";
import Contact from "../../Components/Section/ContactUs";
import WhyChooseUsPage from "../../Components/Section/WhyChooseUS";
import BloggingPage from "../../Components/Section/Blog";

// Styled Components
const Container = styled.div`
  background: url("/images/language.jpg") no-repeat center center/cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: clamp(35vh, 50vh, 60vh);
  text-align: center;
  padding: clamp(1rem, 3vw, 2rem);
  width: 100%;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: min(90%, 1200px);
  width: 100%;
  text-align: center; /* Add text alignment */
`;

const Heading = styled.h1`
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 700;
  color: white;
  -webkit-text-stroke: 1px black;
  line-height: 1.2;
  margin: 0; /* Remove auto margins */
  text-wrap: balance;
`;

const SubHeading = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: white;
  margin: clamp(0.5rem, 2vw, 1rem) auto 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  max-width: min(80ch, 90%);
  line-height: 1.4;
`;

const Button = styled(Link)`
  background-color: ${({ primary }) => (primary ? "#3182ce" : "#e2e8f0")};
  color: ${({ primary }) => (primary ? "white" : "#2d3748")};
  padding: clamp(0.6rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem);
  border-radius: 0.375rem;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: clamp(0.9rem, 2vw, 1rem);
  min-width: 120px;
  border: 2px solid transparent;
  text-align: center; /* Center button text */

  &:hover {
    background-color: ${({ primary }) => (primary ? "#2b6cb0" : "#edf2f7")};
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  @media (pointer: coarse) {
    padding: 1rem 1.5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: clamp(0.75rem, 2vw, 1rem);
  flex-wrap: wrap;
  margin-top: clamp(2rem, 5vw, 3rem);
  width: 100%;
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
        <ContentWrapper>
          <Heading>Master a New Language with Confidence</Heading>
          <SubHeading>
            Unlock new opportunities by learning a language that fits your goals.
          </SubHeading>
          <ButtonWrapper>
            <Button to="/enrollment" primary>Start Learning</Button>
            <Button to="/courses">Explore Courses</Button>
          </ButtonWrapper>
        </ContentWrapper>
      </Container>
      <About />
      <WhyChooseUsPage />
      <BloggingPage />
      <Contact />
    </>
  );
};

export default Home;
