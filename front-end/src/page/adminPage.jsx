import { Container, Table } from "react-bootstrap";
import NavBar from "../component/navbar";
import { useEffect, useState } from "react";
import { API } from "../config/api";

function AdminPage() {
  const [data, setData] = useState([]);
  async function getdata() {
    const response = await API.get("/companies");
    setData(response.data.data);
  }

  useEffect(() => {
    getdata();
  }, [data]);
  return (
    <>
      <NavBar />
      <Container className="mt-5" style={{height:"90vh"}}>
        <h1 className="fs-2 fw-semibold">List History</h1>
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>No</th>
                <th>Nama User</th>
                <th>Name Companies</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => 
                <tr>
                    <td>{index + 1}</td>
                    <td>{item.user.Name}</td>
                    <td>{item.name}</td>
                    <td>{item.status}</td>
                </tr>
            )}
            </tbody>
        </Table>
      </Container>
    </>
  );
}

export default AdminPage;
