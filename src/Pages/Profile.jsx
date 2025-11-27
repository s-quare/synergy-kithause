import { useState } from "react";
import { useGlobal } from "../useGlobal";

const Profile = () => {
  const { userData, clearUserData, clearProductsLocalStorage, updateUserData } = useGlobal();

  const [isDisabled, setDisabled] = useState(true);

  const saveEdit = () => {
    setDisabled((prev) => !prev);
  };

  const canScroll = (something) => {
    const target = document.querySelector(`#${something}`);
    target.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center"
    });
  };

  return (
    <div className="Profile p-4" style={{ minHeight: "40vh" }}>
      <div className="d-flex align-items-center gap-3 fw-bold">
        <span
          className="rounded-pill bg-ecru d-grid text-white fs-3"
          style={{ height: 50, width: 50, placeItems: "center" }}
        >
          {userData?.firstName?.charAt(0).toUpperCase() || "U"}
        </span>
        <span className="text-muted">
          {userData?.firstName?.split(" ")[0] || "Unknown"}{" "}
          {userData?.lastName?.split(" ")[0] || "User"}{" "}
          {userData && (
            <span className="f-10 italics text-secondary monospace fw-bolder">
              <br />
              {userData?.email}
            </span>
          )}{" "}
        </span>
      </div>
      <hr />

      <div
        className="ProfileFlex d-grid gap-5"
        style={{ minHeight: 500, gridTemplateColumns: "auto 1fr" }}
      >
        <div
          className="d-flex flex-column fw-bold gap-5 position-sticky"
          style={{
            maxHeight: "80vh",
            top: 80,
            alignItems: "end",
            justifyContent: "space-evenly",
            fontSize: "14px",
          }}
        >
          <span className="cursor" onClick={() => canScroll("forPersonal")}>
            {" "}
            <span className="canMiss">Personal</span>{" "}
            <i className="fa-solid fa-user"></i>
          </span>
          <span className="cursor" onClick={() => canScroll("forMeasurement")}>
            {" "}
            <span className="canMiss">Measurement</span>{" "}
            <i className="fa-solid fa-ruler"></i>
          </span>
          <span className="cursor" onClick={() => canScroll("forShipping")}>
            {" "}
            <span className="canMiss">Shipping</span>{" "}
            <i className="fa-solid fa-train"></i>
          </span>
        </div>

        <div>
          <div
            style={{ maxWidth: 500 }}
            className="f-14 fw-bold position-relative"
          >
            <button
              className="d-block btn btn-dark py-1 mb-3 ms-auto position-sticky f-10 fw-bold px-4 rounded-5"
              style={{ top: 80, zIndex: 5 }}
              onClick={saveEdit}
            >
              {isDisabled ? "Edit" : "Save"}
            </button>

            <span id="forPersonal">Personal Information</span>
            <label className="">
              First Name:{" "}
              <input
                type="text"
                placeholder="John"
                value={userData.firstName || ""}
                onChange={(e) => updateUserData("firstName", e.target.value)}
                disabled={isDisabled}
              />
            </label>
            <label className="">
              Last Name:{" "}
              <input
                type="text"
                placeholder="Doe"
                value={userData.lastName || ""}
                onChange={(e) => updateUserData("lastName", e.target.value)}
                disabled={isDisabled}
              />
            </label>
            <label className="">
              Email Address:{" "}
              <input
                type="email"
                placeholder="example@gmail.com"
                value={userData.email || ""}
                onChange={(e) => updateUserData("email", e.target.value)}
                style={{ textTransform: "lowercase" }}
                disabled={isDisabled}
              />
            </label>

            <span id="forMeasurement" className="mt-4 d-block">
              Custom Measurement{" "}
            </span>
            <label className="">
              Chest / Bust:{" "}
              <input
                type="number"
                placeholder="Inches"
                value={userData.chestBust || ""}
                onChange={(e) => updateUserData("chestBust", e.target.value)}
                disabled={isDisabled}
              />
            </label>
            <label className="">
              Top Length:{" "}
              <input
                type="number"
                placeholder="Inches"
                value={userData.topLength || ""}
                onChange={(e) => updateUserData("topLength", e.target.value)}
                disabled={isDisabled}
              />
            </label>
            <label className="">
              Pant Length:{" "}
              <input
                type="number"
                placeholder="Inches"
                value={userData.pantLength || ""}
                onChange={(e) => updateUserData("pantLength", e.target.value)}
                disabled={isDisabled}
              />
            </label>
            <label className="">
              Preferred fit:
              <select
                className="ms-3 btn btn-light px-1 text-start py-0 f-12"
                style={{ maxWidth: 150 }}
                value={userData.preferredFit}
                onChange={(e) => updateUserData("preferredFit", e.target.value)}
                disabled={isDisabled}
              >
                <option value="">Select Fitting</option>
                {["fitted", "regular", "loose"].map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <label className="">
              Shoe Size:{" "}
              <input
                type="text"
                placeholder="Add description"
                value={userData.shoeSize || ""}
                onChange={(e) => updateUserData("shoeSize", e.target.value)}
                disabled={isDisabled}
              />
            </label>

            <span id="forShipping" className="mt-4 d-block">
              Shipping Address
            </span>
            <label className="">
              House Address:{" "}
              <input
                type="text"
                placeholder="Home Address"
                value={userData.houseAddress || ""}
                onChange={(e) => updateUserData("houseAddress", e.target.value)}
                disabled={isDisabled}
              />
            </label>
            <label className="">
              City:{" "}
              <input
                type="text"
                placeholder="City"
                value={userData.city || ""}
                onChange={(e) => updateUserData("city", e.target.value)}
                disabled={isDisabled}
              />
            </label>
            <label className="">
              State:{" "}
              <input
                type="text"
                placeholder="State"
                value={userData.state || ""}
                onChange={(e) => updateUserData("state", e.target.value)}
                disabled={isDisabled}
              />
            </label>
            <label className="">
              Postal Code:{" "}
              <input
                type="text"
                placeholder="000 000"
                value={userData.postalCode || ""}
                onChange={(e) => updateUserData("postalCode", e.target.value)}
                disabled={isDisabled}
              />
            </label>
          </div>
        </div>
      </div>

      <hr />
      <br />
      <br />

      <div className="f-12">
        <div>
          <b className="monospace f-14 my-1 ms-2 d-block fw-bolder">About</b>
          This application stores your data locally in your browser for privacy and fast access. All profile information, cart items and preferences are saved locally and no information is collected. <br />
          You have full control over your data. If you need a fresh start or need to troubleshoot issues, you can use these options: 
          <ul>
            <li className="my-2 cursor" onClick={()=> confirm ('This erases all set personal, custom and location information') && clearUserData()}>
              <b className="text-primary">Clear User Data - </b> Reset your profile information
            </li>
            <li className="my-2 cursor" onClick={()=> confirm('This erases saved products and cart selections') && clearProductsLocalStorage()}>
              <b className="text-primary">Clear Products Data - </b> Resets the products catalog
            </li>
          </ul>
          These actions will remove and reset the selected data from your browser storage. Your information is only stored on your device (browser specific) and never shared externally. <br />
          For the best experience, we recommend keeping your data intact, but these tools are available if you need them.
          <br />
          <span className="monospace d-block my-3 fw-bolder f-12">{" - "}Synergy KitHause by Prospa</span>
          <hr />
        </div>

        
      </div>
    </div>
  );
};

export default Profile;
