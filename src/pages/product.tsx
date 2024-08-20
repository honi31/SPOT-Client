import { Link } from "react-router-dom";
import Category from "../components/Main/Category";
import Header from "../components/Main/Header";
import WriteButton from "../components/Main/WriteButton";
import ProductList from "../components/Product/ProductList";

export default function Product() {
  return (
    <div>
      <div className="sticky top-0 z-40">
        <Header />
        <Category />
      </div>
      <ProductList />
      <Link
        to="/write"
        className="bg-emerald-500 flex items-center justify-center rounded-full size-16 fixed bottom-16 right-8 text-white transition-colors hover:bg-emerald-600"
      >
        <WriteButton />
      </Link>
    </div>
  );
}
