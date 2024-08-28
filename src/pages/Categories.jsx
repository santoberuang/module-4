/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import CardCategory from "../component/Card";
import ModalNewCategory from "../component/AddModal";
import NavBar from "../component/NavBar";
import ModalEditCategory from "../component/EditModal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const CategoriesPages = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isTambahModalOpen, setIsTambahModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleNewCategory = (category) => {
    axios
      .post("http://localhost:8080/categories", category)
      .then((response) => {
        setCategories([...categories, response.data]);
        setIsTambahModalOpen(false);
      })
      .catch((error) => {
        console.error("Error creating category:", error);
      });
  };

  const handleEditCategory = (category) => {
    if (!category.id) {
      console.error("Category ID is undefined:", category);
      return;
    }

    axios
      .put(`http://localhost:8080/categories/${category.id}`, category)
      .then(() => {
        setCategories(
          categories.map((c) => (c.id === category.id ? category : c))
        );
        setIsEditModalOpen(false);
      })
      .catch((error) => {
        console.error("Error editing category:", error);
      });
  };

  const handleDeleteCategory = (category) => {
    const { id } = category;

    axios
      .delete(`http://localhost:8080/categories/${id}`)
      .then(() => {
        setCategories(categories.filter((category) => category.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div>
      <NavBar style={{ marginBottom: "5rem", padding: "1rem" }} />
      <Button variant="primary" onClick={() => setIsTambahModalOpen(true)}>
        Add
      </Button>{" "}
      <Button variant="primary" onClick={handleLogOut}>
        Log Out
      </Button>{" "}
      {categories.map((category) => (
        <CardCategory
          key={category.id}
          Title={category.name}
          Description={category.description}
          onEdit={() => {
            console.log("Editing category:", category);
            setSelectedCategory(category);
            setIsEditModalOpen(true);
          }}
          onDelete={() => handleDeleteCategory(category)}
        />
      ))}
      <ModalNewCategory
        open={isTambahModalOpen}
        onClose={() => setIsTambahModalOpen(false)}
        onSubmit={handleNewCategory}
      />
      {selectedCategory && (
        <ModalEditCategory
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditCategory}
          initialValues={selectedCategory}
        />
      )}
    </div>
  );
};

export default CategoriesPages;
