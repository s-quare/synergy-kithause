import { useState } from "react";
import { useGlobal } from "../useGlobal";

const CheckOut = () => {
  const { products, userData, setUserData, clearProductsAfterCheckout } = useGlobal();

  const cart = products.filter((item) => item.selected);
  const subTotal = cart.reduce(
    (sum, item) => sum + Number(item.quantity) * Number(item.price_naira),
    0
  );
  const discount = 0;
  const tax = Number(subTotal * 0.01);
  const shipping = Number(subTotal * 0.05);
  const sumTotal = Number(subTotal - discount + shipping + tax);

  const [fixedWindow, setFixedWindow] = useState(false);
  const [message, setMessage] = useState("");
  const [cancelButton, setCancelButton] = useState(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const closeActions = (message) => {
    setMessage(message);
    setCancelButton(true);
    document.querySelector("body").style.overflowY = "";
  };

  const startPayment = async () => {
    setCancelButton(false);
    document.querySelector("body").style.overflowY = "hidden";
    setFixedWindow(true);

    setMessage("Please wait");
    await delay(3000);

    setMessage("Validating user data...");
    await delay(3000);

    if (!userData.firstName || !userData.lastName || !userData.email) {
      closeActions(
        "Missing names or contact email. Please update your profile"
      );
      return;
    }

    setMessage("Confirming sizes availability...");
    await delay(3000);

    const customExists = products.some(product => product.sizes?.includes("Custom"))
    if(customExists) {
      if(!userData.chestBust || !userData.topLength || !userData.pantLength || !userData.preferredFit || !userData.shoeSize) {
        closeActions("Custom size information is incomplete or not set. Please update your custom size in profile")
        return;
      }
    }
    

    setMessage("Validating shipping address...");
    await delay(3000);

    if (
      !userData.houseAddress ||
      !userData.city ||
      !userData.state ||
      !userData.postalCode
    ) {
      closeActions("Incomplete shipping address. Please update your profile");
      return;
    }

    //------ omockery
    setMessage("Connecting to payment gateway...");
    await delay(2500);

    setMessage("Processing payment...");
    await delay(4000);

    setMessage("Finalizing");
    await delay(3000);

    // save to history, send history to use data, reset cart etc
    const timeTaken = Date.now();
    const thisOrder = {
      cart: cart,
      userData: userData,
      timeStamp: timeTaken,
      orderId: timeTaken.toString(16),
      status: 'processing',
      totalAmount: sumTotal
    };

    setUserData(prev => {
      const existingHistory = prev.history || [];
      return {
        ...prev,
        history: [thisOrder, ...existingHistory]
      }
    })


    await delay(2000)
    clearProductsAfterCheckout()

    closeActions("Order completed");
    
  };

  return (
    <div className="CheckOut bg-white p-4 f-12">
      <p className="fw-bolder monospace text-center my-2 f-16">
        Secure Checkout
      </p>

      {cart.length > 0 && (
        <>
          <div className="f-10 my-3">
            <p className="fw-bold mb-1">Delivery Information</p>
            <div className="ms-2 mb-1">
              <p className="mb-1">
                <b>Shipping Address: </b> {userData.houseAddress || "Not set"}
              </p>
              <div>
                <b>Contact Details</b>
              </div>
              <ul>
                <li>
                  <b>Name: </b>
                  <span style={{ textTransform: "capitalize" }}>
                    {`${userData?.firstName?.split(" ")[0] || " - "} ${
                      userData?.lastName?.split(" ")[0] || " - "
                    }`}
                  </span>
                </li>
                <li>
                  <b>Email Address: </b>
                  {userData.email || "Not set"}
                </li>
              </ul>
            </div>
          </div>
          <div className="f-10 my-3">
            <p className="fw-bold mb-1">Order Summary</p>

            <div
              className="d-flex gap-3 rounded-3 p-3 pt-1"
              style={{
                overflowX: "scroll",
                scrollbarWidth: "none",
                maxWidth: 600,
                flexDirection: "row",
                scrollSnapType: "x mandatory",
              }}
            >
              {cart.map((item, index) => (
                <div
                  style={{
                    flexShrink: 0,
                    scrollSnapAlign: "center",
                  }}
                  key={index}
                  className="border shadow rounded-2 bg-white p-2"
                >
                  <img
                    src={`/images/${item.image_url_base}-model.jpg`}
                    style={{ height: 20 }}
                    className="me-2 rounded-1"
                  />
                  {item.kit_name} <br />
                  <span className="d-block text-end f-8">
                    x{item.quantity} - ₦
                    {Number(item.price_naira * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="fw-bold p-3" style={{ maxWidth: 400 }}>
              <p
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <span>Total</span>
                <span className="text-end">₦ {subTotal.toLocaleString()}</span>
              </p>

              <p
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <span>Shipping</span>
                <span className="text-end">₦ {shipping.toLocaleString()}</span>
              </p>

              <p
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <span>Discount</span>
                <span className="text-end">₦ {discount.toLocaleString()}</span>
              </p>

              <p
                className="mb-4"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
              >
                <span>Tax</span>
                <span className="text-end">₦ {tax.toLocaleString()}</span>
              </p>
              <hr />

              <p
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <span>Total</span>
                <span className="text-end">₦ {sumTotal.toLocaleString()}</span>
              </p>
            </div>
          </div>{" "}
          {/* order summary */}
          <div>
            <p className="f-10 text-secondary italics ps-4">
              Review your order before proceeding to payment
            </p>
            <button
              onClick={startPayment}
              className="btn btn-dark bg-gunmetal py-1 f-12 px-5 my- rounded-0"
            >
              Proceed
            </button>
          </div>
          {fixedWindow && (
            <div
              className="BadGuy"
              style={{
                backgroundColor: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(2px)",
                height: "100vh",
                width: "100vw",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 200,
                display: "grid",
                placeItems: "center",
                pointerEvents: cancelButton ? "" : "none",
                touchAction: cancelButton ? "" : "none",
              }}
            >
              <div
                className="bg-white rounded-4 f-12 p-3 shadow"
                style={{
                  width: "80%",
                  maxWidth: 600,
                  maxHeight: 400,
                  height: "80%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 25,
                }}
              >
                <span className="text-center">{message}</span>

                {!cancelButton && (
                  <img
                    src="/images/loader.png"
                    className="fa-spin d-block"
                    style={{ width: 30 }}
                    alt=""
                  />
                )}

                {cancelButton && (
                  <button
                    className="btn btn-dark py-1 f-10 fw-bolder px-5 mt-4"
                    onClick={() => setFixedWindow(false)}
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {cart.length === 0 && <div style={{ minHeight: "100vh" }}></div>}
    </div>
  );
};

export default CheckOut;
