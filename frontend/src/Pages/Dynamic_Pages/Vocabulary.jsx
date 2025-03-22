import React, { useState } from 'react';
import styled from 'styled-components';
import { FiVolume2, FiBookmark, FiCheckCircle } from 'react-icons/fi';
import Pagination from '../Layout_Components/Pagination';

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

const WordHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const Word = styled.h2`
  margin: 0;
  color: #2d3748;
  font-size: 1.5rem;
`;

const vocabularyItems = [
  { id: 1, word: "Common Greetings" },
  { id: 2, word: "Essential Travel Phrases" },
  { id: 3, word: "Restaurant and Food Vocabulary" },
  { id: 4, word: "Directions and Places in the City" },
  { id: 5, word: "Numbers and Counting" },
  { id: 6, word: "Shopping and Money" },
  { id: 7, word: "Weather and Seasons" },
  { id: 8, word: "Emergency and Medical Terms" },
  { id: 9, word: "Basic Conversational Phrases" },
  { id: 10, word: "Work and Office Vocabulary" },
  { id: 11, word: "Transportation Terms" },
  { id: 12, word: "Technology and Internet Vocabulary" }
];

const VocabularyPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredItems = vocabularyItems.filter(item =>
    item.word.toLowerCase().includes(searchQuery.toLowerCase())
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

      <Grid>
        {currentItems.map(item => (
          <Card key={item.id}>
            <WordHeader>
              <Word>{item.word}</Word>
            </WordHeader>
          </Card>
        ))}
      </Grid>

      <Pagination
  currentPage={currentPage}
  totalPages={Math.ceil(filteredItems.length / itemsPerPage)}
  onPageChange={setCurrentPage}
/>

    </VocabularyContainer>
  );
};

export default VocabularyPage;
