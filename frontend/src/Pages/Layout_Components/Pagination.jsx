import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 0.2rem;
  }
`;

const PageButton = styled.button`
  background: ${props => (props.active ? '#4a90e2' : 'white')};
  color: ${props => (props.active ? 'white' : '#4a90e2')};
  border: 2px solid #4a90e2;
  padding: 0.3rem 0.8rem;
  margin: 0;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 40px;
  font-size: 0.9rem;

  &:hover:not(:disabled) {
    background: #4a90e2;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 0.2rem 0.6rem;
    font-size: 0.8rem;
    min-width: 32px;
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);
    
    if (currentPage <= 2) {
      end = 3;
    } else if (currentPage >= totalPages - 1) {
      start = totalPages - 2;
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <PaginationContainer>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Prev
      </PageButton>

      {getVisiblePages().map(page => (
        <PageButton
          key={page}
          active={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {page}
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