import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ArrowUpIcon from "../../icons/ArrowUpIcon";
import {
  formatTimestamp,
  formatTime,
  formatTimeLeft,
} from "../../../utils/formatTimeDate";
import { getHistory, updateHistory } from "../../API/TradesApi";
import InfiniteScroll from "react-infinite-scroller";
import { Asset, Marker, StateChart, TradeHistory } from "../../../types";
import { Dispatch } from "redux";
import TradeIcon from "../../icons/TradeIcon";
import { CheckBalance } from "../../API/UserApi";
import ArrowDownIcon from "../../icons/ArrowDownIcon";

type Props = {
  history_trades: TradeHistory[];
  history_trades_client: TradeHistory[];
  addHistory: (...args: any) => void;
  setHistory: (...args: any) => void;
  markersUsers: Marker[];
  setMarkers: (...args: any) => void;
  deleteMark: (id: string) => void;
  timeframe: {
    value: string;
    seconds: number;
  };
  assets: Asset[];
  assetSelected: Asset;
  navigatorId: string;
  updateStatus:(balance_type:number,demo:string,real:string)=>void
  userId: string;
  cleanHistoryClient: () => void;
};

const HistoryTrades = ({
  history_trades,
  setHistory,
  addHistory,
  markersUsers,
  setMarkers,
  assets,
  navigatorId,
  assetSelected,
  timeframe,
  deleteMark,
  cleanHistoryClient,
  history_trades_client,
  userId,
  updateStatus,
}: Props) => {
  const [index, setIndex] = useState(0);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(false);
  const [readyLoadMore, setReadyLoadMore] = useState(false);
  const [inRequest, setInRequest] = useState(false);
  const [showOperationId, setShowOperationId] = useState("");
  const [inCounters, setInCounters] = useState(false);
  const detailOperation = (id: string) => {
    if (showOperationId === id) return setShowOperationId("");
    setShowOperationId(id);
  };

  const requestBalanceActual = async() =>{
  
    const {data,status} = await CheckBalance(userId) 
    if(status >=400){
      return alert("Error al requerir saldo demo")
    }

    console.log(data.user_data)
    updateStatus(data.user_data.account_mode,data.user_data.balance_demo,data.user_data.balance_real)
    
  }

  const requestHistory = async () => {
    cleanHistoryClient();
    if (inRequest) return;
    setInRequest(true);
    const updated = await updateHistory(userId);
    if (updated.status !== 200) {
      setInRequest(false);
      return;
    }
    const { data, status } = await getHistory(userId, `0`, String(limit));
    if (status >= 400) {
      setInRequest(false);
      return;
    }

    //Set the data history
    setHistory(data.trades_list);
    setReadyLoadMore(true);
    setIndex(0);

    data.trades_list.length >= 10 ? setHasMore(true) : setHasMore(false);
    let markers: Marker[] = [];
    if (data.trades_pendings.length > 0) {
      markers = data.trades_pendings.map((el: any) => {
        return {
          ...el,
          timer: el.time_end - el.time_start,
          timestamp: el.time_start,
          close: parseFloat(el.close),
        };
      });
    }
    setInRequest(false);
    setMarkers(markers);
    requestBalanceActual();
  };



  const fetchMoreData = async () => {
    if (!readyLoadMore) return;
    const { data, status } = await getHistory(
      userId,
      `${index + 1}0`,
      String(limit)
    );
    if (status >= 400) {
      return;
    }
    if (data.trades_list.length >= 10) {
      setHasMore(true);
      setReadyLoadMore(true);
    } else {
      setHasMore(false);
      setReadyLoadMore(false);
      return;
    }

    //Set the data history
    data.trades_list.forEach((elm: any) => {
      addHistory(elm);
    });

    setIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    if (assetSelected && !inRequest) {
      requestHistory();
    }
  }, [assetSelected]);

  const [counters, setCounters] = useState<any>({});
  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prevCounters: any) => {
        const newCounters = { ...prevCounters };
        markersUsers.forEach((elm, i) => {

          const remainingTime = Math.round(
            (new Date(elm.time_end).getTime() - new Date().getTime()) / 1000
          );

          if (!newCounters[elm.id] && elm.id) {
            let obj = { time: 0, asset_id: "" };
            obj.time = remainingTime > 0 ? Math.round(remainingTime) : 0;
            obj.time = obj.time;
            obj.asset_id = elm.asset_id;
            newCounters[elm.id] = obj;
          }
        });
        return newCounters;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      setCounters({});
      setInCounters(false);
    };
  }, [markersUsers]);

  useEffect(() => {
    if (markersUsers.length > 0) {
      setInCounters(true);
    }

    console.log("MARKERS", markersUsers);

    if (markersUsers.length === 0 && inCounters) {
      setInCounters(false);
      //requestHistory()
    }
  }, [markersUsers]);

  return (
    <div
      className="d-flex flex-column container-trades-history"
      style={{ overflow: "auto" }}
    >
      <div className="d-flex flex-column gap-2">
        {/*Render trades actives*/}
        {markersUsers.length > 0 ? (
          <div className="d-flex flex-column">
            <h3 className="title-history">Operaciones activas</h3>
            <div className="d-flex flex-column-reverse gap-2">
              {markersUsers.map((elm: Marker, i: number) => {
                const remainingTime =
                  counters[i] !== undefined
                    ? counters[i].time_end
                    : Math.round(
                        (new Date(elm.time_end).getTime() -
                          new Date().getTime()) /
                          1000
                      );
                if (remainingTime <= 0) {
                  return "";
                }
                return (
                  <div
                    className="position-relative d-flex flex-column"
                    style={{ minHeight: "57px" }}
                    key={i}
                  >
                    <div
                      className={`trade-content d-flex flex-nowrap gap-2 position-relative ${
                        !showOperationId ? "hover-trade" : ""
                      }`}
                    >
                      <div className="d-flex asset-img w-auto">
                        <img
                          style={{ width: "24px", height: "24px" }}
                          src={"https://axaforex.com/images/feature/eurusd.svg"}
                          alt={elm.asset.name}
                        />
                      </div>
                      <div
                        style={{ gap: "2px" }}
                        className="d-flex flex-column trade-information"
                      >
                        <p
                          className="asset-name"
                          style={{ textTransform: "uppercase" }}
                        >
                          {elm.asset.name}
                        </p>
                        <div className="d-flex align-items-center gap-1">
                          <p className="trade-expired">
                            {formatTime(elm.created_at)}
                          </p>

                          <ArrowUpIcon
                            style={{
                              width: "18px",
                              height: "18px",
                              fill: `${
                                elm.direction === "up" ? "#50dd68" : "#eb5858"
                              }`,
                              transform: `rotate(${
                                elm.direction === "up" ? "0deg" : "180deg"
                              })`,
                            }}
                          />
                        </div>
                      </div>

                      <div
                        style={{ gap: "2px" }}
                        className="d-flex flex-column justify-content-end"
                      >
                        <p className="amount">
                          {" "}
                          {formatTimeLeft(
                            remainingTime > 0 ? remainingTime : 0
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}

        <h2 className="title-history" style={{ marginBottom: "0px" }}>
          Historial
        </h2>
        {/* Render trades from socket response when end time */}
        <div className="d-flex flex-column-reverse gap-2">
          {history_trades_client.map((elm: TradeHistory, i) => {
            console.log("history_trades_client", history_trades_client);
            return (
              <div
                className="position-relative d-flex flex-column"
                style={{ minHeight: "57px" }}
                key={elm.operation_id}
              >
                <div
                  className={`trade-content d-flex flex-nowrap gap-2 position-relative ${
                    !showOperationId ? "hover-trade" : ""
                  }`}
                  onClick={() => {
                    detailOperation(elm.operation_id);
                  }}
                >
                  <div className="d-flex asset-img w-auto">
                    <img
                      style={{ width: "24px", height: "24px" }}
                      src={"https://axaforex.com/images/feature/eurusd.svg"}
                      alt={elm.asset.name}
                    />
                  </div>
                  <div
                    style={{ gap: "2px" }}
                    className="d-flex flex-column trade-information"
                  >
                    <p
                      className="asset-name"
                      style={{ textTransform: "uppercase" }}
                    >
                      {elm.asset.name || elm.asset_name}
                    </p>
                    <div className="d-flex align-items-center gap-1">
                      <p className="trade-expired">
                        {formatTime(elm.created_at)}
                      </p>

                      <ArrowUpIcon
                        style={{
                          width: "18px",
                          height: "18px",
                          fill: `${
                            elm.direction === "up" ? "#50dd68" : "#eb5858"
                          }`,
                          transform: `rotate(${
                            elm.direction === "up" ? "0deg" : "180deg"
                          })`,
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{ gap: "2px" }}
                    className="d-flex flex-column justify-content-end"
                  >
                    <p
                      className="income"
                      style={{ color: elm.winner ? "#60f388" : "#adadad" }}
                    >
                      ${elm.income}
                    </p>
                    <p className="amount">
                      ${parseFloat(elm.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div
                  key={elm.operation_id + i}
                  className={`trade-detail ${
                    showOperationId === elm.operation_id
                      ? "trade-detail-open"
                      : ""
                  }`}
                >
                  <p>
                    <span className="label">Ingreso</span>{" "}
                    <span>${elm.income}</span>
                  </p>
                  <p>
                    <span className="label">Resultado</span>{" "}
                    <span>{elm.winner ? "Ganancia" : "Cerrada"}</span>
                  </p>
                  <p>
                    <span className="label">Duracion</span>{" "}
                    <span>
                      {formatTimeLeft(
                        (new Date(elm.time_end).getTime() -
                          new Date(elm.time_start).getTime()) /
                          1000
                      )}
                    </span>
                  </p>
                  <p>
                    <span className="label">Monto</span>{" "}
                    <span>${elm.amount}</span>
                  </p>
                  <p>
                    <span className="label">Direccion</span>{" "}
                    <span>{elm.direction === "up" ? "Arriba" : "Abajo"}</span>
                  </p>
                  <p>
                    <span className="label">Apertura</span>{" "}
                    <span>{elm.entry}</span>
                  </p>
                  <p>
                    <span className="label">Cierre</span>{" "}
                    <span>{elm.close}</span>
                  </p>
                  <p>
                    <span className="label">Trade abierto</span>{" "}
                    <span>{formatTime(elm.created_at)}</span>
                  </p>
                  <p>
                    <span className="label">Trade cerrado</span>{" "}
                    <span>{formatTime(elm.closed_at)}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/*Render history trades */}
        {history_trades
          .slice()
          .sort((a, b) => {
            return (
              new Date(a.time_start * 1000).getTime() +
              new Date(b.time_start * 1000).getTime()
            );
          })
          .map((elm: TradeHistory, i) => {
            if(history_trades_client.filter((el)=>el.operation_id === elm.operation_id)[0]){
              return ''
            }
            return (
              <div
                className="position-relative d-flex flex-column"
                style={{ minHeight: "57px" }}
                key={elm.operation_id}
              >
                <div
                  className={`trade-content d-flex flex-nowrap gap-2 position-relative ${
                    !showOperationId ? "hover-trade" : ""
                  }`}
                  onClick={() => {
                    detailOperation(elm.operation_id);
                  }}
                >
                  <div className="d-flex asset-img w-auto">
                    <img
                      style={{ width: "24px", height: "24px" }}
                      src={"https://axaforex.com/images/feature/eurusd.svg"}
                      alt={elm.asset.name}
                    />
                  </div>
                  <div
                    style={{ gap: "2px" }}
                    className="d-flex flex-column trade-information"
                  >
                    <p
                      className="asset-name"
                      style={{ textTransform: "uppercase" }}
                    >
                      {elm.asset.name}
                    </p>
                    <div className="d-flex align-items-center gap-1">
                      <p className="trade-expired">
                        {formatTime(elm.created_at)}
                      </p>

                      <ArrowUpIcon
                        style={{
                          width: "18px",
                          height: "18px",
                          fill: `${
                            elm.direction === "up" ? "#50dd68" : "#eb5858"
                          }`,
                          transform: `rotate(${
                            elm.direction === "up" ? "0deg" : "180deg"
                          })`,
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{ gap: "2px" }}
                    className="d-flex flex-column justify-content-end"
                  >
                    <p
                      className="income"
                      style={{ color: elm.winner ? "#60f388" : "#adadad" }}
                    >
                      ${elm.income}
                    </p>
                    <p className="amount">
                      ${parseFloat(elm.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div
                  key={elm.operation_id + i}
                  className={`trade-detail ${
                    showOperationId === elm.operation_id
                      ? "trade-detail-open"
                      : ""
                  }`}
                >
                  <p>
                    <span className="label">Ingreso</span>{" "}
                    <span>${elm.income}</span>
                  </p>
                  <p>
                    <span className="label">Resultado</span>{" "}
                    <span>{elm.winner ? "Ganancia" : "Cerrada"}</span>
                  </p>
                  <p>
                    <span className="label">Duracion</span>{" "}
                    <span>
                      {formatTimeLeft(
                        (new Date(elm.time_end).getTime() -
                          new Date(elm.time_start).getTime()) /
                          1000
                      )}
                    </span>
                  </p>
                  <p>
                    <span className="label">Monto</span>{" "}
                    <span>${elm.amount}</span>
                  </p>
                  <p>
                    <span className="label">Direccion</span>{" "}
                    <span>{elm.direction === "up" ? "Arriba" : "Abajo"}</span>
                  </p>
                  <p>
                    <span className="label">Apertura</span>{" "}
                    <span>{elm.entry}</span>
                  </p>
                  <p>
                    <span className="label">Cierre</span>{" "}
                    <span>{elm.close}</span>
                  </p>
                  <p>
                    <span className="label">Trade abierto</span>{" "}
                    <span>{formatTime(elm.created_at)}</span>
                  </p>
                  <p>
                    <span className="label">Trade cerrado</span>{" "}
                    <span>{formatTime(elm.closed_at)}</span>
                  </p>
                </div>
              </div>
            );
          })}

        {history_trades.length === 0 &&
        history_trades_client.length === 0 &&
        markersUsers.length === 0 ? (
          <div className="container-trade-empty d-flex flex-column align-items-center justify-content-center gap-2">
            <TradeIcon />
            <p>¡Aqui podras consultar todas tus operaciones realizadas!</p>
            <p>Prueba a relizar tu primera operacion</p>
          </div>
        ) : (
          ""
        )}
        {hasMore ? (
          <button
            className="btn btn-secondary"
            onClick={(e) => {
              fetchMoreData();
            }}
          >
            Cargar mas
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

interface StateTrades extends StateChart {
  history_trades: TradeHistory[];
  markers: Marker[];
  navigatorId: string;
  history_trades_client: TradeHistory[];
  userId: string;
}

const mapStateToProps = (state: StateTrades) => ({
  history_trades: state.history_trades,
  markersUsers: state.markers,
  assetSelected: state.assetSelected,
  navigatorId: state.navigatorId,
  userId: state.userId,
  timeframe: state.timeframe,
  history_trades_client: state.history_trades_client,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setHistory(history: TradeHistory) {
    dispatch({
      type: "SET_HISTORY_TRADES",
      history,
    });
  },

  addHistory(history: TradeHistory[]) {
    dispatch({
      type: "ADD_HISTORY_TRADES",
      history,
    });
  },

  setMarkers(markers_request: Marker[]) {
    dispatch({
      type: "SET_MARKS",
      markers_request,
    });
  },

  deleteMark(id: string) {
    dispatch({
      type: "DELETE_MARK",
      id,
    });
  },

  cleanHistoryClient() {
    dispatch({
      type: "CLEAN_HISTORY_TRADES_CLIENT",
    });
  },


  updateStatus(balance_type:number,demo:string,real:string){
    dispatch({
      type:'UPDATE_STATUS_USER',
      balance_type,
      demo,
      real
    })
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTrades);
