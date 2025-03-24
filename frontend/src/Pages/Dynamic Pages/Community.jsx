import { useState } from 'react';
import styled from 'styled-components';
import { FiSearch, FiUsers, FiMessageSquare, FiCalendar } from 'react-icons/fi';

const CommunityPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data
  const languageGroups = [
    { id: 1, name: 'Spanish Learners', members: 2450, level: 'Intermediate' },
    { id: 2, name: 'French Conversation', members: 1800, level: 'Advanced' },
    { id: 3, name: 'German Beginners', members: 920, level: 'Beginner' },
    { id: 4, name: 'Japanese Culture Club', members: 1500, level: 'All Levels' },
  ];

  const featuredPosts = [
    { id: 1, title: 'Mastering Spanish Verbs', author: 'Maria Sanchez', comments: 45 },
    { id: 2, title: 'French Pronunciation Guide', author: 'Pierre Dubois', comments: 28 },
    { id: 3, title: 'German Grammar Tips', author: 'Anna Müller', comments: 32 },
  ];

  return (
    <CommunityContainer>
      <Header>
        <Title>Language Community</Title>
        <SearchContainer>
          <FiSearch />
          <SearchInput 
            placeholder="Search groups, posts, or members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
      </Header>

      <SectionTitle>
        <FiUsers /> Popular Language Groups
      </SectionTitle>
      <GroupsGrid>
        {languageGroups.map(group => (
          <GroupCard key={group.id}>
            <GroupHeader>
              <GroupName>{group.name}</GroupName>
              <GroupLevel>{group.level}</GroupLevel>
            </GroupHeader>
            <GroupMembers>
              <FiUsers /> {group.members.toLocaleString()} members
            </GroupMembers>
            <JoinButton>Join Group</JoinButton>
          </GroupCard>
        ))}
      </GroupsGrid>

      <SectionTitle>
        <FiMessageSquare /> Featured Discussions
      </SectionTitle>
      <PostsGrid>
        {featuredPosts.map(post => (
          <PostCard key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <PostAuthor>by {post.author}</PostAuthor>
            <PostStats>
              <FiMessageSquare /> {post.comments} comments
            </PostStats>
          </PostCard>
        ))}
      </PostsGrid>

      <SectionTitle>
        <FiCalendar /> Upcoming Events
      </SectionTitle>
      <EventCard>
        <EventDate>
          <div>MAR</div>
          <div>15</div>
        </EventDate>
        <EventDetails>
          <EventTitle>Spanish Conversation Hour</EventTitle>
          <EventTime>March 15, 2024 | 6:00 PM GMT</EventTime>
          <EventDescription>
            Join our virtual meetup to practice Spanish with learners worldwide!
          </EventDescription>
        </EventDetails>
        <EventButton>RSVP Now</EventButton>
      </EventCard>
    </CommunityContainer>
  );
};

// Styled Components
const CommunityContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 0.8rem 1.5rem;
  background: #fff;
  border-radius: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  svg {
    color: #718096;
    margin-right: 1rem;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  &::placeholder {
    color: #a0aec0;
  }
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: #2d3748;
  margin: 2rem 0 1.5rem;
`;

const GroupsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const GroupCard = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const GroupName = styled.h3`
  font-size: 1.1rem;
  color: #2d3748;
`;

const GroupLevel = styled.span`
  background: #e2e8f0;
  color: #4a5568;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.85rem;
`;

const GroupMembers = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  margin-bottom: 1.5rem;
`;

const JoinButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #3182ce;
  }
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const PostCard = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const PostTitle = styled.h3`
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const PostAuthor = styled.p`
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const PostStats = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
`;

const EventCard = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 2rem;
`;

const EventDate = styled.div`
  text-align: center;
  background: #4299e1;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  min-width: 80px;
  div:first-child {
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
  }
  div:last-child {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const EventDetails = styled.div`
  flex: 1;
`;

const EventTitle = styled.h3`
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const EventTime = styled.p`
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const EventDescription = styled.p`
  color: #4a5568;
  line-height: 1.5;
`;

const EventButton = styled.button`
  background: #48bb78;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #38a169;
  }
`;

export default CommunityPage;