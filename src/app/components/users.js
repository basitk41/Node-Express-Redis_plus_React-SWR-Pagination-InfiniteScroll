import React, { useState } from "react";
import useRequest from "../services";
import Spinner from "../ui/spinner";
import Pagination from "../ui/pagination";
const Users = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, error, isLoading } = useRequest(
    `/users?page=${page}&pageSize=${pageSize}`
  );
  if (error) return <p>{error}</p>;
  if (isLoading) return <Spinner />;
  return (
    <div className="row">
      <div className="col-sm-12">
        <h1 className="text text-info text-center">Pagination</h1>
        <select
          className="form-control mb-2"
          style={{ width: "50px" }}
          value={pageSize}
          onChange={(e) => (setPageSize(e.target.value), setPage(1))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
        {data.data.length > 0 ? (
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
              {data.data.map((user) => (
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
        <Pagination
          setPage={setPage}
          totalPages={data.totalPages}
          page={page}
        />
      </div>
    </div>
  );
};
export default Users;
