import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchUser = async (username: string) => {
  const response = await fetch(
    `http://localhost:5000/api/user/username/${username}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};

const Info = () => {
  const params = useParams({ strict: false });

  return <div className="main-block info-block"></div>;
};
export default Info;
