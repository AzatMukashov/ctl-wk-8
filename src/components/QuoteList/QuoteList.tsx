import React, { useEffect, useState } from 'react';
import axiosAPI from '../../axiosAPI.ts';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Quote, QuoteList } from '../../types';
import refactorIcon from '../../assets/refactor.png';
import deleteIcon from '../../assets/delete.png';

const QuoteList: React.FC<QuoteList> = ({category}) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response: { data: Record<string, Omit<Quote, 'id'>> | null } = await axiosAPI.get(
          category ? `/quotes.json?orderBy="category"&equalTo="${category}"` : '/quotes.json'
        );
        const quoteData = response.data;
        const quotesArray: Quote[] = quoteData ? Object.keys(quoteData).map(key => ({...quoteData[key], id: key})) : [];
        setQuotes(quotesArray.reverse());
      } catch (error) {
        console.error('error fetching quotes:', error);
      }
    };
    (async () => {
      await fetchQuotes();
    })();
  }, [category]);
  const handleDelete = async (id: string) => {
    try {
      await axiosAPI.delete(`/quotes/${id}.json`);
      setQuotes(quotes.filter(quote => quote.id !== id));
    } catch (error) {
      console.error('error delete quote:', error);
    }
  };
  return (
    <Container>
      {quotes.length > 0 ? quotes.map(quote => (
        <Card className="mb-4" key={quote.id} style={{position: 'relative'}}>
          <Card.Body>
            <Card.Text>"{quote.text}"</Card.Text>
            <Card.Title>&mdash; {quote.author}</Card.Title>
            <Button variant="danger" onClick={() => handleDelete(quote.id)} style={{
              position: 'absolute',
              top: '8px',
              right: '20px',
              background: 'none',
              border: 'none'
            }}>
              <img src={deleteIcon} alt="Delete" width="29.5px" height="29.5px"/>
            </Button>
            <Link to={`/edit-quote/${quote.id}`}>
              <Button variant="primary" style={{
                position: 'absolute',
                top: '10px',
                right: '60px',
                background: 'none',
                border: 'none'
              }}>
                <img src={refactorIcon} alt="Refactor" width="27.5px" height="27.5px"/>
              </Button>
            </Link>
          </Card.Body>
        </Card>
      )) : <p>no quotes available</p>}
    </Container>
  );
};

export default QuoteList;