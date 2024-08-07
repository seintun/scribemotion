import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import PostPage from "./PostPage";
import axiosInstance from "../../utils/axiosUtils";

const AllPostsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/posts/");
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Paper elevation={3} sx={{ margin: 2, padding: 2 }}>
      {data.map((post, index) => (
        <PostPage key={index} initialPostDetails={post} />
      ))}
    </Paper>
  );
};

export default AllPostsPage;
