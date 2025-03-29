import React, { useState } from 'react'
import { Navbar, Nav, Container, Form, Button, Modal } from 'react-bootstrap'

export default function Navvv() {
  const [showModal, setShowModal] = useState(false)
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFeedback(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitFeedback = (e) => {
    e.preventDefault()

    // Compose email with feedback details
    const emailSubject = encodeURIComponent("Feedback for lookaround.in")
    const emailBody = encodeURIComponent(
      `Name: ${feedback.name}\n` +
      `Email: ${feedback.email}\n\n` +
      `Message:\n${feedback.message}`
    )

    // Replace with your actual email
    const recipientEmail = "aashishreddy999@gmail.com"

    // Open mail client
    window.location.href = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`

    // Close modal and reset form
    setShowModal(false)
    setFeedback({
      name: '',
      email: '',
      message: ''
    })
  }

  return (
    <>
      <Navbar
        style={{
          backgroundColor: '#00AEEF',
          color: 'white',
        }}
        variant="dark"
        expand="lg"
      >
        <Container>
          <Navbar.Brand href="/" style={{ color: 'white', fontWeight: '700' }}>
            lookaround.in X spacez.co
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => setShowModal(true)}
                style={{
                  color: 'white',
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
              >
                Ping the Dev
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="light">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ping the Developer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitFeedback}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={feedback.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={feedback.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={feedback.message}
                onChange={handleInputChange}
                rows={3}
                placeholder="What would you like to tell the developer?"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send Feedback
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}