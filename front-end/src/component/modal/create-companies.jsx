import { useState } from "react";
import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";

function ModalCreateCompany({ showCreate, handleCloseCreate }) {

  const [form, setForm] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      let formData = new FormData();
        formData.set("name", form.name);
      const response = await API.post("/createcompanies", formData);

      if (response.status === 200) {
        alert("berhasil");
        setForm({name: ""})
      } else {
        alert("gagal");
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Modal
        show={showCreate}
        onHide={handleCloseCreate}
        centered
        sizes="md"
      >
        <Modal.Header
          closeButton
          className="bg-white"
          style={{ borderBottom: "none" }}
        ></Modal.Header>
        <div className="bg-white text-light">
          <Modal.Body className="modal-login px-5">
            <Form
              className="text-dark"
              onSubmit={(e) => handleSubmit.mutate(e)}
            >
              <Modal.Title
                className="text-center fw-semibold pb-4 fs-1 "
                closebutton
              >
                Create Companies
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
                  className="shadow"
                  style={{ border: "none"}}
                  placeholder="Company Name..."
                  autoFocus
                  required
                />
              </Form.Group>
              <Button type="submit" className="btn-dark mt-3 w-100">
                Create
              </Button>
            </Form>
          </Modal.Body>
        </div>
        <Modal.Footer
          className="bg-white"
          style={{ borderTop: "none" }}
        ></Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateCompany;
