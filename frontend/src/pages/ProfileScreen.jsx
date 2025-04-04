import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

const dummyUser = {
  name: 'John Doe',
  email: 'john@example.com',
};

const dummyOrders = [
  {
    _id: '1A2B3C',
    createdAt: '2025-03-30',
    totalPrice: 120.5,
    isPaid: true,
    paidAt: '2025-04-01',
    isDelivered: true,
    deliveredAt: '2025-04-03',
  },
  {
    _id: '2B3C4D',
    createdAt: '2025-03-28',
    totalPrice: 75.0,
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
  },
  {
    _id: '3C4D5E',
    createdAt: '2025-03-25',
    totalPrice: 200.0,
    isPaid: true,
    paidAt: '2025-03-26',
    isDelivered: false,
    deliveredAt: '',
  },
  {
    _id: '4D5E6F',
    createdAt: '2025-03-20',
    totalPrice: 150.75,
    isPaid: true,
    paidAt: '2025-03-21',
    isDelivered: true,
    deliveredAt: '2025-03-23',
  },
];

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setName(dummyUser.name);
    setEmail(dummyUser.email);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      alert('Profile updated successfully!');
      console.log({ name, email, password });
    }
  };

  return (
    <Row className='py-4'>
      <Col md={4}>
        <Card className='shadow-sm'>
          <Card.Body>
            <h3 className='mb-4 text-primary'>User Profile</h3>
            <Form onSubmit={submitHandler}>
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Enter your name'
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='password'>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter new password'
                />
              </Form.Group>

              <Form.Group className='mb-4' controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='Confirm new password'
                />
              </Form.Group>

              <Button type='submit' variant='primary' className='w-100'>
                Update Profile
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Col md={8}>
        <Card className='shadow-sm'>
          <Card.Body>
            <h3 className='mb-4 text-success'>My Orders</h3>
            <Table responsive striped bordered hover className='table-sm'>
              <thead className='table-dark'>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dummyOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt}</td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>
                      {order.isPaid ? (
                        <Badge bg='success'>{order.paidAt}</Badge>
                      ) : (
                        <Badge bg='danger'>Not Paid</Badge>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        <Badge bg='info'>{order.deliveredAt}</Badge>
                      ) : (
                        <Badge bg='warning' text='dark'>
                          Pending
                        </Badge>
                      )}
                    </td>
                    <td>
                      <Button
                        variant='outline-primary'
                        size='sm'
                        onClick={() =>
                          alert(`Viewing details for Order ID: ${order._id}`)
                        }
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
