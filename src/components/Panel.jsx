import { useGlobal } from "../useGlobal";

const Panel = () => {
  const { panelVisible, setPanelVisible, move, products } = useGlobal();

  const cartLength = products.filter(item => item.selected).length;

  return (
    <div className="Panel" style={{ position: "sticky", top: 0, zIndex: 90 }}>
      <div style={{ height: 0 }}>
        <div
          style={{ maxHeight: panelVisible ? 1000 : 0, overflowY: "hidden" }}
          className="Panel-holder"
        >
          <button
            className="bg-gunmetal py-1 border-0 dutch d-block rounded my-3 ms-auto me-4"
            onClick={() => setPanelVisible((prev) => !prev)}
          >
            <i
              style={{
                transform: `rotate( ${panelVisible ? "45deg" : "0deg"} )`,
              }}
              className="fa-solid fa-plus text-white"
            ></i>
          </button>

          <div
            className="px-5 pt-2 pb-5 text-center gunmetal fw-bold f-12 d-grid align-items-center"
            style={{ gridTemplateColumns: "repeat(3, 1fr", gap: "20px 0" }}
          >
            <p onClick={() => move("/")}>
              <i className="fa-solid fa-home fs-5"></i>
              <br />
              Home
            </p>
            <p onClick={() => move("/collections")}>
              <i className="fa-solid fa-file fs-5"></i>
              <br />
              Collections
            </p>
            <p onClick={() => move("/profile")}>
              <i className="fa-solid fa-user fs-5"></i>
              <br />
              Profile
            </p>
            <p className="position-relative" onClick={() => move("/cart")}>
              <i className="fa-solid fa-shopping-cart fs-5 "></i>
              <br />
              Cart
              {cartLength > 0 && <button style={{ top: -10, }} className="position-absolute border-0 text-white rounded-pill bg-danger">{cartLength}</button>}
              
            </p>
            <p onClick={() => move("/set-location")}>
              <i className="fa-solid fa-location-dot fs-5"></i>
              <br />
              Address
            </p>
            <p onClick={() => move("/order-history")}>
              <i className="fa-solid fa-home fs-5"></i>
              <br />
              Order History
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
