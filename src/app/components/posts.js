import useRequest from "../services";
import Spinner from "../ui/spinner";
const Posts = () => {
  const { data, error, isLoading } = useRequest("/posts");
  if (error) return <p>{error}</p>;
  if (isLoading) return <Spinner />;
  return (
    <div>
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.data.slice(0, 10).map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>
                <button className="btn btn-info">Edit</button>{" "}
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Posts;
