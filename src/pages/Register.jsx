/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Validation schema with enhanced password validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/\d/, "Password must contain at least one digit")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        values
      );

      if (response.status === 201) {
        // assuming 201 is returned for successful creation
        setSuccess("Registration successful");
        resetForm(); // Reset form fields

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate("/login"); // Navigate to login page
        }, 2000);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error details:", err.response || err.message);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
      setSubmitting(false); // Formik's isSubmitting set to false
    }
  };

  return (
    <div>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
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

            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting || loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={() => navigate("/login")}
            >
              Back
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
