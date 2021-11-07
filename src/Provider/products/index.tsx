import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { api } from "../../Services/api";

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

interface ProductsPros {
  children: ReactNode;
}

interface Products {
  name?: string;
  category?: string;
  image?: string;
  price?: string;
}

interface ProductsState {
  products: Products;
}

interface ProductsContextData {
  products: Products[];
}

const ProductsProvider = ({ children }: ProductsPros) => {
  const [products, setProducts] = useState<Products[]>([]);

  const getProducts = () => {
    api
      .get("/products")
      .then((response) => setProducts(response.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export {};
