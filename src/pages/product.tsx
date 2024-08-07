import Category from "../components/Main/Category";
import Header from "../components/Main/Header";
import ProductList from "../components/Product/ProductList";

export default function Product() {
  return (
    <div>
      <div className="sticky top-0 z-40">
        <Header />
        <Category />
      </div>
      <ProductList />
    </div>
  );
}
