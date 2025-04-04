import styled from 'styled-components';

const BloggingPage = () => {
  return (
    <Container>
      <BloggingSection>
        <SectionTitle>Language Learning Insights</SectionTitle>
        <BlogGrid>
          {/* Blog Post 1 */}
          <BlogCard>
            <ImageContainer
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1698767008609-f5fa6137b9e6?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
              }}
            >
              <CategoryTag>Career</CategoryTag>
            </ImageContainer>
            <BlogContent>
              <BlogTitle>Boost Your Career with Language Learning</BlogTitle>
              <BlogDescription>
                Discover how multilingual skills can accelerate your professional growth and open global opportunities...
              </BlogDescription>
              <MetaInfo>
                <Author>María Rodríguez</Author>
                <ReadTime>5 min read</ReadTime>
              </MetaInfo>
              <ReadMoreButton>
                Continue Reading
                <ArrowIcon>→</ArrowIcon>
              </ReadMoreButton>
            </BlogContent>
          </BlogCard>

          {/* Blog Post 2 */}
          <BlogCard>
            <ImageContainer
              style={{
                backgroundImage: `url('https://plus.unsplash.com/premium_photo-1677966720018-580c48b67bd0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D8')`
              }}
            >
              <CategoryTag>Tips</CategoryTag>
            </ImageContainer>
            <BlogContent>
              <BlogTitle>Avoid These Language Learning Mistakes</BlogTitle>
              <BlogDescription>
                Learning a new language is exciting, but there are common pitfalls. Experts reveal key mistakes...
              </BlogDescription>
              <MetaInfo>
                <Author>Jean Dupont</Author>
                <ReadTime>4 min read</ReadTime>
              </MetaInfo>
              <ReadMoreButton>
                Continue Reading
                <ArrowIcon>→</ArrowIcon>
              </ReadMoreButton>
            </BlogContent>
          </BlogCard>

          {/* Blog Post 3 */}
          <BlogCard>
            <ImageContainer
              style={{
                backgroundImage: `url('https://plus.unsplash.com/premium_photo-1661764549854-679f7b3adb47?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
              }}
            >
              <CategoryTag>Pronunciation</CategoryTag>
            </ImageContainer>
            <BlogContent>
              <BlogTitle>Master Accent & Pronunciation</BlogTitle>
              <BlogDescription>
                Accent and pronunciation can make or break how native you sound in a new language. Learn techniques...
              </BlogDescription>
              <MetaInfo>
                <Author>Li Wei</Author>
                <ReadTime>6 min read</ReadTime>
              </MetaInfo>
              <ReadMoreButton>
                Continue Reading
                <ArrowIcon>→</ArrowIcon>
              </ReadMoreButton>
            </BlogContent>
          </BlogCard>
        </BlogGrid>
      </BloggingSection>
    </Container>
  );
};

// Updated Styled Components
const Container = styled.div`
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #2d3436;
`;

const BloggingSection = styled.section`
  padding: 6rem 1.5rem;
 background: #4F46E5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 4rem;
  background: white;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
  text-align: center;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  max-width: 1280px;
  width: 100%;
`;

const BlogCard = styled.article`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.05);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  height: 100%; // Ensure all cards have same height

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 240px;
  background-size: cover;
  background-position: center;
  flex-shrink: 0; // Prevent image container from shrinking
`;

const CategoryTag = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255,255,255,0.9);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #2b5876;
  backdrop-filter: blur(4px);
`;

const BlogContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1; // Make content area grow equally
`;

const BlogTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.3;
  color: #2d3436;
  margin: 0;
  min-height: 3.5em; // Ensure title height consistency
`;

const BlogDescription = styled.p`
  color: #636e72;
  line-height: 1.6;
  font-size: 0.95rem;
  margin: 0;
  flex-grow: 1; // Push button to bottom
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto; // Push to bottom
  font-size: 0.9rem;
  color: #74b9ff;
`;

const ReadMoreButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #2b5876;
  font-weight: 600;
  text-decoration: none;
  margin-top: 1rem;
  transition: color 0.3s ease;
  width: fit-content;

  &:hover {
    color: #4e4376;
    
    span {
      transform: translateX(3px);
    }
  }
`;

const Author = styled.span`
  font-weight: 600;
`;

const ReadTime = styled.span`
  color: #a4b0be;
`;  

const ArrowIcon = styled.span`
  transition: transform 0.3s ease;
  display: inline-block;
`;

export default BloggingPage;
