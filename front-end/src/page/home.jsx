import { useContext, useEffect, useState } from "react";
import NavBar from "../component/navbar";
import { API } from "../config/api";
import { Button, Card, Container} from "react-bootstrap";
import { useMutation } from "react-query";
import { UserContext } from "../context/UserContext";
import ModalLogin from "../component/auth/modal_login";
import ModalCreateCompany from "../component/modal/create-companies";

function Home() {
  // Handle Modal Login
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Handle Modal Create
  const [showCreate, setShowCreate] = useState(false);
  const handleShowCreate = () => setShowCreate(true);
  const handleCloseCreate = () => setShowCreate(false);

  const [state] = useContext(UserContext);
  const [data, setData] = useState([]);
  async function getdata() {
    const response = await API.get("/companies");
    setData(response.data.data);
  }

  const handleSubmit = useMutation(async (id) => {
    try {
      console.log(id);
      let formData = new FormData();
      formData.set("variant_id", "1");
      formData.set("user_id", state.user.id);
      const response = await API.patch(`/subscribes/${id}`, formData);
      getdata();
      if (response.status === 200) {
        let formData = new FormData();
        formData.set("status", "premium");
        const response = await API.patch(`/subscribes/${id}`, formData);
      }
      alert("Berhasil Subs");
    } catch (error) {
      console.log(error);
    }
  });
  useEffect(() => {
    getdata();
  }, [data]);
  return (
    <>
      <NavBar />
      <Container className="mt-5 d-flex flex-wrap gap-4 justify-content-center">
        {data?.map((item, index) => (
          <Card
            style={{ width: "18rem", border: "none" }}
            className="shadow bg-light"
            key={index}
          >
            <Card.Body>
              <Card.Title className="text-uppercase fw-bold">
                {item?.name}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted text-capitalize fw-semibold">
                {item?.status == "premium" && item?.variant?.id === 1
                  ? "Premium - 60/Days"
                  : "Trial - 30/Days"}
              </Card.Subtitle>
              <Card.Text>
                {item.status !== "trial"
                  ? item.variant.desc
                  : "Subscribe Now, for used Featurs Premium"}
              </Card.Text>
              {state.isLogin ? (
                state.user.role !== "admin" ? (
                  <Button
                    className="w-100 bg-dark"
                    style={{ border: "none" }}
                    onClick={(id) => handleSubmit.mutate(item.id)}
                  >
                    Subscribe
                  </Button>
                ) : (
                  ""
                )
              ) : (
                <Button
                  className="w-100 bg-dark"
                  style={{ border: "none" }}
                  onClick={handleShow}
                >
                  Subscribe
                </Button>
              )}
            </Card.Body>
          </Card>
        ))}
        {state.user.role === "admin" ? (
          <Card
            style={{ width: "18rem" }}
            className="shadow "
            onClick={handleShowCreate}
          >
            <Card.Body style={{cursor: "pointer"}} className=" d-flex flex-column justify-content-center align-items-center">
              <h1 className="text-center bordered rounded-circle">+</h1>
              <h4>Add Companies</h4>
            </Card.Body>
          </Card>
        ) : (
          ""
        )}
      </Container>
      <ModalLogin show={show} handle={handleClose} />
      <ModalCreateCompany
        showCreate={showCreate}
        handleCloseCreate={handleCloseCreate}
      />
    </>
  );
}

export default Home;
