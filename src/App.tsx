import './App.css'
import { Route, BrowserRouter as Router, Routes, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Home from './components/Home/Home.tsx';
import AddQuote from './components/AddQuote/AddQuote.tsx';
import EditQuote from './components/EditQuote/EditQuote.tsx';
import CategoryQuotes from './components/CategoryQuotes/CategoryQuotes.tsx';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">Quotes central</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                <Nav.Link as={NavLink} to="/add-quote" end>Add quote</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/add-quote" element={<AddQuote/>}/>
            <Route path="/edit-quote/:id" element={<EditQuote/>}/>
            <Route path="/category/:category" element={<CategoryQuotes/>}/>
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App
