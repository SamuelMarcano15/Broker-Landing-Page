import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import { Asset, StateChart } from "../../types";
import { Dispatch } from "redux";
import SadIcon from "../icons/SadIcon";
type Props = {
  assets: Asset[];
  selectAsset: (arg: Asset) => void;
  removeAsset: (...args: any) => void;
  setAssets:(...args:any)=>void;
  assetSelected:Asset;
};
const OptionsGoals = ({ assets, selectAsset, removeAsset, assetSelected, setAssets }: Props) => {
  const [assetTypeShow, setAssetTypeShow] = useState("binary");
  const [assetsList, setAssetsList] = useState<Asset[]>([]);


  const requestAssets = async (assets_list:Asset[]) => {

    if(assets_list.length === 0) return
    const data = assets_list;
    setAssetsList(data);
    setAssets(data)

    //Set asset by default if not exists
    const isActive = data.filter((el:Asset)=> el.id === assetSelected.id)[0]

    if(!isActive || isActive.status === false){
      const asset_active = data.filter((el:Asset)=>{
        if(el.status){
          return el
        }
      })[0]

     
      selectAsset(asset_active)
    }

  };
  const url = `ws://${location.hostname}:8000/ws/assets/`
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
      // Create a new WebSocket connection
      socketRef.current = new WebSocket(url);

      // Handle incoming messages
      socketRef.current.onmessage = (e:any) => {
         const data = JSON.parse(e.data)
         requestAssets(data.assets)
      };

      // Handle errors
      socketRef.current.onerror = (error:any) => {
          console.error('WebSocket error:', error);
          socketRef.current = null
      };

      // Clean up the WebSocket connection on component unmount
      return () => {
          if (socketRef.current && socketRef.current.readyState === 1) {
              socketRef.current.close();
              socketRef.current = null
          }
      };
  }, []);

  //Fetch assets
  return (
    <div className="container-goals">
      <div className="goals-content position-relative d-flex gap-1">
        <button
          type="button"
          className="btn-assets"
          id="dropdownMenuClickableInsideAsset"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          {assets.map((elm: Asset) => {
            if (elm.active_id === assetSelected.active_id && elm.type === assetSelected.type) {
              const element:any = elm
              return (
                <div key={elm.id} className="d-flex">
                  <div className="d-flex">
                    <img
                      src={`https://axaforex.com/images/feature/${
                        elm.name.toLowerCase().split("-")[0]
                      }.svg`}
                      alt={elm.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://axaforex.com/images/feature/btcusd.svg";
                      }}
                    />
                    <div className="d-flex flex-column align-items-center justify-content-center">
                    {element.in_custom ?  <p>{elm.name} { Number(element.custom_profit) >= 1 ? `${ Math.round(100 * (Number(element.custom_profit) - 1.0))}%` : '0%' }</p> : <p>{elm.name} { Number(elm.profit) >= 1 ? `${ Math.round(100 * (Number(elm.profit) - 1.0))}%` : '0%' }</p>}
                    </div>
                  </div>
                  <div style={{ marginLeft: "15px", marginRight: "4px" }}>
                    <ArrowDownIcon />
                  </div>
                </div>
              );
            }
            return ''
          })}
        </button>
        <div
          className="dropdown-menu dropdown-goals"
          aria-labelledby="dropdownMenuClickableInsideAsset"
        >
          <p className="text-white text-center title-drop d-none">Activos</p>
          <form className="search-field d-none">
            <input type="search" placeholder="Buscar" />
          </form>
          <div className="d-none flex-wrap tab-asset">
            <p>Nombre</p> <p>Beneficio</p>
          </div>
          {/* Assets list */}
          <ul className="nav nav-tabs tabs-goals gap-1">
            <li className="nav-item">
              <button
                className={`nav-link button-tab ${
                  assetTypeShow === "binary" ? "button-tab-active" : ""
                }`}
                onClick={() => {
                  setAssetTypeShow("binary");
                }}
                type="button"
              >
                Binarias
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link button-tab ${
                  assetTypeShow === "forex" ? "button-tab-active" : ""
                }`}
                onClick={() => {
                  setAssetTypeShow("forex");
                }}
                type="button"
              >
                Forex
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link button-tab ${
                  assetTypeShow === "crypto" ? "button-tab-active" : ""
                }`}
                onClick={() => {
                  setAssetTypeShow("crypto");
                }}
                type="button"
              >
                Crypto
              </button>
            </li>
          </ul>
          <div className="d-flex flex-column menu-assets">
            {assetsList.map((elm: Asset) => {
              if (elm.type === assetTypeShow && elm.status) {
                const element:any = elm
                return (
                  <button
                    onClick={() => {
                      selectAsset(elm);
                    }}
                    type="button"
                    className={`d-flex  button-asset align-items-center ${
                      elm.id === assetSelected.id ? "selected-asset" : ""
                    }`}
                    key={elm.id}
                  >
                    <div className="d-flex flex-grow-1  button-name align-items-center gap-1">
                      <img
                        src={`https://axaforex.com/images/feature/${
                          elm.name.toLowerCase().split("-")[0]
                        }.svg`}
                        alt={elm.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://axaforex.com/images/feature/btcusd.svg";
                        }}
                      />
                      <p style={{textTransform:'uppercase'}}>{elm.name}</p>
                    </div>
                    <div className="d-flex button-profit align-items-center">
                      {element.in_custom ?  <p>{ Number(element.custom_profit) >= 1 ? `${ Math.round(100 * (Number(element.custom_profit) - 1.0))}%` : '0%' }</p> : <p>{ elm.profit >= 1 ? `${ Math.round(100 * (elm.profit - 1.0))}%` : '0%' }</p>}
                    </div>
                  </button>
                );
              }
            })}

            {assetsList.filter((elm: Asset) => {
              if (elm.type === assetTypeShow && elm.status) {
                return elm;
              }
            }).length <= 0 ? (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 gap-1" style={{opacity: '0.6'}}>
                <SadIcon style={{width:'76px', height:'76px'}}/>
                <p className="text-white text-center">No se encuentran activos disponibles</p>
                <p className="text-white text-center">Prueba con explorar otro tipo</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

const mapStateToProps = (state: StateChart) => ({
  assets: state.assets,
  assetSelected: state.assetSelected
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectAsset(asset: Asset) {
    dispatch({
      type: "SELECT_ASSET",
      asset,
    });
  },

  setAssets(assets: Asset[]) {
    dispatch({
      type: "SET_ASSETS",
      assets,
    });
  },

  removeAsset(asset: Asset) {
    dispatch({
      type: "DELETE_ASSET",
      asset,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsGoals);
