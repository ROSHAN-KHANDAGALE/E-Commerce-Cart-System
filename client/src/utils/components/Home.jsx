import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../app/Slicers/product.Slice";
import { addToCart } from "../../app/Slicers/cart.Slice";

export default function ProductShowcase() {
  const dispatch = useDispatch();
  const { items: products = [] } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white">
      <div className="container py-5">
        <h2 className="text-center font-weight-bold">
          WELCOME TO PRODUCT MANAGEMENT SYSTEM
        </h2>
        <h3 className="text-center font-weight-bold py-4">Products</h3>
        <div className="row">
          {Array.isArray(products) &&
            products.map((product) => (
              <div
                className="col-md-6 col-lg-4 mb-4"
                key={product.id || product.name}
              >
                <div className="card shadow-sm">
                  <div
                    className="aspect-ratio"
                    style={{ position: "relative", paddingTop: "100%" }}
                  >
                    {product.productPicture && product.productPicture[0] ? (
                      <img
                        alt={product.name}
                        src={`http://localhost:4001/${product.productPicture[0].path.replace(
                          /\\/g,
                          "/"
                        )}`}
                        className="img-fluid"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div className="h-100 bg-secondary d-flex align-items-center justify-content-center">
                        <span className="text-white">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.price} RS</p>
                    <a href="/products" className="btn btn-primary">
                      View Product
                    </a>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn btn-success mt-2"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
