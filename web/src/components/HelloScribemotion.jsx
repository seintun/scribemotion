import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosUtils";

const HelloScribeMotion = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/hello-scribemotion/")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Hello, ScribeMotion!</h1>
      <p>Message from API: {message}</p>
    </div>
  );
};

export default HelloScribeMotion;
