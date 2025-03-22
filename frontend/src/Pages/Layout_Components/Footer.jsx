import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaLanguage, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add axios for API calls

const Footer = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  // Fetch the courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/courses');
        setCourses(response.data.map(course => ({
          course_id: course.course_id,
          course_name: course.course_name,
          // Add other fields if needed
        }))); // Fixed closing parentheses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);


  const handleLanguageClick = (courseId) => {
    // Remove the '/basic' part from the URL
    navigate(`/enroll/${courseId}`);
  };

  // Limit to 5 courses
  const displayedCourses = courses.slice(0,3);

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h4>
              <FaLanguage />
              Talkaroo
            </h4>
            <FooterDescription>
              Learn a new language naturally through immersive experiences and real-world conversations.
            </FooterDescription>
            <SocialIcons>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </SocialIcons>
          </FooterSection>

          <FooterSection>
            <h4>Languages</h4>
            <LanguageList>
              {displayedCourses.length > 0 ? (
                displayedCourses.map((course) => (
                  <LanguageListItem
                    key={course.course_id} // Use course_id from PostgreSQL
                    onClick={() => handleLanguageClick(course.course_id)}
                  >
                    {course.course_name} {/* Use course_name field */}
                  </LanguageListItem>
                ))
              ) : (
                <p>Loading courses...</p>
              )}
            </LanguageList>
            <AvailabilityText>Available in 20+ languages</AvailabilityText>
          </FooterSection>

          <FooterSection>
            <h4>Stay Updated</h4>
            <NewsletterForm>
              <NewsletterInput placeholder="Enter your email" />
              <NewsletterButton>Subscribe</NewsletterButton>
            </NewsletterForm>
            <NewsletterDisclaimer>
              Get language learning tips and updates
            </NewsletterDisclaimer>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>© {new Date().getFullYear()} Talkaroo. All rights reserved.</Copyright>
          <FooterLinks>
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
          </FooterLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

// Styled Components (unchanged)
const FooterContainer = styled.footer`
  background: #fff;
  color: #1e293b;
  padding: 4rem 0 2rem;
  border-top: 1px solid #e5e7eb;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h4 {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #6366f1;
  }
`;

const FooterDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  a {
    color: #475569;
    font-size: 1.5rem;
    transition: all 0.3s ease;

    &:hover {
      color: #6366f1;
      transform: translateY(-2px);
    }
  }
`;

const LanguageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: grid;
  gap: 0.5rem;
`;

const LanguageListItem = styled.li`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  color:rgb(0, 0, 0);
  border: 1px solid #e5e7eb;

  &:hover {
    background: #f8fafc;
    color: #6366f1;
    transform: translateX(4px);
    border-color: #6366f1;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const AvailabilityText = styled.p`
  margin-top: 1rem;
  color: #64748b;
  font-size: 0.875rem;
`;

const NewsletterForm = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px 0 0 8px;
  color: #1e293b;
  font-size: 1rem;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #6366f1;
  }
`;

const NewsletterButton = styled.button`
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    background: #4f46e5;
  }
`;

const NewsletterDisclaimer = styled.p`
  margin-top: 1rem;
  color: #64748b;
  font-size: 0.875rem;
`;

const FooterBottom = styled.div`
  border-top: 1px solid #e5e7eb;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Copyright = styled.p`
  color: #64748b;
  font-size: 0.875rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const FooterLink = styled.a`
  color: #475569;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.875rem;

  &:hover {
    color: #6366f1;
  }
`;

export default Footer;
