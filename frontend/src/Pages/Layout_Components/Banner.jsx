import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import About from "../../Components/compo/compo-pages/AboutUs";
import Contact from "../../Components/compo/compo-pages/ContactUs";

// Styled components
const Banner = styled.div`
  background: url("/images/language.jpg") no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  padding: 2rem;
  color: white;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
`;

const SubHeading = styled.p`
  font-size: 1.25rem;
  margin-top: 0.5rem;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Home = () => {
  const location = useLocation();
  const [heading, setHeading] = useState("Master a New Language with Confidence");

  useEffect(() => {
    const pageHeadings = {
      "/": "Master a New Language with Confidence",
      "/courses": "Explore Our Language Courses",
      "/about": "Learn More About Us",
      "/contact": "Get in Touch With Us",
    };
    setHeading(pageHeadings[location.pathname] || "Welcome to Our Platform");
  }, [location.pathname]);

  return (
    <>
      <Banner>
        <Heading>{heading}</Heading>
        <SubHeading>Unlock new opportunities by learning a language that fits your goals.</SubHeading>
        <ButtonWrapper>
          <Button to="/courses" primary>Get Started</Button>
          <Button to="/courses">Explore Courses</Button>
        </ButtonWrapper>
      </Banner>
      <About />
      <Contact />
    </>
  );
};

export default Home;
