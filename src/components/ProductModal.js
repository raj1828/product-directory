import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductModal.css';


const ProductModal = ({ product = null, onSave }) => {
       const [name, setName] = useState(product ? product.name : '');
       const [detail, setDetail] = useState(product ? product.detail : '');
       const [price, setPrice] = useState(product ? product.price : '');

       const { materials } = useSelector((state) => state.materials);
       const { grades } = useSelector((state) => state.grades);

       const [selectedMaterial, setSelectedMaterial] = useState(product ? product.selectedMaterial : '');
       const [selectedGrade, setSelectedGrade] = useState(product ? product.selectedGrade : '');

       const handleSave = () => {
              const newProduct = {
                     id: product ? product.id : Date.now(),
                     name,
                     detail,
                     price,
                     selectedMaterial,
                     selectedGrade
              };
              onSave(newProduct);
       };

       return (
              <div className="modal-content">
                     <h3 className="modal-title">{product ? 'Edit Product' : 'Add Product'}</h3>
                     <label className="modal-label">
                            Product:
                            <input
                                   className="modal-input"
                                   type='text'
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                            />
                     </label>
                     <label className="modal-label">
                            Detail:
                            <input
                                   className="modal-input"
                                   type='text'
                                   value={detail}
                                   onChange={(e) => setDetail(e.target.value)}
                            />
                     </label>
                     <label className="modal-label">
                            Price:
                            <input
                                   className="modal-input"
                                   type='number'
                                   value={price}
                                   onChange={(e) => setPrice(e.target.value)}
                            />
                     </label>
                     <label className="modal-label">
                            Material:
                            <select
                                   className="modal-select"
                                   value={selectedMaterial}
                                   onChange={(e) => setSelectedMaterial(e.target.value)}
                            >
                                   <option value="">All</option>
                                   {materials.map((material) => (
                                          <option key={material.id} value={material.name}>
                                                 {material.name}
                                          </option>
                                   ))}
                            </select>
                     </label>
                     <label className="modal-label">
                            Grade:
                            <select
                                   className="modal-select"
                                   value={selectedGrade}
                                   onChange={(e) => setSelectedGrade(e.target.value)}
                            >
                                   <option value="">All</option>
                                   {grades.map((grade) => (
                                          <option key={grade.id} value={grade.name}>
                                                 {grade.name}
                                          </option>
                                   ))}
                            </select>
                     </label>

                     <button className="modal-button" onClick={handleSave}>
                            {product ? 'Save Changes' : 'Add Product'}
                     </button>
              </div>
       );
};

export default ProductModal;
