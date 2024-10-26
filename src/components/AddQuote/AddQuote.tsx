import { useState } from 'react';
import * as React from 'react';
import axiosAPI from '../../axiosAPI.ts';
import { Button, Container, Form } from 'react-bootstrap';
import { categories } from '../../categories.ts';

const AddQuote = () => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axiosAPI.post('/quotes.json', {author, text, category});
      setAuthor('');
      setText('');
      setCategory('');
    } catch (error) {
      console.error('error adding quote:', error);
    }
  }
  return (
    <Container>
      <h1 className="my-4">Submit new quote</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCategory" className='w-50'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.title}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formAuthor" className="mt-3 w-75">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formText" className="mt-3 w-75">
          <Form.Label>Quote text</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3 mb-4">Add</Button>
      </Form>
    </Container>
  );
};

export default AddQuote;