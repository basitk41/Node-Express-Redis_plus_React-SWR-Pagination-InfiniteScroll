import React from "react";
import Posts from "./components/posts";
import Scroll from "./components/infiniteScroll";
import Users from "./components/users";
const App = () => {
  return (
    <div className="container">
      <h1 className="text text-info text-center">Node/Redis React/SWR</h1>
      <div className="row">
        <div className="col-md-12">
          <Users />
        </div>
        <div className="col-md-12">
          <Posts />
        </div>
        <div className="col-md-12">
          <Scroll />
        </div>
      </div>
    </div>
  );
};
export default App;
