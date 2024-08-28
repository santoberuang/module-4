/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
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

const ModalEditCategory = ({ onSubmit, open, onClose, initialValues }) => {
  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <div>
      <Modal show={open} onHide={onClose}>
        <Modal.Header>
          <Modal.Title>Edit Kategori</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Isi untuk Edit Kategori</p>

          <Formik
            initialValues={initialValues} // Menggunakan initialValues yang diterima dari props
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
                </div>

                <div>
                  <Field
                    name="description"
                    as="textarea"
                    placeholder="Deskripsi Kategori"
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      padding: "10px",
                    }}
                  />
                  {errors.description && touched.description && (
                    <div style={{ color: "red" }}>{errors.description}</div>
                  )}
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

export default ModalEditCategory;
