import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMaterials } from '../materialSlice';
import { fetchGrades } from '../gradeSlice';
import './ProductFilter.css';


const ProductFilter = ({ onFilterChange }) => {
       const dispatch = useDispatch();
       const { materials } = useSelector((state) => state.materials);
       const { grades } = useSelector((state) => state.grades);

       const [selectedMaterial, setSelectedMaterial] = useState('');
       const [selectedGrade, setSelectedGrade] = useState('');

       useEffect(() => {
              dispatch(fetchMaterials());
              dispatch(fetchGrades());
       }, [dispatch]);

       const handelFilterChange = () => {
              onFilterChange({ materials: selectedMaterial, grades: selectedGrade });
       };

       return (
              <div className="filter-container">
                     <h3 className="filter-title">Filter Product</h3>
                     <label className="filter-label">
                            Material:
                            <select
                                   className="filter-select"
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

                     <label className="filter-label">
                            Grade:
                            <select
                                   className="filter-select"
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
                     <button className="filter-button" onClick={handelFilterChange}>Apply Filter</button>
              </div>
       );
};

export default ProductFilter;
