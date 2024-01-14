import React from "react";
import NavBar from "./components/NavBar";
import CartWidget from "./components/CartWidget";
import ItemListContainer from "./components/ItemListContainer";

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <div>
      <NavBar />
      <CartWidget />
      <ItemListContainer greeting="¡Bienvenido a CuteCatShop en línea!" />
    </div>
  );
}

// Importa tus async-mocks o funciones que proporcionan datos asincrónicos
import {
  getProductsByCategory,
  getProductById,
  getAllCategories
} from './api/mocks'; // Ajusta las importaciones según tu estructura

// Componente principal de la aplicación
const App = () => {
  // Estado para almacenar productos y categorías
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Carga las categorías al montar la aplicación
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Obtener categorías mediante el async-mock
        const categoriesData = await getAllCategories();
        
        // Actualizar el estado con las categorías obtenidas
        setCategories(categoriesData);
      } catch (error) {
        // Manejar errores y mostrar mensajes en la consola
        console.error('Error al obtener las categorías:', error);
      }
    };

    // Llamar a la función para cargar categorías al montar la aplicación
    fetchCategories();
  }, []);

  // Carga los productos al cambiar de categoría
  const loadProductsByCategory = async (categoryId) => {
    try {
      // Obtener productos por categoría mediante el async-mock
      const productsData = await getProductsByCategory(categoryId);
      
      // Actualizar el estado con los productos obtenidos
      setProducts(productsData);
    } catch (error) {
      // Manejar errores y mostrar mensajes en la consola
      console.error('Error al cargar productos por categoría:', error);
    }
  };

  // Configura las rutas y carga los datos necesarios
  return (
    <Router>
      <div>
        {/* Componente Navbar con navegación */}
        <Navbar categories={categories} />

        {/* Configuración de rutas */}
        <Switch>
          {/* Ruta para la página principal */}
          <Route exact path="/">
            {/* Componente que muestra la lista de productos */}
            <ItemListContainer products={products} />
          </Route>

          {/* Ruta para mostrar productos por categoría */}
          <Route path="/category/:id">
            {/* Componente que muestra la lista de productos con carga dinámica */}
            <ItemListContainer
              products={products}
              loadProducts={loadProductsByCategory}
            />
          </Route>

          {/* Ruta para mostrar detalles de un producto */}
          <Route path="/item/:id">
            {/* Componente que muestra los detalles de un producto */}
            <ItemDetailContainer getProductById={getProductById} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

