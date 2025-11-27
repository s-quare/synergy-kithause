import { useEffect } from "react";
import { useGlobal } from "../useGlobal";

const OrderHistory = () => {
  const { userData, clearOrderHistory, move, updateUserData, showToast } =
    useGlobal();

  const handleClearHistory = () => {
    confirm("This will erase all order history") && clearOrderHistory();
    showToast("Your order history has been cleared");
  };

  useEffect(() => {
    if (!userData.history?.length) return;

    const updatedHistory = userData.history.map((order) => {
      const orderTime = new Date(order.timeStamp).getTime();
      const now = Date.now();
      const timeDiff = now - orderTime;
      const minutesDiff = timeDiff / (1000 * 60);
      const daysDiff = timeDiff / (1000 * 60 * 24);

      let status = order.status;

      if (daysDiff >= 3) {
        status = "delivered";
      } else if (minutesDiff >= 30) {
        status = "dispatched";
      }

      const estimatedDelivery = new Date(
        orderTime + 3 * 24 * 60 * 1000
      ).toISOString();

      return {
        ...order,
        status,
        estimatedDelivery,
      };
    });
    updateUserData("history", updatedHistory);
  }, []);

  //console.log(userData.history)

  return (
    <div className="OrderHistory bg-white p-4" style={{ minHeight: "40vh" }}>
      <p className="text-center fs-6 mb-1 fw-bold">Order History</p>
      {userData.history?.length > 0 ? (
        <div>
          <button
            className="d-block fw-bold btn bg-transparent text-muted italics f-12 px-4 rounded-0"
            onClick={handleClearHistory}
          >
            Clear history
          </button>

          {userData.history.map((item, index) => (
            <div
              className="bg-white my-4 p-2 shadow cursor"
              style={{ maxWidth: 400 }}
              key={index}
            >
              <span className="f-12 fw-bolder monospace text-muted">
                Order status:
              </span>
              <p className="capitalize mb-2 f-10 fw-bold">{item.status}</p>
              <p className="capitalize f-10 mb-1 text-success fw-bold">
                Estimated date of delivery:{" "}
                {item.estimatedDelivery?.split("T")[0]}
              </p>
              <img
                style={{ height: 40 }}
                src={`/images/${item.cart[0].image_url_base}-model.jpg`}
                alt=""
              />
              <span className="ms-2 f-12 text-secondary italics">
                {item.cart.length} item
                {item.cart.length > 1 ? "s" : ""}
              </span>
              <hr className="mb-2 mt-2" />
              <p className="f-10 monospace mb-0 fw-bold">ORDER NO: #{item.orderId || ' - '}</p>
              <p className="f-12">
                Order placed on{" "}
                <span className="text-muted f-10 italics fw-bold">
                  {new Date(item.timeStamp).toLocaleString()}.
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="d-grid align-items-center text-muted italics fw-bolder f-12 text-center"
          style={{ minHeight: "30vh" }}
        >
          <span>
            Nothing to show.{" "}
            <span onClick={() => move("/collections")} className="ecru cursor">
              Start shopping.
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
