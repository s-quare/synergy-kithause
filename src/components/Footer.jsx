import { useEffect, useState } from "react";
import { useGlobal } from "../useGlobal";
import { useScrollReveal } from "../useScrollReveal";

const Footer = () => {
  const { move } = useGlobal();
  
  const [checker, setChecker] = useState(false)
      useEffect(()=>{
        setChecker(true)
      }, [])
      useScrollReveal(checker);

  return (
    <footer className="Footer bg-gunmetal dutch p-4 pb-0">
      <div className="hidden-up slower">
        <p className="f-12 quicksand fw-bold text-center">
          <img src="/images/logo.png" style={{ height: 18 }} /> Synergy KitHause
        </p>
        <p className="fs-6 fw-bold pt-4 pb-1 text-center">
          Discuss Your Vision <br /> With Us.
        </p>
        <button className="rounded-pill mx-auto d-block f-12 border-0 px-4 fw-bold gunmetal py-2 bg-dutch">
          Connect With Us
        </button>
        <div className="fs-6 my-4 ecru d-flex justify-content-center gap-2">
          <i className="fa-brands fa-x"></i>
          <i className="fa-brands fa-linkedin"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-discord"></i>
        </div>
        <button className="bg-transparent text-white border mx-auto d-block rounded-0 my-3 dutch px-4 py-2 f-12 ">
          Subscribe To Our NewsLetter
        </button>
      </div>

      <div
        className="hidden-up slower f-12 px-4 fw-bold"
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-evenly",
          gap: 20,
          color: "gray",
        }}
      >
        <div className="text-end">
          <p className="text-decoration-underline ecru mb-2">Quick Links</p>
          <p className="mb-1" onClick={() => move("/collections")}>
            Collections
          </p>
          <p className="mb-1" onClick={() => move("/profile")}>
            Profile
          </p>
          <p className="mb-1" onClick={() => move("/cart")}>
            Cart
          </p>
          <p className="mb-1">FAQs</p>
          <p className="text-decoration-underline ecru mb-2 mt-3">
            Customer Service
          </p>
          <p className="mb-1">Help Desk</p>
          <p className="mb-1">Order Tracking</p>
          <p className="mb-1">Terms of Service</p>
          <p className="mb-1">Return / Exchange</p>
        </div>
        <div>
          <p className="text-decoration-underline ecru mb-2">Contact</p>
          <p className="mb-1">Email</p>
          <p className="mb-1">Phone</p>
          <p className="mb-1">Stores</p>
          <p className="mb-1">Booking</p>
          <p className="text-decoration-underline ecru mb-2 mt-3">
            Payment Options
          </p>
          <p className="mb-1">Mastercard</p>
          <p className="mb-1">Visa</p>
          <p className="mb-1">Bank Transfer</p>
          <p className="mb-1">PayStack</p>
        </div>
      </div>
      <p
        className="text-center f-12 bg-gunmetal ecru fw-italics fw-bolder mb-3 py-2"
        style={{
          position: "sticky",
          bottom: 0,
          width: "100%",
          fontFamily: "monospace",
        }}
      >
        Synergy KitHause By Prospa
      </p>
    </footer>
  );
};

export default Footer;
