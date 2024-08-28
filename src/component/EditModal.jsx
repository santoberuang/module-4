/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  description: Yup.string()
    .max(40, "Must be 40 characters or less")
    .required("Required"),
});

const ModalEditCategory = ({ onSubmit, open, onClose }) => {
  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Modal show={open} onClose={onClose}>
            <Modal.Header>
              <Modal.Title>Tambah Kategori</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Isi untuk Tambah Kategori</p>

              <Formik
                initialValues={{
                  title: "",
                  description: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ error, touched }) => (
                  <Form>
                    <div>
                      <Field
                        name="title"
                        placeholder="Nama Kategori"
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                          padding: "10px",
                        }}
                      />
                      {touched.title && error.title && <div>{error.title}</div>}
                    </div>

                    <div>
                      <Field
                        name="description"
                        as="textarea"
                        placeholder="Nama Kategori"
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                          padding: "10px",
                        }}
                      />
                      {touched.description && error.description && (
                        <div>{error.description}</div>
                      )}
                    </div>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Save changes
                    </Button>
                  </Form>
                )}
              </Formik>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="danger" onClick={onClose}>
                Batal
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </Formik>
    </div>
  );
};

export default ModalEditCategory;
