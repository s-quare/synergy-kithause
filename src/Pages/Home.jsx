import { useState, useEffect, useRef } from "react";
import { useGlobal } from "../useGlobal";

import { useScrollReveal } from "../useScrollReveal";

const Home = () => { 
  const { products, move } = useGlobal();

  const brands = ["Capstone", "Link", "Puma", "Vogue", "Timeless", "Synergy"];
  const addBrands = [...brands, ...brands, ...brands, ...brands];
  const doubleBrands = [...addBrands, ...addBrands, ...addBrands, ...addBrands];

  const steps = [
    {
      head: "Browse Our Collections",
      text: "Explore our world of curated kits. From 'The Cornerstone' for commanding the boardroom to 'The Cloud Runner' for your active life, find the vibe that matches your moment.",
    },
    {
      head: "Select Your Kit",
      text: "Each Kithause is a complete head-to-toe look. Every component, from the main pieces to the perfect accessories is meticulously chosen to work in harmony. Just pick your size.",
    },
    {
      head: "Wear with Confidence",
      text: "Your kit arrives ready to wear. No guesswork. No stress. Just effortless style that makes you look and feel impeccable, allowing you to focus on what actually matters.",
    },
  ];
  const parentRef = useRef(null);
  // steps observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.style.transform = entry.isIntersecting
            ? "scale(1.08)"
            : "scale(0.95)";
        });
      },
      {
        root: parentRef.current,
        threshold: 0.6,
      }
    );
    const children = parentRef.current.children;
    Array.from(children).forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  const [checker, setChecker] = useState(false)
    useEffect(()=>{
      setChecker(true)
    }, [])
    useScrollReveal(checker);

  return (
    <div style={{ overflow: "hidden" }}>
      <div
        className="px-4 bg-img"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "end",
          justifyContent: "end",
          flexDirection: "column",
          height: "40vh",
          fontFamily: "monospace",
          minHeight: 400,
          backgroundImage:  
            'linear-gradient(rgba(22, 35, 21, 0.74), rgba(22, 35, 21, 0.74)), url("/images/lady-hat.jpg")',
        }}
      >
        <p
          className="fw-bolder text-end hidden-left slower"
          style={{
            fontSize: 80,
            lineHeight: 0.9,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          #S
          <br />
          YNER
          <br />G
          <span
            style={{
              display: "inline-block",
              color: "burlywood",
              transform: "rotate(10deg) translateY(-7.5px)",
            }}
          >
            Y
          </span>
        </p>

        <p
          style={{ position: "relative", zIndex: 2 }}
          className="text-white fw-bolder fs-6 hidden-up slower"
        >
          KitHause
        </p>

        <div
          style={{
            position: "absolute",
            zIndex: 1,
            bottom: -5,
            left: 0,
            height: 35,
            borderRadius: "0 200px 0 0",
          }}
          className="w-50 bg-dutch"
        ></div>

      </div>

      <div className="px-4 my-3">
        <p style={{top: -15}} className="position-relative slower bg-gunmetal ecru px-2 py-1 d-inline f-10 cursor">
          FASHION
        </p>
        <p className="hidden-left slower mt-2 mb-0 fw-bolder fs-4">
          {" "}
          - a p p a r e l -
        </p>
        <p
          className="hidden-up slower fs-2 fw-bolder my-0"
          style={{ fontFamily: "" }}
        >
          COLLECTIONS
        </p>
        <p
          className="hidden-up slower f-12 fw-bold text-muted"
          style={{ maxWidth: 300 }}
        >
          Synergy Kithause delivers complete outfit kits, designed for your
          life's moments. Stop styling. <br /> Start living.
        </p>
      </div>

      <div
        className="hidden-left slower ps-3 my-4"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 25,
          alignItems: "center",
        }}
      >
        <div className="">
          <p className="fw-bolder mb-2" style={{ fontFamily: "monospace" }}>
            DISCOVER VIBE
          </p>
          <button
            onClick={() => move("/collections")}
            className="fw-bold d-flex mx-auto f-12 rounded-pill px-4 border-0 py-2 ecru bg-gunmetal"
          >
            Shop Now
          </button>
        </div>
        <div
          style={{
            position: "relative",
            height: 180,
            overflowX: "scroll",
            scrollbarWidth: "none",
            display: "flex",
            flexDirection: "rows",
            scrollSnapType: "x mandatory",
            gap: 20,
          }}
          className="pe-3"
        >
          {[5, 12, 2, 14, 17].map((num, index) => (
            <div
              key={num}
              className="bg-img dutch f-12 p-3 rounded-4"
              style={{
                position: "sticky",
                left: index * 5,
                scrollSnapAlign: "center",
                aspectRatio: "1/1",
                backgroundImage: `linear-gradient( rgba(0,0,0,0.6)),url("/images/${
                  products[num - 1]?.image_url_base
                }-model.jpg")`,
              }}
            >
              <p style={{ position: "absolute", bottom: 0 }}>
                {products[num - 1]?.category}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="d-grid gap-4 pt-4"
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          gridTemplateColumns: "2fr 3fr",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/vogue-booth.jpg"
          alt="vogue"
          className="zoom-in slower w-100 mx-auto shadow"
          style={{
            maxWidth: 200,
            border: "7.5px solid dimgray",
            transform: "rotate(2.5deg)",
          }}
        />
        <div className="hidden-left slower py-2 pe-2 gunmetal fw-bold">
          <p className="text-end pe-2 pt-2 f-12 monospace">Beyond Fashion</p>
          <p className="text-center">KitHause Inspiration</p>
          <p className="f-12">
            <span className="text-secondary fw-bold f-12 d-block pb-2">
              More Than a Outfit. <br /> It's a Philosophy.
            </span>
            In a world of endless choice, we offer clarity. Synergy Kithause was
            born from a simple idea: that the perfect outfit is a curated
            experience, where every piece enhances the other. We take the stress
            out of styling by designing complete kits for specific occasions,
            ensuring you always look and feel your best, effortlessly. Our
            collections are thoughtfully assembled, focusing on quality,
            versatility, and the seamless synergy between each component.
          </p>
        </div>
      </div>

      <div
        className="mb-0 py-4 px-5 d-grid gap-3 mx-auto"
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          gridTemplateColumns: "3fr 1fr",
          alignItems: "start",
        }}
      >
        <div
          className="hidden-up slower mx-auto pt-3"
          style={{ maxWidth: 500 }}
        >
          <p
            className="fw-bold text-secondary"
            style={{ fontFamily: "monospace", fontSize: 30 }}
          >
            Fix the 7:00 am Hassle
          </p>
          <p className="f-12">
            We've all been there. Staring into an overflowing closet, feeling
            like you have nothing to wear. The mental load of piecing together
            separates, matching colors, and accessorizing is a daily drain. It's
            decision fatigue at its most sartorial. What if you could reclaim
            that time and energy? What if your wardrobe worked for you, not
            against you?
          </p>
        </div>
        <img
          className="hidden-up slower w-100 pt-3"
          src="/images/clock.gif"
          alt="clock"
        />
      </div>

      <div
        className=""
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          overflowX: "hidden",
        }}
      >
        <div
          className="marquee py-4 px-4 cursor"
          style={{
            position: "relative",
            display: "flex",
            gap: 30,
            animation: "scroll 200s linear infinite",
          }}
        >
          {doubleBrands.map((brand, index) => (
            <img
              className="rounded-3"
              style={{ height: 30 }}
              key={index}
              src={`/images/brands/${brand}.png`}
              alt={brand}
            />
          ))}
        </div>
      </div>

      <div className="text-white bg-gunmetal p-3">
        <h4 className="hidden-up slower text-end mb-0 py-3">
          <b>
            Explore Our{" "}
            <span className="bg-dark rounded-3 px-2 py-1">Worlds</span> of{" "}
            <span className="ecru">Styles</span>.
          </b>
        </h4>
        <p
          className="hidden-up slower f-10 italics fw-bold text-end ms-auto"
          style={{ maxWidth: 350, fontFamily: "cursive" }}
        >
          We don't just sell fits, we curate experiences. Each collection is
          designed around a specific facet of your life. Dive in and find your
          perfect fit.
        </p>
        <div
          className="mx-auto my-5 hidden-right slower "
          style={{
            maxWidth: 600,
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          {products.slice(3, 15).map((item, index) => (
            <div
              className="border hover-dark hover-exp rounded-3 cursor p-2 f-8 bg-img text-end fw-bold d-flex"
              style={{
                alignItems: "end",
                aspectRatio: "3/4",
                flex: "0 0 80px",
                width: 80,
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.85)), url(images/${item.image_url_base}-model.jpg)`,
              }}
              key={index}
            >
              {item?.kit_name}
            </div>
          ))}
          <div className="d-grid">
            <button
              onClick={() => move("/collections")}
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.7)),url(/images/varsity-model.jpg)",
              }}
              className="bg-img hover-exp text-white border-0 rounded-pill fw-bold f-12 px-5 py-2 my-auto"
            >
              Explore Collections
            </button>
          </div>
        </div>
      </div>

      <div className="px-3 py-4 bg-dark text-white">
        <p
          style={{
            lineHeight: 1.8,
            fontSize: "clamp(12px, 3vw, 18px)",
            maxWidth: 600,
          }}
          className="monospace fw-bolder mx-auto p-2"
        >
          Your Style, <br /> Simplified In Three{" "}
          <span className="ecru bg-gunmetal py-1 px-2">Steps</span>..
        </p>

        <div
          ref={parentRef}
          className="StepsFlex hidden-left slower d-flex py-4 mx-auto"
          style={{
            gap: 50,
            maxWidth: 500,
            overflowX: "scroll",
            scrollSnapType: "x mandatory",
          }}
        >
          {steps.map((item, index) => (
            <div
              className="p-3 bg-white text-dark text-center rounded-4"
              style={{ scrollSnapAlign: "center" }}
              key={index}
            >
              <img
                className="w-50 d-block mx-auto"
                src={`/images/step-${index}.png`}
                alt="steps images"
              />
              <p
                className="fw-bold pt-3"
                style={{ fontSize: "clamp(12px, 3vw, 16px)" }}
              >
                {item.head}
              </p>
              <p style={{ fontSize: "clamp(10px, 2vw, 16px)" }}>{item.text}</p>
            </div>
          ))}
        </div>
        <div className="py-3 px-4" style={{ maxWidth: 700 }}>
          <p
            className="hidden-right slower fw-bolder pt-3 ps-3 my-2 fs-3 ecru"
            style={{ fontFamily: "courier" }}
          >
            SYNERGY
          </p>
          <p style={{ fontSize: "clamp(12px, 3vw, 16px)" }}>
            The whole is greater than the sum of its parts. That is the core of
            everything we do. A great blazer is just a blazer. But pair it with
            the perfect shirt, the right tie, and complementary accessories, and
            it becomes a statement. It becomes The Cornerstone. Synergy Kithause
            was founded on the belief that you shouldn't need a personal stylist
            to look your best. We are your stylists. We spend countless hours
            sourcing, designing, and curating every element of your kit to
            ensure a flawless, cohesive look the moment you open the box. We
            believe in quality over quantity, intention over impulse, and the
            powerful confidence that comes from knowing you are perfectly
            dressed for the occasion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
