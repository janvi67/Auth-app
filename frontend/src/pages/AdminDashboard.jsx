import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate=useNavigate();
    const handleLogout=()=>{
        navigate("/login")
    }
  return (
    <Container fluid className="bg-light min-vh-100 py-5">
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="display-4">👋 Welcome Admin</h1>
          <p className="lead">Here’s an overview of your dashboard</p>
        </Col>
      </Row>

      <Row className="g-4 justify-content-center">
        <Col md={3}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>📊 Reports</Card.Title>
              <Card.Text>View student performance reports.</Card.Text>
              <Button variant="primary">Go to Reports</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>🎓 Students</Card.Title>
              <Card.Text>Manage student records and profiles.</Card.Text>
              <Button variant="success">View Students</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>💰 Fees</Card.Title>
              <Card.Text>Track and update fee payments.</Card.Text>
              <Button variant="warning">Manage Fees</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5 text-center">
        <Col>
          <Button variant="outline-danger" size="lg" onClick={handleLogout}>
            🔓 Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
