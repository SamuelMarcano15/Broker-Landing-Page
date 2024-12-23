import { useState } from "react";
import TradeIcon from "../icons/TradeIcon";
import OptionsIcon from "../icons/OptionsIcon";
import SupportIcon from "../icons/SupportIcon";
import HistoryTrades from "./panels/HistoryTrades";
const SidebarLeft = () => {
  const [menu, setMenu] = useState({ option: "trades", show: false });
  const openMenuOption = (option: string) => {
    if (option === menu.option) {
      if (!menu.show) {
        setMenu({ ...menu, show: true });
      } else {
        setMenu({ ...menu, show: false });
      }
    }

    if (option !== menu.option) {
      setMenu({ option: option, show: true });
    }
  };
  return (
    <>
      <div
        className={`offcanvas offcanvas-end text-bg-dark ${
          menu.show === true ? "show-offcanvas" : ""
        }`}
        id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
            Trades
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => {
              setMenu({ ...menu, show: false });
            }}
          ></button>
        </div>
        <div className="offcanvas-body">
          {menu.option === "trades" ? <HistoryTrades assets={[]} /> : ""}
        </div>
      </div>

      <div className="d-flex flex-column flex-shrink-0  sidebar-left">
        <div className="text-center d-flex flex-row flex-lg-column">
          <div className="nav-item position-relative d-flex justify-content-center position-relative">
            <button
              onClick={() => {
                openMenuOption("trades");
              }}
              className="d-flex button-sidebar-left border-none flex-column align-items-center btn btn-primary"
            >
              <TradeIcon style={{ width: "24px" }} />
              <span>Trades</span>
            </button>
          </div>
          <div className="nav-item d-flex justify-content-center">
            <button
              onClick={() => {
                openMenuOption("options");
              }}
              className="d-flex button-sidebar-left border-none flex-column align-items-center btn btn-primary"
            >
              <OptionsIcon style={{ width: "24px" }} />
              <span>Opciones</span>
            </button>
          </div>
          <div className="nav-item d-flex justify-content-center">
            <button
              onClick={() => {
                openMenuOption("support");
              }}
              className="d-flex button-sidebar-left border-none flex-column align-items-center btn btn-primary"
            >
              <SupportIcon style={{ width: "24px" }} />
              <span>Soporte</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarLeft;
