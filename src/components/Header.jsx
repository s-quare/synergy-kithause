import { useGlobal } from "../useGlobal";

const Header = () => {
    const { panelVisible, setPanelVisible } = useGlobal();
  return (
    <header
      className="d-flex align-items-center justify-content-between px-4 py-3 shadow"
      style={{ backgroundColor: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)', position: "sticky", top: 0, zIndex: 80 }}
    >
      <span className="quicksand fw-bold gunmetal">
        <img src="/images/logo.png" style={{ height: 25 }} /> Synergy
        KitHause
      </span>
      <button className="bg-gunmetal dutch rounded py-1 border-0" onClick={() => setPanelVisible((prev) => !prev)}>
        <i style={{ transform: `rotate( ${panelVisible ? '45deg' : '0deg'} )`}} className="fa-solid fa-plus text-white"></i>
      </button>
    </header>
  );
};

export default Header;
