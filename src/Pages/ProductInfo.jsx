import { useParams } from "react-router-dom";
import { useGlobal } from "../useGlobal";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useScrollReveal } from "../useScrollReveal";

const ProductInfo = () => {
  const { products, move, moveBack, addRemoveCart, updateTheme, updateSize } =
    useGlobal();
  const { productId } = useParams();

  const currProduct = products.find((item) => item.kit_id === productId);

  const [imageExt, setImageExt] = useState("model");

  const imageSwitch = (ext) => {
    setImageExt(ext);
  };

  const handleThemeSelect = (selectedTheme) => {
    updateTheme(productId, selectedTheme);
  };

  const handleSizeSelect = (selectedSize) => {
    updateSize(productId, selectedSize);
  };

  useScrollReveal;

  return (
    <div className="p-4" style={{ position: "relative", minHeight: "60vh" }}>
      {currProduct ? (
        <>
          <p
            onClick={() => moveBack()}
            className="text-muted fw-bold d-inline-block pb-3 f-10 italics cursor"
          >
            <i className="fa-solid fa-chevron-left f-8"></i> back
          </p>

          <div
            style={{
              maxWidth: 500,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
              gap: 10,
            }}
          >
            <div
              className="bg-img"
              style={{
                transition: "all linear 0.75s",
                backgroundImage: `url('/images/${currProduct?.image_url_base}-${imageExt}.jpg')`,
                gridColumn: "1/3",
                gridRow: "1/3",
                aspectRatio: "1/1",
                border: "7.5px solid white",
                transform: "rotate(1.5deg)",
              }}
            ></div>
            <div
              onClick={() => imageSwitch("model")}
              className="bg-img cursor hover-dark"
              style={{
                backgroundImage: `url('/images/${currProduct?.image_url_base}-model.jpg')`,
                gridColumn: "3/4",
                gridRow: "1/2",
                aspectRatio: "1/1",
              }}
            ></div>
            <div
              onClick={() => imageSwitch("kit")}
              className="bg-img cursor hover-dark"
              style={{
                backgroundImage: `url('/images/${currProduct?.image_url_base}-kit.jpg')`,
                gridColumn: "3/4",
                gridRow: "2/3",
                aspectRatio: "1/1",
                border: "4px solid dimgray",
                transform: "rotate(-2.5deg)",
              }}
            ></div>
          </div>

          <div className="productInfoFlex gap-4">
            <div className="my-5" style={{ flex: "0 0 60%" }}>
              <p className="text-secondary mb-2 f-10 monospace fw-bolder italics ps-2">
                - {currProduct.kit_id}
              </p>
              <p className="ecru fw-bolder fs-4 mb-1 monospace">
                {currProduct.kit_name}
              </p>
              <p className="f-14 fw-bold text-muted mb-1">
                {currProduct.category} - {currProduct.gender}
              </p>
              <div className="my-2 f-12">
                <b className="d-block mb-1 f-14 mt-4">Kit Description</b>
                <ReactMarkdown>{currProduct.kit_description}</ReactMarkdown>
              </div>
              <div className="my-2 f-12">
                <span className="d-block fw-bold f-14">Kit Contents</span>
                <ul className="ps-4">
                  {currProduct.components.map((item) => (
                    <li key={item.comp_id} className="my-2">
                      <b className="d-block">{item.name}</b>
                      {item.comp_description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="my-5" style={{ flex: "0 0 35%" }}>
              <div
                className="bg-white rounded-4 f-14 p-3"
                style={{ maxWidth: 250 }}
              >
                <p className="fw-bold mb-1">
                  Kit Price: ₦{currProduct.price_naira.toLocaleString()}
                </p>
                <p className="fw-bold f-12 my-3">
                  Theme:
                  <select
                    value={currProduct?.selectedTheme || ""}
                    onChange={(e) => handleThemeSelect(e.target.value)}
                    className="d-block mb-1 border btn btn-dark shadow-none f-10 py-1"
                  >
                    {currProduct.theme_colors.map((color, index) => (
                      <option value={color} key={`option-${index}`}>
                        {color}
                      </option>
                    ))}
                  </select>
                </p>
                <p className="fw-bold f-12 mb-1">
                  Size:
                  <select
                    value={currProduct?.selectedSize || ""}
                    onChange={(e) => handleSizeSelect(e.target.value)}
                    className="d-block mb-1 border btn btn-dark shadow-none f-10 py-1"
                  >
                    {currProduct.sizes.map((size, index) => (
                      <option value={size} key={`option-${index}`}>
                        {size}
                      </option>
                    ))}
                  </select>
                </p>
                <p className="f-8 mt-3 text-secondary italics fw-bold">
                  Go to profile to set custom size.
                </p>
                <hr />
                <button
                  className={`d-block mx-auto fw-bold f-10 mt-4 border-0 px-0 py-2 w-75 rounded-5 ${
                    currProduct.selected
                      ? "bg-gunmetal text-white"
                      : "bg-dutch text-dark"
                  }`}
                  onClick={() => addRemoveCart(currProduct.kit_id)}
                >
                  {currProduct.selected ? "Remove Item" : "Add to Cart"}
                  <i className="fa-solid fa-shopping-cart ps-2"></i>
                </button>
                <button
                  onClick={() => move("/cart")}
                  className="d-block mx-auto btn btn-dark fw-bold f-10 mt-4 mb-3 py-2 w-75 rounded-5"
                >
                  Go To Cart
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{ height: "60vh", maxHeight: 500 }}
          className="d-flex flex-column gap-2 justify-content-center align-items-center"
        >
          <p className="text-muted fs-5 fw-bolder">Invalid Product ID</p>
          <p className="text-muted fs-6 fw-bolder">
            Back to{" "}
            <span onClick={() => move("/collections")} className="text-primary">
              Collections
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
