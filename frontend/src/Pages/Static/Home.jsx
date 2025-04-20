import React from "react";
import styled from "styled-components";
import flexibleImage from "/images/AI.png";
import { Link } from "react-router-dom";

import About from "../../Components/Section/AboutUs";
import WhyChooseUsPage from "../../Components/Section/WhyChooseUS";
import BloggingPage from "../../Components/Section/Blog";
import Contact from "../../Components/Section/ContactUs";

// Styled components
const LandingContainer = styled.div`
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(63, 33, 130, 0.1) 0%,
      rgba(19, 7, 46, 0) 70%
    );
    z-index: 0;
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: 4rem 1rem;
  }
`;

const Card = styled.div`
  background: linear-gradient(135deg, #13072e 0%, #3f2182 100%);
  color: white;
  border-radius: 2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 90rem;
  width: 100%;
  height: 550px;
  max-height: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  position: relative;
  z-index: 1;
  margin-top: -8%;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    flex-direction: row;
    min-height: 32rem;
    padding: 0;
  }

  @media (min-width: 1024px) {
    max-width: 95%;
  }
`;

const ContentSection = styled.div`
  padding: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;

  @media (min-width: 768px) {
    width: 50%;
    padding: 4rem;
    text-align: left;
    align-items: flex-start;
  }

  @media (max-width: 767px) {
    text-align: center;
    align-items: center;
  }

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const Tag = styled.span`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: blur(5px);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  width: fit-content;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

const Title = styled.h2`
  color: white;
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 36rem;
  font-weight: 400;

  @media (min-width: 768px) {
    font-size: 1.15rem;
  }

  @media (max-width: 640px) {
    font-size: 0.95rem;
    margin-bottom: 2rem;
  }
`;

const CTAButton = styled.button`
  background: white;
  color: #3f2182;
  font-weight: 700;
  padding: 0.875rem 2rem;
  border-radius: 2rem;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(255, 255, 255, 0.7) 100%
    );
    z-index: -1;
    transition: transform 0.3s ease;
    transform: scaleX(0);
    transform-origin: right;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);

    &::before {
      transform: scaleX(1);
      transform-origin: left;
    }
  }

  &:active {
    transform: translateY(0);
  }

  span {
    transition: transform 0.3s ease;
  }

  &:hover span {
    transform: translateX(3px);
  }

  @media (max-width: 640px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const ImageSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;

  @media (min-width: 768px) {
    width: 50%;
    padding: 3rem;
    display: flex; /* Ensure it's displayed on larger screens */
  }

  @media (max-width: 767px) {
    display: none; /* Hide on screens smaller than 768px */
  }
`;

const Image = styled.img`
  border-radius: 1.25rem;
  width: 100%;
  max-width: 32rem;
  height: auto;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
`;

// Component
const LandingPage = () => {
  return (
    <>
      <LandingContainer>
        <Card>
          <ContentSection>
            <Tag>#LearnAnywhere</Tag>
            <Title>Master New Languages from Home</Title>
            <Description>
              Join thousands of learners worldwide and unlock new opportunities
              by learning a new language from the comfort of your home. Our
              expert-designed courses make it easy, flexible, and fun to achieve
              fluency.
            </Description>
            <Link to="/courses" style={{ textDecoration: "none" }}>
              <CTAButton>
                Start Learning Now <span>🚀</span>
              </CTAButton>
            </Link>
          </ContentSection>

          <ImageSection>
            <Image src={flexibleImage} alt="Flexible Business Solutions" />
          </ImageSection>
        </Card>
      </LandingContainer>

      <About />
      <WhyChooseUsPage />
      <BloggingPage />
      <Contact />
    </>
  );
};

export default LandingPage;
