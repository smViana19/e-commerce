import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../services/axios";
import { Button } from "../../components/Button";
import Modal from "../../components/Modal";
import ProductForm from "../../components/ProductForm";
import Card from "../../components/Card";
import { IoMdAdd } from "react-icons/io";

interface Product {
  id: string;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  image: string;
}

const Dashboard = () => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const responsep = await axiosInstance.get("/product");
      setProducts(responsep.data);
      console.log("response responsep: ", products);
    };
    const fetchCategories = async () => {
      const response = await axiosInstance.get("/category");
      setCategories(response.data);
      console.log("response categories: ", categories);
    };
    fetchCategories();
    fetchProducts();
  }, []);

  const handleCreateProduct = async (productData: any) => {
    try {
      await axiosInstance.post("/product", productData);
      toast.success("Produto criado com sucesso");
    } catch (error) {
      console.error("erro criar produto: ", error);
      toast.error("Erro ao criar produto");
    }
    setIsProductModalOpen(false);
  };

  const handleEditProduct = async (productData: any) => {
    if (!productToEdit) return;
    try {
      await axiosInstance.put(`/product/${productToEdit.id}`, productData);
      toast.success("Produto atualizado com sucesso");
      setIsProductModalOpen(false);
      setIsEditMode(false);
    } catch (error) {
      console.error("Erro ao editar produto: ", error);
      toast.error("Erro ao editar produto");
    }
  };
  const openEditModal = (product: Product) => {
    setProductToEdit(product);
    setIsEditMode(true);
    setIsProductModalOpen(true);
  };
  const openDeleteModal = (product: Product) => {
    setProductToDelete(product); // Define o produto a ser excluído
    setIsDeleteModalOpen(true); // Abre o modal de confirmação
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await axiosInstance.delete(`/product/${productId}`);
      toast.success("Produto excluído com sucesso");
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Erro ao excluir produto: ", error);
      toast.error("Erro ao excluir produto");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex p-5 justify-end">
        <div>
          <Button
            text="Adicionar Produto"
            onClick={() => {
              setIsProductModalOpen(true);
              setIsEditMode(false);
              setProductToEdit(null);
            }}
            icon={<IoMdAdd />}
          />
        </div>
        <Modal
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          title={isEditMode ? "Editar Produto" : "Adicionar Produto"}
        >
          <ProductForm
            categories={categories}
            onSubmit={isEditMode ? handleEditProduct : handleCreateProduct}
            productToEdit={productToEdit}
          />
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Confirmar Exclusão"
        >
          <p className="my-3">
            Tem certeza de que deseja excluir este produto?
          </p>
          <div className="flex justify-end gap-2">
            <Button
              text="Cancelar"
              onClick={() => setIsDeleteModalOpen(false)}
              variant="outline"
            />
            <Button
              text="Excluir"
              onClick={() => {
                if (productToDelete) {
                  handleDeleteProduct(productToDelete.id);
                  setIsDeleteModalOpen(false);
                }
              }}
              variant="filled"
            />
          </div>
        </Modal>
      </div>
      <div className="flex flex-col min-h-screen">
        <div className="grid gap-6 mt-10 max-w-6xl mx-auto px-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              image={product.image}
              description={product.description}
              isAdmin={true}
              price={product.price}
              title={product.name}
              quantity={product.stockQuantity}
              onEdit={() => openEditModal(product)}
              onDelete={() => openDeleteModal(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
