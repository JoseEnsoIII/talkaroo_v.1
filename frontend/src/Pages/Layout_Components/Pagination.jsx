import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  background: ${props => (props.active ? '#4a90e2' : 'white')};
  color: ${props => (props.active ? 'white' : '#4a90e2')};
  border: 2px solid #4a90e2;
  padding: 0.5rem 1rem;
  margin: 0 0.3rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #4a90e2;
    color: white;
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <PaginationContainer>
     <PageButton 
  onClick={() => onPageChange(currentPage - 1)} 
  disabled={currentPage <= 1}
>
  Prev
</PageButton>

{[...Array(totalPages)].map((_, index) => (
  <PageButton 
    key={index} 
    active={currentPage === index + 1} 
    onClick={() => onPageChange(index + 1)}
  >
    {index + 1}
  </PageButton>
))}

<PageButton 
  onClick={() => onPageChange(currentPage + 1)} 
  disabled={currentPage >= totalPages}
>
  Next
</PageButton>

    </PaginationContainer>
  );
};

export default Pagination;
