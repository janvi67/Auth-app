import React, { useState } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    orders: 128,
    revenue: 45280,
    products: 42,
    customers: 95,
  });

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <Container className="mt-5 ">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>E-commerce Admin Dashboard</h2>
        <Button variant="outline-danger" onClick={handleLogout}>
          🔓 Logout
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-white bg-primary mb-3">
            <Card.Body>
              <Card.Title>Orders</Card.Title>
              <h3>{stats.orders}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-success mb-3">
            <Card.Body>
              <Card.Title>Revenue</Card.Title>
              <h3>${stats.revenue}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-info mb-3">
            <Card.Body>
              <Card.Title>Products</Card.Title>
              <h3>{stats.products}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-warning mb-3">
            <Card.Body>
              <Card.Title>Customers</Card.Title>
              <h3>{stats.customers}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4>Recent Orders</h4>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>#ORD001</strong>
            </td>
            <td>John Doe</td>
            <td>
              <span className="text-success fw-bold">${250.0}</span>
            </td>
            <td>
              <span className="badge bg-primary">Shipped</span>
            </td>
            <td>2025-05-08</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;
