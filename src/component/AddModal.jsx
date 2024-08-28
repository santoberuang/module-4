/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  description: Yup.string()
    .max(40, "Must be 40 characters or less")
    .required("Required"),
});
const ModalNewCategory = ({ onSubmit, open, onClose }) => {
  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={open} onClose={onClose}>
        <Modal.Header>
          <Modal.Title>Tambah Kategori</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Isi untuk Tambah Kategori</p>

          <Formik
            initialValues={{
              name: "",
              description: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div>
                  <Field
                    name="name"
                    placeholder="Nama Kategori"
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      padding: "10px",
                    }}
                  />
                  {errors.name && touched.name && (
                    <div style={{ color: "red" }}>{errors.name}</div>
                  )}
                  {/* {touched.name && error.name && <div>{error.name}</div>} */}
                </div>

                <div>
                  <Field
                    name="description"
                    // type="text"
                    as="textarea"
                    placeholder="Deskripsi Kategori"
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      padding: "10px",
                    }}
                  />
                  {errors.description && touched.description && (
                    <div style={{ color: "red" }}>{errors.name}</div>
                  )}
                  {/* {touched.description && error.description && (
                  <div>{error.description}</div>
                  )} */}
                </div>
                <Button variant="primary" type="submit">
                  Save changes
                </Button>
                <Button variant="danger" onClick={onClose}>
                  Batal
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalNewCategory;
