/* eslint-disable react/prop-types */

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import ModalNewCategory from "./AddModal";

const CardCategory = ({
  Title,
  Description,
  setIsTambahModalOpen,
  setIsEditModalOpen,
  onDelete,
  id,
}) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>{Description}</Card.Text>
        <Button variant="primary" onClick={() => setIsTambahModalOpen(true)}>
          Add
        </Button>{" "}
        <Button variant="primary" onClick={() => setIsEditModalOpen(true)}>
          Edit
        </Button>{" "}
        <Button variant="danger" onClick={() => onDelete(id)}>
          Hapus
        </Button>{" "}
      </Card.Body>
    </Card>
  );
};

export default CardCategory;
