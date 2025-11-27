import { useEffect, useState } from "react";
import { useGlobal } from "../useGlobal";
import { useScrollReveal } from "../useScrollReveal";

const Cart = () => {
  const { products, move, addRemoveCart, updateQuantity, showToast, clearProductsLocalStorage } =
    useGlobal();

  const cart = products.filter((item) => item.selected);
  const subTotal = cart.reduce(
    (sum, item) => sum + Number(item.quantity) * Number(item.price_naira),
    0
  );
  const discount = 0;
  const tax = Number(subTotal * 0.01);
  const shipping = Number(subTotal * 0.05);
  const sumTotal = Number(subTotal - discount + shipping + tax);

  const changeQuantity = (kitId, quantity) => {
    const qty = Number(quantity);
    updateQuantity(kitId, qty);
  };

  const [promoInput, setPromoInput] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

  const checkPromoCode = () => {
    if (promoInput.length === 0) return;
    setPromoLoading(true);
    setTimeout(() => {
      showToast("Invalid Promo Code");
      setPromoLoading(false);
      setPromoInput("");
    }, 1500);
  };

  const [checker, setChecker] = useState(false);
  useEffect(() => {
    setChecker(true);
  }, []);
  useScrollReveal(checker);

  return (
    <div className="Cart" style={{ minHeight: "50vh" }}>
      <div
        style={{
          width: "95%",
          maxWidth: 900,
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
        className="py-4 px-2 mx-auto my-3 rounded-3"
      >
        <p className="monospace mb-4 text-center fw-bolder">
          My Cart <i className="fa-solid fa-store"></i>{" "}
        </p>

        {cart.length === 0 && (
          <div
            className="fw-bolder italics text-secondary f-12"
            style={{ minHeight: "30vh", display: "grid", placeItems: "center" }}
          >
            <span>
              Cart is empty.{" "}
              <span
                className="ecru cursor"
                onClick={() => move("/collections")}
              >
                Start shopping.
              </span>{" "}
            </span>
          </div>
        )}

        {cart.length > 0 && (
          <div className="CartFlex" style={{ gap: "30px" }}>
            <div className="hidden-up slower">
              <p onClick={()=> confirm('This will erase and reset your selections') && clearProductsLocalStorage()} className="f-12 fw-bolder cursor ecru"><i className="fa-solid fa-trash-alt pe-2"></i>Clear cart</p>
              <p className="f-10 text-muted fw-bold">
                Review cart content, edit or remove items.
              </p>
              {cart.map((item, index) => (
                <div
                  key={`cart-map-key-${index}`}
                  className="border rounded-3 shadow my-3 pt-3 px-2 f-12"
                >
                  <div
                    className="d-flex gap-2"
                    style={{ justifyContent: "space-between" }}
                  >
                    <img
                      style={{ height: 40, alignSelf: "center" }}
                      src={`/images/${item.image_url_base}-model.jpg`}
                      alt=""
                    />
                    <div className="f-10 text-muted fw-bolder">
                      <p className="mb-1 fw-bold text-dark">{item.kit_name}</p>
                      {item.selectedSize && `Size - ${item.selectedSize}`}{" "}
                      <br />
                      {item.selectedTheme && item.selectedTheme} <br />
                    </div>
                    <div>
                      <b>Each</b> <br /> ₦ {item.price_naira.toLocaleString()}
                    </div>
                    <div>
                      Quantity <br />
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          changeQuantity(item.kit_id, e.target.value)
                        }
                        className="btn btn-dark py-0 f-10 shadow-none"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option value={num} key={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="d-flex text-muted fw-bold f-8 pb-2 pe-1 align-items-center justify-content-between">
                    <div className="d-flex gap-3 align-items-center">
                      <span className="d-inline-block py-2 ecru">In stock</span>
                      <span
                        className="cursor"
                        onClick={() => move(`/product-info/${item.kit_id}`)}
                      >
                        Edit <i className="fa-solid fa-edit f-8"></i>
                      </span>{" "}
                      <span
                        onClick={() => addRemoveCart(item.kit_id)}
                        className="cursor"
                      >
                        Remove <i className="fa-solid fa-trash f-8"></i>
                      </span>
                    </div>

                    <div className="f-10">
                      Total - ₦{" "}
                      {(
                        item.price_naira * Number(item.quantity)
                      ).toLocaleString()}
                      .00{" "}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden-up slower px-2" style={{ maxWidth: 400 }}>
              <p className="GetThis my-3 py-3"></p>
              <span className="f-12 monospace fw-bolder text-secondary my-2">
                Enter Promo Code
              </span>
              <div
                className="border d-grid border f-14 fw-bold ps-1"
                style={{ gridTemplateColumns: "2fr 1fr" }}
              >
                <input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  style={{ outline: "none" }}
                  className="w-100 py-1 ms-auto border-0"
                  type="text"
                  placeholder="Enter Promo Code"
                />
                <button
                  onClick={checkPromoCode}
                  className="w-100 py-1 rounded-0 btn text-white bg-dark f-12 border-0"
                  disabled={promoLoading || promoInput.length === 0}
                >
                  {promoLoading ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>

              <div
                className="d-grid mt-4 pb-2 f-12 text-muted gap-2 fw-bold px-2"
                style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
              >
                <div>Total</div>
                <div className="text-end">₦ {subTotal.toLocaleString()}</div>
                <div>Shipping Cost</div>
                <div className="text-end">₦ {shipping.toLocaleString()}</div>
                <div>Discount</div>
                <div className="text-end">- ₦ {discount.toLocaleString()}</div>
                <div>Tax</div>
                <div className="text-end">₦ {tax.toLocaleString()}</div>
                <div></div>
                <hr className="mt-1" />
                <div className="text-dark f-14 my-1">Total</div>
                <div className="text-end my-1">
                  ₦ {sumTotal.toLocaleString()}
                </div>
              </div>

              <div
                className="d-grid gap-2 mt-3"
                style={{ gridTemplateColumns: "2fr 3fr" }}
              >
                <button
                  onClick={() =>
                    confirm("Proceed to checkout?") && move("/check-out")
                  }
                  className="btn bg-gunmetal px-0 border-0 f-10 fw-bold text-white w-100"
                >
                  Check Out <i className="fa-solid fa-lock"></i>{" "}
                </button>
                <button
                  onClick={() => move("/collections")}
                  className="btn bg-ecru f-10 border-0 fw-bold w-100 text-white"
                >
                  Continue Shopping <i className="fa-solid fa-shopping-bag"></i>{" "}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
