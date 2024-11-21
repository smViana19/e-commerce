// interface FilterProps {
//   categories: string[];
//   priceRanges: string[];
//   onFilterChange: (filters: { category: string; price: string }) => void;
// }
// const Filter = () => {
//   return (
//     <div className="relative inline-block text-left">
//       <button
//         type="button"
//         // onClick={toggleDropdown}
//         className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
//       >
//         Filtros
//       </button>

//       {/* {isOpen && ( */}
//       <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//         <div className="py-1">
//           {/* Filtro de Categoria */}
//           <div className="px-4 py-2 text-sm font-semibold text-gray-700">
//             Categoria
//           </div>
//           <div className="px-4 py-2">
//             <select
//               // value={selectedCategory}
//               // onChange={(e) => handleCategoryChange(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             >
//               <option value="">Selecione uma categoria</option>
//               {/* {categories.map((category) => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))} */}
//             </select>
//           </div>

//           {/* Filtro de Faixa de Preço */}
//           <div className="px-4 py-2 text-sm font-semibold text-gray-700">
//             Faixa de Preço
//           </div>
//           <div className="px-4 py-2">
//             <select
//               // value={selectedPrice}
//               // onChange={(e) => handlePriceChange(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             >
//               <option value="">Selecione uma faixa de preço</option>
//               {/* {priceRanges.map((priceRange) => (
//                   <option key={priceRange} value={priceRange}>
//                     {priceRange}
//                   </option>
//                 ))} */}
//             </select>
//           </div>
//         </div>
//       </div>
//       {/* )} */}
//     </div>
//   );
// };
// export default Filter;
