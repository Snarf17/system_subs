import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function ModalLogin({ show, handle }) {
  // Navigation
  const navigate = useNavigate();

  // Context
  const [state, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const response = await API.post("/login", form);
      if (response?.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        if (response.data.data.role === "admin") {
          navigate("/admin-page");
        } else {
          navigate("/");
        }
      }
      alert("berhasil");
    } catch (error) {
      console.log(error);
    }
    setInterval(() => {
      navigate(0);
    }, 1000);
  });

  return (
    <>
      <Modal show={show} onHide={handle} centered sizes="md">
        <Modal.Header
          closeButton
          className="bg-white"
          style={{ borderBottom: "none" }}
        ></Modal.Header>
        <Modal.Body className="bg-white text-dark px-5">
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Modal.Title className="text-center text-dark fw-semibold pb-4 fs-1">
              LOGIN
            </Modal.Title>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                value={form.email}
                className="shadow"
                  style={{ border: "none"}}
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                value={form.password}
                className="shadow"
                  style={{ border: "none"}}
                placeholder="**********"
              />
            </Form.Group>
            <Button className="btn-dark w-100 my-2" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer
          className="bg-white"
          style={{ borderTop: "none" }}
        ></Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalLogin;
