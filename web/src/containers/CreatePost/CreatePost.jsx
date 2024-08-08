import React, { useState } from "react";
import { Alert, Container, Typography } from "@mui/material";
import { FormPost } from "../../components/FormPost";
import { useAuthContext } from "../../context/AuthContext";
import useApi from "../../hooks/useApi";

const CreatePost = () => {
  const { currentUser } = useAuthContext();
  const { success, fetchData } = useApi(`/create-post/`, "post");

  const [formData, setFormData] = useState({
    title: "",
    subheader: "",
    text: "",
    avatar: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postData = {
      ...formData,
      username: currentUser,
    };

    await fetchData(postData);

    if (success) {
      setFormData({
        title: "",
        subheader: "",
        text: "",
        avatar: "",
      });
      setMessage("Post created successfully");
    } else {
      setMessage("Failed to create post");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6">Create a New Post</Typography>
      <FormPost
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {message && (
        <Alert severity={success ? "success" : "error"}>{message}</Alert>
      )}
    </Container>
  );
};

export default CreatePost;
