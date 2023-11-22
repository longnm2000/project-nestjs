import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const NotFoundPage: React.FC = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-center items-center flex-col gap-5">
          <h1 className="text-center text-5xl font-bold">404 NOT FOUND</h1>
          <Link to={"/"}>
            <Button>Home Page</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
