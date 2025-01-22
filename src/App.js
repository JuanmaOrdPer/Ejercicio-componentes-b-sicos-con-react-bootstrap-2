import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button, Navbar, Nav, NavDropdown, ListGroup } from "react-bootstrap";

const App = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [directores, setDirectores] = useState([]);

  useEffect(() => {
    const fetchPeliculas = async () => {
      const response = await fetch("/peliculas.json");
      const data = await response.json();
      setPeliculas(data);

      const categoriasUnicas = new Set();
      const directoresUnicos = new Set();

      data.forEach((pelicula) => {
        // Manejar categorías como array o string
        const categoria = pelicula.categoria;
        if (Array.isArray(categoria)) {
          categoria.forEach((cat) => categoriasUnicas.add(cat));
        } else {
          categoriasUnicas.add(categoria);
        }

  
        directoresUnicos.add(pelicula.director);
      });

      setCategorias([...categoriasUnicas]);
      setDirectores([...directoresUnicos]);
    };

    fetchPeliculas();
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#">
            <img
              src="logo.jpg"
              alt="Logo"
              style={{ height: "40px", marginRight: "10px" }}
            />
            CARTELERA
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Categorías" id="categorias-dropdown">
                {categorias.map((categoria, index) => (
                  <NavDropdown.Item key={index}>
                    {categoria}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <NavDropdown title="Directores" id="directores-dropdown">
                {directores.map((director, index) => (
                  <NavDropdown.Item key={index}>
                    {director}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        {peliculaSeleccionada && (
          <Row className="mb-4">
            <Col md={8}>
              <img
                src={peliculaSeleccionada.foto}
                alt={peliculaSeleccionada.titulo}
                className="img-fluid rounded"
                style={{ width: "100%" }}
              />
            </Col>
            <Col md={4}>
              <h3>{peliculaSeleccionada.titulo}</h3>
              <ListGroup>
                <ListGroup.Item>
                  <strong>Director:</strong> {peliculaSeleccionada.director}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Actores:</strong> {peliculaSeleccionada.actoresPrincipales.join(", ")}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Sinopsis:</strong> {peliculaSeleccionada.sinopsis}
                </ListGroup.Item>
              </ListGroup>
              <Button className="mt-3" variant="danger" onClick={() => setPeliculaSeleccionada(null)}>
                Cerrar
              </Button>
            </Col>
          </Row>
        )}

        <Row>
          {peliculas.map((pelicula) => (
            <Col xs={12} sm={6} md={4} lg={3} key={pelicula.titulo} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={pelicula.foto}
                  alt={pelicula.titulo}
                />
                <Card.Body>
                  <Card.Title>{pelicula.titulo}</Card.Title>
                  <ListGroup className="mb-4">
                    <ListGroup.Item>
                      <strong>Director:</strong> {pelicula.director}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Actores:</strong> {pelicula.actoresPrincipales.join(", ")}
                    </ListGroup.Item>
                  </ListGroup>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => alert(pelicula.sinopsis)}
                  >
                    Más
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setPeliculaSeleccionada(pelicula)}
                  >
                    Seleccionar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default App;
