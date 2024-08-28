/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleLogin = async (values) => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: values.email,
        password: values.password,
      });

      const { accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);

      navigate("/categories");
    } catch (error) {
      console.error("Error Brooo:", error);
      alert("Invalid email or password");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <h1>Hi, Welcome! Please Login or Sign Up!</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Field
              name="email"
              type="email"
              placeholder="Enter email"
              as={Form.Control}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger"
            />
            <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Field
              name="password"
              type="password"
              placeholder="Password"
              as={Form.Control}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Submit"}
          </Button>
          <br />
          <p>Don't have an account?</p>
          <Button variant="primary" onClick={handleRegister}>
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
