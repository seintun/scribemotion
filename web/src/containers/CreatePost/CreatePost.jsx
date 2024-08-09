import React, { useState } from "react";
import { Alert, Container, Typography } from "@mui/material";
import { PostForm } from "../../components/PostForm";
import { useAuthContext } from "../../context/AuthContext";
import useApi from "../../hooks/useApi";

const CreatePost = ({ handleDismiss, ...props }) => {
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

    try {
      await fetchData(postData);

      setMessage("Post created successfully!");

      // Clear the form fields after successful post creation
      setFormData({
        title: "",
        subheader: "",
        text: "",
        avatar: "",
      });

      // Dismiss the dialog
      handleDismiss();
    } catch (error) {
      setMessage("Failed to create post. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <PostForm
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
