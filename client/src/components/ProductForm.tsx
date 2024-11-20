import { Button } from "./Button";
import Form from "./Form";

interface ProductFormProps {
  categories: { id: number; name: string }[];
  onSubmit: (data: any) => void;
  productToEdit?: any;
}

const ProductForm = ({
  categories,
  onSubmit,
  productToEdit,
}: ProductFormProps) => {
  const fields = [
    {
      label: "Categoria",
      name: "categoryId",
      type: "select",
      options: categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
      required: true,
    },
    { label: "Nome do Produto", name: "name", required: true },
    { label: "Descrição", name: "description" },
    { label: "Preço", name: "price", type: "number", required: true },
    { label: "URL da Imagem", name: "image", required: true },
    {
      label: "Quantidade em Estoque",
      name: "stockQuantity",
      type: "number",
      required: true,
    },
  ];

  const initialValues = productToEdit || {};

  const handleSubmit = (data: any) => {
    console.log("Produto enviado:", data);
    onSubmit(data);
  };
  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      initialValues={initialValues}
      renderButton={({ isSubmitting }) => (
        <Button
          text={productToEdit ? "Editar produto" : "Adicionar produto"}
          type="submit"
          isLoading={isSubmitting}
        />
      )}
    />
  );
};

export default ProductForm;
