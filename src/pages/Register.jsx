/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import RegisterAuth from "../component/RegisterAuth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await RegisterAuth.register(values);
      setSuccess("Registration successful!");
      resetForm();
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <br />
              <Form.Text className="text-muted">
                We will never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting || loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>

            {/* <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div>
              <button type="submit" disabled={isSubmitting || loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </div> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
