import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Pagination from '../Layout_Components/Pagination';
import { Button } from '@mui/material';
import { Book as BookIcon } from '@mui/icons-material';

const VocabularyContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.8rem 1.2rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  width: 300px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div`
  background: #4a90e2;
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Word = styled.h3`
  margin: 0;
  color: #2d3748;
  font-size: 1.25rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: #718096;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
  flex-grow: 1;
`;

const VocabularyPage = () => {
  const [vocabularyItems, setVocabularyItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 9;

  // Fetch vocabulary (only from course_id=1)
  const fetchVocabulary = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:5001/api/vocabulary?course_id=1`);
      if (!response.ok) throw new Error('Failed to fetch vocabulary');
      
      const data = await response.json();
      setVocabularyItems(data.data);
    } catch (error) {
      console.error('Error fetching vocabulary:', error);
      setError('Failed to load vocabulary.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVocabulary();
  }, [fetchVocabulary]);

  const filteredItems = vocabularyItems.filter(item =>
    item.vocab_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <VocabularyContainer>
      <Header>
        <h1>Vocabulary Builder</h1>
        <SearchInput
          type="text"
          placeholder="Search vocabulary..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Header>

      {loading ? (
        <p>Loading vocabulary...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <Grid>
            {currentItems.map(item => (
              <Card key={item.vocab_id}>
                <div>
                  <CardHeader>
                    <IconWrapper>
                      <BookIcon fontSize="small" />
                    </IconWrapper>
                    <Word>{item.vocab_title}</Word>
                  </CardHeader>
                  <Description>{item.vocab_title_description}</Description>
                </div>
                <Button 
                  variant="contained" 
                  color="primary"
                  fullWidth
                  sx={{ textTransform: 'none', borderRadius: '8px' }}
                >
                  Practice Now
                </Button>
              </Card>
            ))}
          </Grid>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredItems.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </VocabularyContainer>
  );
};

export default VocabularyPage;
