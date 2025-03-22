import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  return (
    <Container>
      <h1>404</h1>
      <p>Page Not Found</p>
      <HomeButton to="/">Go Back Home</HomeButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background:rgb(255, 255, 255);
  color: #475569;
`;

const HomeButton = styled(Link)`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #6366f1;
  color: white;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background: #4f46e5;
  }
`;

export default NotFound;
