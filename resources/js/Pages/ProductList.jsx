import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// Componente FilterSidebar para los filtros
function FilterSidebar({
  availableCategories,
  selectedCategories,
  setSelectedCategories,
  availableBrands,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
}) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      {/* Categorías */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Categorías</h3>
        {availableCategories.map((category) => (
          <label key={category} className="block mb-1 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => {
                if (selectedCategories.includes(category)) {
                  setSelectedCategories(selectedCategories.filter((c) => c !== category));
                } else {
                  setSelectedCategories([...selectedCategories, category]);
                }
              }}
              className="mr-2"
            />
            {category}
          </label>
        ))}
      </div>

      {/* Rango de Precio */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Precio</h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-1/2 p-2 border rounded text-sm"
            placeholder="Mínimo"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-1/2 p-2 border rounded text-sm"
            placeholder="Máximo"
          />
        </div>
      </div>

      {/* Marcas */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Marcas</h3>
        {availableBrands.map((brand) => (
          <label key={brand} className="block mb-1 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => {
                if (selectedBrands.includes(brand)) {
                  setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                } else {
                  setSelectedBrands([...selectedBrands, brand]);
                }
              }}
              className="mr-2"
            />
            {brand}
          </label>
        ))}
      </div>

      {/* Calificación */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Calificación</h3>
        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="w-full p-2 border rounded text-sm"
        >
          <option value={0}>Todas las calificaciones</option>
          <option value={4}>4 estrellas y más</option>
          <option value={3}>3 estrellas y más</option>
          <option value={2}>2 estrellas y más</option>
          <option value={1}>1 estrella y más</option>
        </select>
      </div>
    </div>
  );
}

export default function ProductList({ auth }) {
  const [products, setProducts] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    // Simulación de productos ya que no puedo probar la API
    const simulatedProducts = [
      { id: 1, name: 'Proteína Whey', category: 'Proteina', price: 50, brand: 'Optimum Nutrition', rating: 4.5, stock: 20 },
      { id: 2, name: 'Creatina Monohidratada', category: 'Creatina', price: 30, brand: 'MuscleTech', rating: 4.0, stock: 15 },
      { id: 3, name: 'Pre-Entreno C4', category: 'Pre-Entreno', price: 35, brand: 'Cellucor', rating: 4.3, stock: 10 },
      { id: 4, name: 'Multivitamínico', category: 'Vitaminas', price: 20, brand: 'Centrum', rating: 4.2, stock: 25 },
      { id: 5, name: 'Quemador de Grasa', category: 'Quemadores de Grasa', price: 40, brand: 'Hydroxycut', rating: 3.8, stock: 12 },
      { id: 6, name: 'BCAA', category: 'Aminoácidos', price: 25, brand: 'Scivation', rating: 4.1, stock: 18 },
      { id: 7, name: 'Proteína Vegana', category: 'Proteina', price: 45, brand: 'Garden of Life', rating: 4.0, stock: 8 },
      { id: 8, name: 'Omega-3', category: 'Vitaminas', price: 15, brand: 'Nordic Naturals', rating: 4.6, stock: 30 },
    ];
    setProducts(simulatedProducts);

    // Descomenta esto para usar la API real
    /*
    fetch('http://localhost:8000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error al cargar productos:", error));
    */
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const categories = [...new Set(products.map((p) => p.category))];
      const brands = [...new Set(products.map((p) => p.brand))];
      setAvailableCategories(categories);
      setAvailableBrands(brands);
    }
  }, [products]);

  const filteredProducts = products.filter(
    (product) =>
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
      product.rating >= minRating
  );

  return (
    <AuthenticatedLayout user={auth.user}>
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      <div className="flex gap-4">
        <div className="w-1/4">
          <FilterSidebar
            availableCategories={availableCategories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            availableBrands={availableBrands}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minRating={minRating}
            setMinRating={setMinRating}
          />
        </div>
        <div className="w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="border p-4 rounded shadow">
                {/* Imagen comentada como pediste */}
                {/* <img src={`http://localhost:8000/storage/${product.image}`} alt={product.name} className="w-full h-48 object-cover mb-4" /> */}
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{product.description || 'Descripción no disponible'}</p>
                <p className="text-green-600 font-bold">${product.price}</p>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
