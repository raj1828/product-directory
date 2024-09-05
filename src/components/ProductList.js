import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductsSuccess } from '../productSlice';
import ProductFilter from './ProductFilter';
import ProductModal from './ProductModal';
import './ProductList.css';

const ProductList = () => {
       const dispatch = useDispatch();
       const { products, loading, error } = useSelector((state) => state.products);

       const [filteredProducts, setFilteredProducts] = useState(products);
       const [isModalOpen, setIsModalOpen] = useState(false);
       const [editingProduct, setEditingProduct] = useState(null);
       const [selectedProducts, setSelectedProducts] = useState([]);

       useEffect(() => {
              dispatch(fetchProducts());
       }, [dispatch]);

       useEffect(() => {
              setFilteredProducts(products);
       }, [products]);

       const handleFilterChange = (filters) => {
              let filtered = products;

              if (filters.material) {
                     filtered = filtered.filter((product) =>
                            product.name.includes(filters.material)
                     );
              }

              if (filters.grade) {
                     filtered = filtered.filter((product) =>
                            product.name.includes(filters.grade)
                     );
              }

              setFilteredProducts(filtered);
       };

       const handleSelectProduct = (productId) => {
              setSelectedProducts((prevSelected) =>
                     prevSelected.includes(productId)
                            ? prevSelected.filter((id) => id !== productId)
                            : [...prevSelected, productId]
              );
       };

       const handelSelectAll = () => {
              if (selectedProducts.length === filteredProducts.length) {
                     setSelectedProducts([]);
              } else {
                     setSelectedProducts(filteredProducts.map((product) => product.id));
              }
       };

       const handleDeleteProduct = (productId) => {
              const remainingProducts = products.filter((product) => product.id !== productId);
              dispatch(fetchProductsSuccess(remainingProducts));
       };

       const handelBulkDelete = () => {
              const remainingProducts = products.filter(
                     (product) => !selectedProducts.includes(product.id)
              );
              dispatch(fetchProductsSuccess(remainingProducts));
              setSelectedProducts([]);
       };

       const handleSaveProduct = (product) => {
              const updatedProducts = editingProduct
                     ? products.map((p) => (p.id === product.id ? product : p)) // Update existing product
                     : [...products, product]; // Add new product

              dispatch(fetchProductsSuccess(updatedProducts)); // Dispatch the updated products list to Redux store
              setIsModalOpen(false);
              setEditingProduct(null);
       };

       const openAddModal = () => {
              setEditingProduct(null); // Reset for adding new product
              setIsModalOpen(true);
       };

       const openEditModal = (product) => {
              setEditingProduct(product); // Set product for editing
              setIsModalOpen(true);
       };

       if (loading) {
              return <div className="loading">Loading..</div>;
       }
       if (error) {
              return <div className="error">Error: {error}</div>;
       }

       return (
              <div className="container">
                     <h2 className="title">Product List</h2>
                     <ProductFilter onFilterChange={handleFilterChange} />
                     <div className="actions">
                            <button className="add-button" onClick={openAddModal}>Add Product</button>
                            <button className="delete-button" onClick={handelBulkDelete} disabled={!selectedProducts.length}>
                                   Delete Selected
                            </button>
                     </div>

                     <table className="product-table">
                            <thead>
                                   <tr>
                                          <th>
                                                 <input
                                                        type="checkbox"
                                                        onChange={handelSelectAll}
                                                        checked={selectedProducts.length === filteredProducts.length}
                                                 />
                                          </th>
                                          <th>Product Name</th>
                                          <th>Actions</th>
                                          <th>Product Details</th>
                                          <th>Product Price</th>
                                   </tr>
                            </thead>
                            <tbody>
                                   {filteredProducts.map((product) => (
                                          <tr key={product.id}>
                                                 <td>
                                                        <input
                                                               type="checkbox"
                                                               checked={selectedProducts.includes(product.id)}
                                                               onChange={() => handleSelectProduct(product.id)}
                                                        />
                                                 </td>
                                                 <td>{product.name}</td>
                                                 <td>
                                                        <button className="edit-button" onClick={() => openEditModal(product)}>Edit</button>
                                                        <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                                 </td>
                                                 <td>{product.detail}</td>
                                                 <td>{product.price}</td>
                                          </tr>
                                   ))}
                            </tbody>
                     </table>

                     {isModalOpen && (
                            <>
                                   <div className="overlay" onClick={() => setIsModalOpen(false)}></div>
                                   <div className={`modal modal-enter`}>
                                          <ProductModal
                                                 product={editingProduct}
                                                 onSave={handleSaveProduct}
                                          />
                                   </div>
                            </>
                     )}
              </div>
       );
};

export default ProductList;
