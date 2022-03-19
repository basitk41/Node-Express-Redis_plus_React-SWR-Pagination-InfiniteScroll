import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../ui/spinner";
export default function Test() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const getUsers = (page, pageSize) => {
    setIsLoading(true);
    axios
      .get(`http://localhost:9000/users?page=${page}&pageSize=${pageSize}`)
      .then(
        (res) => (
          setUsers([...users, ...res.data.data]),
          setTotalPages(res.data.totalPages),
          setIsLoading(false)
        )
      );
  };
  useEffect(() => {
    getUsers(page, pageSize);
  }, [page, pageSize]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h1 className="text text-info text-center">Infinite Scroll</h1>
          <select
            className="form-control mb-2"
            style={{ width: "50px" }}
            value={pageSize}
            onChange={(e) => (
              setPageSize(e.target.value), setUsers([]), setPage(1)
            )}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
          {users.length > 0 ? (
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PHONE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.phone_number}</td>
                    <td>
                      <button className="btn btn-info">Edit</button>{" "}
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Spinner />
          )}
        </div>
        <div className="row">
          {users.length > 0 &&
            (isLoading ? (
              <Spinner />
            ) : (
              <button
                className="btn btn-primary m-auto mb-5"
                style={{ width: "150px" }}
                disabled={page === totalPages}
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Load more...
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
