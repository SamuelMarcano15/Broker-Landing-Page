import { useEffect, useState } from "react";
import { AssetAdmin } from "../../types";
import "../../assets/styles/components/assets-admin.css";
import CreateAssetModal from "../../components/Admin/assets/CreateAssetModal";
import { listAssetApi } from "../../components/API/AssetApi";
import { toast } from "react-toastify";
const AssetsAdmin = () => {
  const [assets, setAssets] = useState<AssetAdmin[]>([]);

  const [selectedAsset, setSelectedAsset] = useState<AssetAdmin | null>();
  const [show, setShow] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const data: { crypto: string; binary: string; forex: string } = {
    crypto: "Crypto",
    binary: "Binaria",
    forex: "Forex",
};

  const handleClose = () => {
    setShow(false);
    setOnEdit(false);
  };
  const handleShow = () => setShow(true);

  const handleEdit = (asset: AssetAdmin) => {
    setShow(true);
    setOnEdit(true);
    setSelectedAsset(asset);
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  type DataType = {
    crypto: string;
    binary: string;
    forex: string;
};
  const requestAssets = async (offset: number, limit: number) => {
    setLoading(true);
    try {
      const { data, status } = await listAssetApi(offset, limit);
      if (status > 400) {
        setLoading(false);
        return toast.error("No se pudieron encontrar activos");
      }
      setLoading(false);
      setAssets(data.assets);
      console.log(data);
    } catch (e) {
      return toast.error("No se pudieron consultar las transacciones");
    }
  };

  const handleNextPage = () => {
    if (assets.length < limit) {
      return toast.warning("No hay mas transacciones registradas");
    }
    if (assets.length > 9) {
      setOffset((prev) => prev + limit);
    } else {
      toast.warning("No hay mas transacciones registradas");
    }
  };

  const handlePrevPage = () => {
    if (offset <= 0) {
      setOffset(0);
    } else {
      setOffset((prev) => prev - limit);
    }
  };


  useEffect(() => {
    requestAssets(offset, limit);
  }, [offset, limit]);
  return (
    <>
      <CreateAssetModal
        show={show}
        selectedAsset={selectedAsset}
        requestAssets={() => requestAssets(offset, limit)}
        onEdit={onEdit}
        handleClose={handleClose}
      />
        <div className="container container-dashboard-user mt-3  m-auto w-100">
          <div className="row mt-0 content-row p-3">
            <div className=" col-lg-6  align-items-center justify-content-center justify-content-lg-start d-flex">
              {" "}
              <h2 className="text-white text-lg-start title m-0" style={{fontWeight:'600'}}>Administracion de activos</h2>
            </div>
     
            <div className="col-lg-6 d-flex justify-content-lg-end justify-content-center mt-4 mt-lg-0">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleShow();
                }}
              >
                Agregar activo
              </button>
            </div>

            <div className="mt-3">
              <div className="grid-table-admin mt-4">
                <div className="thead-table-admin">
                  <p>Activo</p>
                  <p>Ganancia</p>
                  <p>Tipo</p>
                  <p>Actualizado</p>
                </div>


                <div className="body-admin-table table-assets  mt-2">
                  {assets.map((el, i) => {
                    return (
                      <div
                        className="asset-elm"
                        key={i}
                        onClick={() => handleEdit(el)}
                      >
                        <div className="name item">
                          <label>Activo</label>
                          <p>{el.name}</p>
                        </div>

                        <div className="type item">
                          <label>Tipo</label>
                          <p style={{ textTransform: "capitalize" }}>
                            {data[el.type as keyof typeof data]}
                          </p>
                        </div>

                        <div className="profit item">
                          <label>Ganancia</label>
                          {el.in_custom ? (
                            <p>
                              {Number(el.custom_profit) >= 1
                                ? `${Math.round(
                                    100 * (Number(el.custom_profit) - 1.0)
                                  )}%`
                                : "0%"}
                            </p>
                          ) : (
                            <p>
                              {Number(el.profit) >= 1
                                ? `${Math.round(
                                    100 * (Number(el.profit) - 1.0)
                                  )}%`
                                : "0%"}
                            </p>
                          )}
                        </div>

                        <div className="updated item">
                          <label>Actualizado</label>
                          <p>
                            {new Date(el.updated_at).toLocaleString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: false,
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              className={`d-flex flex-lg-wrap flex-column flex-lg-row mt-3 gap-3 w-100 ${
                offset == 0
                  ? "justify-content-lg-end"
                  : "justify-content-lg-between "
              }`}
            >
              {offset > 1 ? (
                <button
                  className="btn btn-secondary m-auto mt-2 m-lg-0 mt-lg-0"
                  type="button"
                  onClick={() => {
                    handlePrevPage();
                  }}
                >
                  Anterior
                </button>
              ) : (
                ""
              )}
              {assets.length > 9 ? (
                <button
                  className="btn btn-secondary  m-auto mt-2  m-lg-0 mt-lg-0"
                  type="button"
                  onClick={() => {
                    handleNextPage();
                  }}
                >
                  Siguiente
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
    </>
  );
};

export default AssetsAdmin;
