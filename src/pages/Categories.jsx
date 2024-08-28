/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import CardCategory from "../component/Card";
import ModalNewCategory from "../component/AddModal";
import NavBar from "../component/NavBar";
import ModalEditCategory from "../component/EditModal";

const CategoriesPages = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isTambahModalOpen, setIsTambahModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  //   const [isDeleteModal, setIsDeleteModal] = useState(false);

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
        console.log("Category deleted successfully with ID: $(id)");

        // setCategories(updatedCategories);
        //   setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  return (
    <div>
      <NavBar style={{ marginBottom: "5rem", padding: "1rem" }} />

      {categories.map((category) => (
        <CardCategory
          key={category.id}
          Title={category.name}
          Description={category.description}
          //   onAdd={() => handleNewCategory(category)}
          onDelete={() => handleDeleteCategory(category)}
        />
      ))}

      <ModalNewCategory
        open={isTambahModalOpen}
        onClose={() => setIsTambahModalOpen(false)}
        onSubmit={handleNewCategory}
      />

      <ModalEditCategory
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditCategory}
      />
    </div>
  );
};

export default CategoriesPages;
