import { Button, Card, Container, Form, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center"style={{height:"100vh"}}>
        <Card className="w-50 shadow-lg px-5 py-4"  style={{border:"none"}}>
          <Card.Body>
            <Card.Title className="text-center fs-1 fw-semibold pb-3">Register</Card.Title>
            <Form className="text-dark">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <FormLabel>Name</FormLabel>
                <Form.Control
                  name="Name"
                  type="text"
                  style={{ backgroundColor: "#EEEEEE" }}
                  placeholder="Your Name..."
                  autoFocus
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.Controlform1">
                <FormLabel>Email</FormLabel>
                <Form.Control
                  name="email"
                  type="email"
                  style={{ backgroundColor: "#EEEEEE" }}
                  placeholder="name@example.com"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.Controlform1">
                <FormLabel>Password</FormLabel>
                <Form.Control
                  name="password"
                  type="password"
                  style={{ backgroundColor: "#EEEEEE" }}
                  placeholder="*******"
                  required
                />
              </Form.Group>
              <Button type="submit" className="btn-dark w-100">
                Register
              </Button>
            </Form>
            <div className="text-center d-flex justify-content-center gap-1 pt-3">
                <span className=' text-secondary fs-6'>if you already have an account? Click 
                </span>
                <Link to="/login" className="text-decoration-none">
                    Login 
                </Link>
              </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
export default Register;
