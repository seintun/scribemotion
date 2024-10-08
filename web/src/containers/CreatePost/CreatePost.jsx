import React, { useState, useEffect } from "react";
import { Alert, Container } from "@mui/material";
import { PostForm } from "../../components/PostForm";
import { useAuthContext } from "../../context/AuthContext";
import useApi from "../../hooks/useApi";

const CreatePost = ({
  endpoint = "/post/",
  method,
  postDetails,
  handleDismiss,
  postId = "",
  ...props
}) => {
  const { currentUser } = useAuthContext();
  const { fetchData: createPost } = useApi(endpoint, "post");
  const { fetchData: editPost } = useApi(endpoint, "put");

  const [formData, setFormData] = useState({
    title: "",
    subheader: "",
    text: "",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (method === "put" && postDetails) {
      setFormData({
        title: postDetails.title || "",
        subheader: postDetails.subheader || "",
        text: postDetails.text || "",
      });
    }
  }, [method, postDetails]);

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
      post_id: postId || postDetails?.id,
      username: currentUser,
    };

    try {
      if (method === "post") {
        await createPost(postData);
      } else if (method === "put") {
        await editPost(postData);
      }

      setMessage("Completed successfully!");
      setSuccess(true);

      // Clear the form fields after successful post creation
      setFormData({
        title: "",
        subheader: "",
        text: "",
      });

      // Dismiss the dialog
      handleDismiss();
    } catch (error) {
      setMessage("Please try again.");
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
