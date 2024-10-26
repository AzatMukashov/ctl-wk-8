import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import QuoteList from '../QuoteList/QuoteList.tsx';
import { categories } from '../../categories.ts';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col md={3} className="mb-4">
          <Nav className="flex-column">
            {categories.map(category => (
              <Nav.Item key={category.id}>
                <Nav.Link
                  as={Link}
                  to={category.id === 'all' ? '/' : `/category/${category.id}`}
                >
                  {category.title}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col md={9}>
          <h2 className="mt-0">All</h2>
          <QuoteList/>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;