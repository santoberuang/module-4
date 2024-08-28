/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  // const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  //   const [userName, setUserName] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [rememberMe, setRememberMe] = useState(false);

  //   useEffect(() => {
  //     const rememberedUserName = localStorage.getItem("RememberedUserName");
  //     const rememberedPassword = localStorage.getItem("RememberedPassword");
  //     const rememberedRememberMe = localStorage.getItem("RememberedRememberMe");
  //     if (rememberMeChecked) {
  //       setUserName(rememberedUserName);
  //       setPassword(rememberedPassword);
  //       setRememberMe(rememberedRememberMe === "true");
  //     }
  //   }, []);
  const handleLogin = async (values) => {
    // if (rememberMe) {
    //   localStorage.setItem("RememberedUserName", values.email);
    //   localStorage.setItem("RememberedPassword", values.password);
    //   localStorage.setItem("RememberedRememberMe", rememberMe);
    // } else {
    //   localStorage.removeItem("RememberedUserName");
    //   localStorage.removeItem("RememberedPassword");
    //   localStorage.removeItem("RememberedRememberMe");
    // }

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: values.email,
        password: values.password,
      });

      const accessToken = response.data;

      localStorage.setItem("accessToken", accessToken);

      navigate("/categories");
    } catch (error) {
      console.error("Error Brooo:", error);
      alert("Invalid email or password");
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleRegister = () => {
    <Link to="/register"></Link>;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      <Form>
        <h1>Hi, Welcome! Please Login or Sign Up!</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We will never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <br />
        <p>Don't have an account?</p>
        <Button variant="primary" onClick={handleRegister}>
          Register
        </Button>
      </Form>
    </Formik>
  );
};

export default Login;
