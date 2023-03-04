import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import ModalLogin from "./auth/modal_login";
import ModalRegister from "./auth/modal_register";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  // Handle Modal Login
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Handle Modal Register
  const [register, setRegister] = useState(false);
  const handleCloseR = () => setRegister(false);
  const handleShowR = () => setRegister(true);

  //   Get Value IsLogin from Context
  const [state, dispatch] = useContext(UserContext);
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    setInterval(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <>
      <Navbar bg="white" expand="lg" className="py-3 shadow">
        <Container>
          <Navbar.Brand
            href="#home"
            className="fw-semibold shadow px-2 rounded"
          >
            SytemSubscribes
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto">
              {state.user.role === "admin" ? (
                <>
                  <Link to="/" className="text-decoration-none">
                    <Nav.Link href="#home">Home</Nav.Link>
                  </Link>
                  <Link to="/admin-page" className="text-decoration-none">
                    <Nav.Link href="#home">AdminPage</Nav.Link>
                  </Link>
                </>
              ) : (
                ""
              )}
            </Nav>
            {state.isLogin !== false ? (
              <div>
                {state.user.role === "admin" ? (
                  <>
                    <NavDropdown
                      className="fs-4 text-capitalize"
                      title="admin"
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item onClick={handleLogout}>
                        Log-Out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <NavDropdown
                    className="fs-4 text-capitalize"
                    title={`Welcome, ${state.user.name}`}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item onClick={handleLogout}>
                      Log-Out
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Button className="btn-dark" onClick={handleShow}>
                  Login
                </Button>
                <Button className="btn-dark" onClick={handleShowR}>
                  Register
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Component Modal Login */}
      <ModalLogin show={show} handle={handleClose} />

      {/* Component Modal CreateCompanies */}
      <ModalRegister
        showRegister={register}
        handleCloseRegister={handleCloseR}
      />
    </>
  );
}

export default NavBar;
