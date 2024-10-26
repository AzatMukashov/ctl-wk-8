import { Link, useParams } from 'react-router-dom';
import QuoteList from '../QuoteList/QuoteList.tsx';
import { categories } from '../../categories.ts';
import { Col, Container, Nav, Row } from 'react-bootstrap';

const CategoryQuotes = () => {
  const {category} = useParams<{ category: string }>();
  const firstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);
  return (
    <Container>
      <Row>
        <Col md={3} className="mb-4">
          <Nav className="flex-column">
            {categories.map(cat => (
              <Nav.Item key={cat.id}>
                <Nav.Link
                  as={Link}
                  to={cat.id === 'all' ? '/' : `/category/${cat.id}`}
                >
                  {cat.title}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col md={9}>
          <h1>{firstLetter(category || '')}</h1>
          <QuoteList category={category === 'all' ? '' : category}/>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryQuotes;