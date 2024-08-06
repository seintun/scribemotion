import React, { useState, useEffect } from "react";
import axios from "axios";

const HelloScribeMotion: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/hello-scribemotion/")
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
      <p>API message: {message}</p>
    </div>
  );
};

export default HelloScribeMotion;
