import React from 'react';
import styled from 'styled-components';
import {
  FaChalkboardTeacher,
  FaRobot,
  FaGlobe,
  FaGraduationCap,
  FaHandsHelping,
  FaLinkedin,
  FaFacebook
} from 'react-icons/fa';

const AboutUsPage = () => {
  return (
    <AboutContainer>
      

      <MissionSection>
        
        <SectionTitle>Our Mission in Talkaroo</SectionTitle>
        <SectionText>
          At Talkaroo, we're revolutionizing language education by combining the depth of real teacher knowledge with the
          power of artificial intelligence. Our mission is to make language learning accessible, effective, and
          personalized for every student worldwide.
        </SectionText>
      </MissionSection>

      <ApproachSection>
        <SectionTitle>Our Unique Approach</SectionTitle>
        <ApproachGrid>
          <ApproachCard>
            <FaChalkboardTeacher size={40} color="#3B82F6" />
            <ApproachTitle>Expert-Created Content</ApproachTitle>
            <ApproachText>
              All our core curriculum is developed by certified language professors with 10+ years of teaching experience.
              We ensure academic rigor and pedagogical effectiveness in every lesson.
            </ApproachText>
          </ApproachCard>

          <ApproachCard>
            <FaRobot size={40} color="#10B981" />
            <ApproachTitle>AI-Powered Enhancement</ApproachTitle>
            <ApproachText>
              Our AI tutors provide 24/7 practice opportunities, instant feedback, and personalized recommendations
              to supplement human teaching. They adapt to your learning style and pace.
            </ApproachText>
          </ApproachCard>

          <ApproachCard>
            <FaGlobe size={40} color="#8B5CF6" />
            <ApproachTitle>Cultural Immersion</ApproachTitle>
            <ApproachText>
              Beyond vocabulary and grammar, we teach real-world language use with cultural context from native speakers,
              enhanced by AI-simulated immersion scenarios.
            </ApproachText>
          </ApproachCard>
        </ApproachGrid>
      </ApproachSection>

      <TeamSection>
        <SectionTitle>Meet Our Educator Team</SectionTitle>
        <SectionText>
          Our faculty includes PhD linguists, certified language instructors, and native speakers who design all
          learning materials and oversee our AI training processes.
        </SectionText>

        <TeamGrid>
          <TeamMember>
            <MemberPhoto src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="Dr. Elena Rodriguez" />
            <TeamMemberName>Dr. Elena Rodriguez</TeamMemberName>
            <TeamMemberTitle>Head of Spanish Curriculum</TeamMemberTitle>
            <TeamMemberBio>
              Former university professor with 15 years experience teaching Spanish as a second language.
            </TeamMemberBio>
            <SocialLinks>
              <SocialLink href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </SocialLink>
              <SocialLink href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </SocialLink>
            </SocialLinks>
          </TeamMember>

          <TeamMember>
            <MemberPhoto src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="Prof. Chen Wei" />
            <TeamMemberName>Prof. Chen Wei</TeamMemberName>
            <TeamMemberTitle>Mandarin Program Director</TeamMemberTitle>
            <TeamMemberBio>
              Beijing Normal University graduate specializing in immersive language teaching methods.
            </TeamMemberBio>
            <SocialLinks>
              <SocialLink href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </SocialLink>
              <SocialLink href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </SocialLink>
            </SocialLinks>
          </TeamMember>

          <TeamMember>
            <MemberPhoto src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="Dr. Sophie Laurent" />
            <TeamMemberName>Dr. Sophie Laurent</TeamMemberName>
            <TeamMemberTitle>French Language Chair</TeamMemberTitle>
            <TeamMemberBio>
              Sorbonne-educated linguist and author of three French language textbooks.
            </TeamMemberBio>
            <SocialLinks>
              <SocialLink href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </SocialLink>
              <SocialLink href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </SocialLink>
            </SocialLinks>
          </TeamMember>
        </TeamGrid>
      </TeamSection>
    </AboutContainer>
  );
};

// Styled Components
const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
  color: #333;
`;


const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: #6366f1;
    border-radius: 3px;
  }
`;

const SectionText = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #475569;
`;

const ApproachSection = styled.section`
  margin-bottom: 4rem;
`;

const ApproachGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ApproachCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  svg {
    margin-bottom: 1.5rem;
  }
`;

const ApproachTitle = styled.h3`
  margin: 1rem 0;
  color: #1e293b;
  font-size: 1.25rem;
`;

const ApproachText = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

const TeamSection = styled.section`
  background: #f8fafc;
  padding: 4rem 2rem;
  border-radius: 20px;
  margin: 4rem 0;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 3rem auto 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TeamMember = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const MemberPhoto = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #e2e8f0;
  margin-bottom: 1.5rem;
`;

const TeamMemberName = styled.h3`
  margin: 0.5rem 0;
  color: #1e293b;
  font-size: 1.25rem;
`;

const TeamMemberTitle = styled.p`
  color: #6366f1;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TeamMemberBio = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: #64748b;
  transition: all 0.3s ease;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f1f5f9;

  &:hover {
    transform: scale(1.1);
    color: white;
    background: ${props => props.children.type === FaLinkedin ? '#0A66C2' : '#1877F2'};
  }
`;
const MissionSection = styled.section`
margin-top:5rem;
  margin-bottom: 5rem;
`;

export default AboutUsPage;