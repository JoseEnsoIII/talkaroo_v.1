import React, { useState } from 'react';
import styled from 'styled-components';
import { BookOpen } from 'react-feather';
import Pagination from '../Layout_Components/Pagination';

// Data for the grammar topics
const grammarTopics = [
    { title: 'Verb Tenses', description: 'Learn about different verb tenses in English.', content: 'Detailed explanation about verb tenses: present, past, future, etc.' },
    { title: 'Articles', description: 'Understand the use of articles like "a", "an", and "the".', content: 'Detailed explanation about articles: definite and indefinite.' },
    { title: 'Prepositions', description: 'Learn how prepositions are used in sentences.', content: 'Explanation about prepositions: in, on, at, by, etc.' },
    { title: 'Adjectives', description: 'Learn how adjectives describe nouns.', content: 'Explanation about adjectives: how they modify nouns and their position in sentences.' },
    { title: 'Adverbs', description: 'Learn how adverbs modify verbs, adjectives, or other adverbs.', content: 'Detailed explanation about adverbs and their usage in sentences.' },
    { title: 'Pronouns', description: 'Understand how pronouns replace nouns.', content: 'Types of pronouns: personal, possessive, reflexive, demonstrative, etc.' },
    { title: 'Conjunctions', description: 'Learn how conjunctions connect words, phrases, or clauses.', content: 'Types: coordinating, subordinating, and correlative conjunctions.' },
    { title: 'Interjections', description: 'Learn about interjections used in daily speech.', content: 'Examples: Wow! Ouch! Hey! Oh no!' },
    { title: 'Sentence Structure', description: 'Understand the structure of sentences.', content: 'Types: simple, compound, complex, and compound-complex sentences.' },
    { title: 'Punctuation Marks', description: 'Learn the correct use of punctuation.', content: 'Explanation of commas, periods, semicolons, colons, dashes, etc.' },
];

const GrammarPage = () => {
    const [activeTopic, setActiveTopic] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Adjust to control how many topics appear per page

    const toggleTopic = (index) => {
        setActiveTopic(activeTopic === index ? null : index); // Toggle the active topic
    };

    // Paginate topics
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTopics = grammarTopics.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Container>
            <PageHeader>
                <Title>English Grammar Topics</Title>
            </PageHeader>

            <CardList>
                {currentTopics.map((topic, index) => (
                    <Card key={index}>
                        <CardHeader onClick={() => toggleTopic(index)}>
                            <BookOpen size={24} />
                            <CardTitle>{topic.title}</CardTitle>
                        </CardHeader>
                        <CardDescription>{topic.description}</CardDescription>
                        {activeTopic === index && <CardContent>{topic.content}</CardContent>}
                    </Card>
                ))}
            </CardList>

            {/* Pagination Component */}
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(grammarTopics.length / itemsPerPage)}
                onPageChange={setCurrentPage}
            />
        </Container>
    );
};

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
`;

const PageHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3436;
`;

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d3436;
`;

const CardTitle = styled.h2`
  font-size: 1.6rem;
  color: #2d3436;
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  color: #636e72;
  margin-top: 1rem;
`;

const CardContent = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  color: #2d3436;
  line-height: 1.6;
  font-style: italic;
`;

export default GrammarPage;
