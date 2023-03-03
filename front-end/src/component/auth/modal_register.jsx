import { useState } from "react";
import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import {  useNavigate } from "react-router-dom";

function ModalRegister({ showRegister, handleCloseRegister }) {   
    const navigate = useNavigate() 
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })
    console.log(form);
     const handleChange = (e) => {
        setForm({
          ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = useMutation( async(e) => {
        try {
            e.preventDefault()
            const response = await API.post('/registration', form)

            if (response.status === 200) {
                setInterval(() =>{
                    navigate(0)
                },1000)
                alert("berhasil")
            }else{
                alert("gagal")
            }
        } catch (error) {
            console.log(error);
        }
    })

    return (
    <>
      <Modal
        show={showRegister}
        onHide={handleCloseRegister}
        centered
        sizes="md"
      >
        <Modal.Header closeButton className="bg-warning" style={{borderBottom:"none"}}></Modal.Header>
        <div className="bg-warning text-light">
          <Modal.Body className="modal-login px-5">
            <Form className="text-dark" onSubmit={(e) => handleSubmit.mutate(e) }>
              <Modal.Title className="text-center fw-semibold pb-4 fs-1 " closebutton>
                Register
              </Modal.Title>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <FormLabel>Name</FormLabel>
                <Form.Control
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                  type="text"
                  style={{ backgrounadColor: "#EEEEEE" }}
                  placeholder="Your Name..."
                  autoFocus
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.Controlform1">
                <FormLabel>Email</FormLabel>
                <Form.Control
                  name="email"
                  onChange={handleChange}
                  value={form.email}
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
                  onChange={handleChange}
                  value={form.password}
                  type="password"
                  style={{ backgroundColor: "#EEEEEE" }}
                  placeholder="*******"
                  required
                />
              </Form.Group>
              <Button type="submit" className="btn-dark w-100">
                Register
              </Button>
              <div className="text-center pt-3">
                {/* <span className=' text-secondary fs-6'>Don't have an account? ? Klik 
                    Here
                    </span> */}
              </div>
            </Form>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default ModalRegister;
