import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridSearchIcon,
  GridFilterInputDate,
} from "@mui/x-data-grid";
import { Chip, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getFormData } from "../../helpers/helpers";
export default function TopUpWallet() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const authToken = userInfo.token;
  const apiHeaders = { headers: { Authorization: `Bearer ${authToken}` } };
  const [tableData, setTableData] = useState([]);
  const [totalStekCoins, setTotalSetkCoins] = useState(0);
  const topupColumns = [
    { field: "member_id", headerName: "Member ID", width: 150 },
    { field: "amount", headerName: "Amount", width: 200 },
    { field: "investment", headerName: "Inexpress wallet", width: 200 },
    { field: "coin_wallet", headerName: "Vibration wallet", width: 200 },
    // { field: "income_wallet", headerName: "Cashoneer wallet", width: 200 },
    { field: "createdAt", headerName: "Topup Date", type: "date", width: 150 },
  ];

  async function topupUrWallet(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    const topupRes = api.post("/createTopup", formData, apiHeaders);

    toast.promise(topupRes, {
      loading: "Topup in progress...",
      success: (data) => {
        getLevelIncome();
        e.target.reset();
        return `Congratulations, topup successful.`;
      },
      error: (err) => {
        return (
          err?.response?.data?.errors ??
          err?.response?.data?.message ??
          err?.message ??
          "OOPs something went wrong."
        );
      },
    });
  }

 

  async function getLevelIncome() {
    api
      .post("getIncomeHistory", {
        member_id: userInfo?.user?.member_id,
        income_type: "ID Activation",
      }, apiHeaders)
      .then((res) => {
        console.log("LevelIncome:: ", res.data.data);
        let tc = 0;
        res.data.data.map((d)=>{
          tc = tc + d.amount;
        })
        setTotalSetkCoins(tc);
        setTableData([...res.data.data]);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, Something went wrong."
        );
      });
  }

 

  useEffect(async () => {
    await getLevelIncome();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Wallet Topup */}
        <div className="col-lg">
          <div className="d-block mb-2">
            <h2 className="h4 my-0">Stake Coins</h2>
          </div>
          <form
            onSubmit={(e) => {
              topupUrWallet(e);
            }}
          >
            <input
              type="hidden"
              name="member_id"
              value={userInfo?.user?.member_id}
            />
            <div class="d-flex align-items-center">
              <div className="mr-2">
                <strong>Topup With : </strong>
              </div>
              <div className="mr-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="coin_ratio"
                    id="exampleRadios1"
                    value="100"
                    checked
                  />
                  <label class="form-check-label m-0" for="exampleRadios1">
                    100% Coins
                  </label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="coin_ratio"
                    id="exampleRadios2"
                    value="50"
                  />
                  <label class="form-check-label m-0" for="exampleRadios2">
                    50% Coins
                  </label>
                </div>
              </div>
            </div>

            <div class="input-group mb-3">
              <input
                type="number"
                name="amount"
                class="form-control"
                placeholder="Topup Amount"
                aria-label="Topup Amount"
                aria-describedby="button-addon2"
                min="0"
                required
              />
              {/* <button
                class="btn btn-outline-secondary"
                type="submit"
                id="button-addon2"
              >
                Topup Wallet
              </button> */}
            </div>

            <div class="input-group mb-3">
              <input
                type="password"
                name="txn_password"
                class="form-control"
                placeholder="Transaction Password"
                aria-label="Transaction Password"
                aria-describedby="button-addon2"
                min="0"
                required
              />
              <button
                class="btn btn-outline-secondary"
                type="submit"
                id="button-addon2"
              >
                Make Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Income History */}
      <div className="my-3">
        <div className="d-block mb-4 mb-md-0 mb-2 d-flex justify-content-between">
          <div><h2 className="h4 my-0">Staking History</h2></div>
          <h2 className="h4 my-0">Total Coins : {totalStekCoins}</h2>
        </div>
        <DataGrid
          //loading={loadingData}
          getRowId={(r) => r._id}
          rows={tableData}
          columns={topupColumns}
          //rowCount={totalUsers}
          pageSize={10}
          //rowsPerPageOptions={[10, 25, 25, 50, 100]}
          //checkboxSelection
          //paginationMode="server"
          //onFilterModelChange={onFilterChange}
          //onPageChange={handlePageChange}
          autoHeight={true}
          className="bg-white"
          //components={{
          //  Toolbar: CustomToolbar,
          //}}
        />
      </div>
    </div>
  );
}
