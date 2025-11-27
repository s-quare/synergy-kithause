import { useState } from "react";
import { useGlobal } from "../useGlobal";

const Collections = () => {
  const { products, move, addRemoveCart } = useGlobal();
  const [selectedGender, setSelectedGender] = useState("all");

  const cartLength = products.filter(item => item.selected).length

  const [filterHeight, setFilterHeight] = useState(false);

  //Filter 
  const filteredProducts = products.filter((product) => {
    const productGender = product.gender.toLowerCase();

    switch (selectedGender) {
      case "all":
        return true;
      case "male":
        return productGender === "male" || productGender === "unisex";
      case "female":
        return productGender === "female" || productGender === "unisex";
      case "unisex":
        return productGender === "unisex";
      default:
        return true;
    }
  });

  return (
    <div className="p-4">
      <p className="fw-bolder fs-4 mb-1">Explore Synergy <span className="bg-gunmetal text-white px-2 py-1">Collections.</span></p>
      <p className="fw-bold f-12 text-muted">
        Browse through our complete range of curated styled kits.
      </p>

      <p className="fw-bold f-12 mt-4 text-muted mb-2">
        <span className="f-14 pe-2 text-dark">
          Showing {filteredProducts.length} Kit
          {filteredProducts.length > 1 ? "s" : ""}
        </span>
        Filter by Gender
        <button className="border-0 bg-transparent">
          <i
            className="fa-solid ecru fw-bolder fs-6 fa-chevron-down"
            style={{ transform: `rotate(${filterHeight ? 180 : 0}deg)` }}
            onClick={() => setFilterHeight((prev) => !prev)}
          ></i>
        </button>
      </p>

      <div
        className="f-12 mb-3 text-center"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          maxHeight: filterHeight ? 100 : 0,
          overflow: "hidden",
        }}
      >
        {[
          { value: "all", label: "All Kits" },
          { value: "male", label: "Male Kits" },
          { value: "female", label: "Female Kits" },
          { value: "unisex", label: "Unisex" },
        ].map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name="gender"
              value={option.value}
              checked={selectedGender === option.value}
              onChange={(e) => setSelectedGender(e.target.value)}
            />
            <span></span> <br />
            {option.label}
          </label>
        ))}
      </div>

      <p onClick={()=>move('/cart')} className="f-12 fw-bold gunmetal mb-4 pb-2 italics cursor">Go To Cart {cartLength > 0 ? `(${cartLength})` : ''}</p>

      <div
        className="d-grid mx-auto pb-4 px-3"
        style={{
          maxWidth: 900,
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "20px 7.5%",
          placeItems: "center",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.kit_id}
            className="position-relative hover-light"
            style={{
              filter: "brightness(0.9)",
              minWidth: 150,
              maxWidth: 200,
            }}
          >
            <img
              className="w-100"
              style={{ border: "5px solid white" }}
              src={`images/${product.image_url_base}-model.jpg`}
              alt="Kit Image"
            />
            <div className="p-2 pb-3 f-12 fw-bold bg-white">
              <p className="text-secondary f-8 fw-bolder my-1">
                - {product.gender}
              </p>
              <p className="text-secondary f-8 fw-bolder my-1">
                {product.category}
              </p>
              <p className="gunmetal mb-0">{product.kit_name}</p>
              <div
                className="d-grid gap-1"
                style={{ gridTemplateColumns: "1fr auto" }}
              >
                <button onClick={()=>move(`/product-info/${product.kit_id}`)} className="f-10 bg-white fw-bold p-1 text-dark border mt-2">
                  View Kit <i className="ps-2 fa-solid fa-arrow-right"></i>
                </button>
                <button
                  onClick={() => addRemoveCart(product.kit_id)}
                  className={`f-10 ${
                    product.selected
                      ? "bg-gunmetal text-white"
                      : "bg-dutch text-dark"
                  } p-1  border-0 mt-2`}
                >
                  <i className="fa-solid fa-shopping-cart"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Collections;
