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

export default function FundTransfer() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const authToken = userInfo.token;
  const apiHeaders = { headers: { Authorization: `Bearer ${authToken}` } };
  const [fundHistory, setFundHistory] = useState([]);

  const fundColumns = [
    { field: "from", headerName: "Transfered From", width: 150 },
    { field: "to", headerName: "Transfered To", width: 200 },
    { field: "amount", headerName: "Amount", width: 200 },
    {
      field: "createdAt",
      headerName: "Transfer Date",
      type: "date",
      width: 150,
    },
  ];

  async function transferFund(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    const fundRes = api.post("/fundTransferUserToUser", formData, apiHeaders);

    toast.promise(fundRes, {
      loading: "Fund transfer in progress...",
      success: (data) => {
        getFundTransferHistory();
        return `Congratulations, you have successfully transfered fund.`;
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

  async function getFundTransferHistory() {
    api
      .post("getFundTransferHistory", {
        from: userInfo?.user?.member_id,
      }, apiHeaders)
      .then((res) => {
        console.log("LevelIncome:: ", res.data.data);
        setFundHistory([...res.data.data]);
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
    await getFundTransferHistory();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        {/* FundTransfer */}
        <div className="col-lg-6">
          <div className="d-block mb-2">
            <h2 className="h4 my-0">Transfer Fund</h2>
          </div>
          <form
            onSubmit={(e) => {
              transferFund(e);
            }}
          >
            <input
              type="hidden"
              name="user_id"
              value={userInfo?.user?.member_id}
            />
            <div className="form-group mb-2">
              <input
                type="text"
                name="downline_id"
                class="form-control"
                placeholder="Member ID"
                aria-label="Member ID"
                aria-describedby="fund_transfer"
                required
              />
            </div>

            <div class="input-group mb-3">
              <input
                type="number"
                name="amount"
                class="form-control"
                placeholder="Fund Amount"
                aria-label="Fund Amount"
                aria-describedby="fund_transfer"
                min="0"
                required
              />
              <button
                class="btn btn-outline-secondary"
                type="submit"
                id="fund_transfer"
              >
                Transfer Fund
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* FundTransfer History */}
      <div className="my-3">
        <div className="d-block mb-4 mb-md-0 mb-2">
          <h2 className="h4 my-0">Fund Transfer History</h2>
          <p className="mb-0">All your fund transfers are here...</p>
        </div>
        <DataGrid
          //loading={loadingData}
          getRowId={(r) => r._id}
          rows={fundHistory}
          columns={fundColumns}
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
