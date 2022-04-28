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

export default function Widthdraw() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const authToken = userInfo.token;
  const apiHeaders = { headers: { Authorization: `Bearer ${authToken}` } };
  const [tableData, setTableData] = useState([]);
  const [withdrawlRequests, setWithdrawlRequests] = useState([]);
  const topupColumns = [
    { field: "member_id", headerName: "Member ID", width: 150 },
    { field: "amount", headerName: "Amount", width: 200 },
    { field: "coin_wallet", headerName: "Vibration wallet", width: 200 },
    { field: "income_wallet", headerName: "Cashoneer wallet", width: 200 },
    {
      field: "createdAt",
      headerName: "Withdraw Date",
      type: "date",
      width: 150,
    },
  ];

  const appColumns = [
    { field: "member_id", headerName: "Member ID" },
    {
      field: "wallet_address",
      headerName: "Wallet Address",
      minWidth: 100,
      flex: 1,
    },
    /* {
      field: "txn_hash",
      headerName: "Transaction Hash",
      minWidth: 100,
      flex: 1,
    }, */
    { field: "amount", headerName: "Amount", minWidth: 100, flex: 1 },
    {
      field: "wallet_type",
      headerName: "From Wallet",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return {
          income_wallet: "Cashoneer Wallet",
          cashback_wallet: "Moneypal Wallet",
        }[params.value];
      },
    },
    {
      field: "is_approved",
      headerName: "Request Status",
      //type: "boolean",
      width: 150,
      renderCell: (params) =>
        params.value == 1 ? (
          <Chip label="Approved" color="success" size="small" />
        ) : params.value == 2 ? (
          <Chip label="Rejected" color="error" size="small" />
        ) : (
          <Chip label="Pending" color="warning" size="small" />
        ),
    },
    {
      field: "createdAt",
      headerName: "Request Date",
      type: "date",
      minWidth: 100,
      flex: 1,
    },
  ];

  async function getWithdrawlRequests() {
    api
      .post("all_withdrawl_requests", {member_id: userInfo.user.member_id}, apiHeaders)
      .then((res) => {
        console.log(res.data);
       /*  const pending = res.data.filter((item) => item.is_approved == 0);
        const approved = res.data.filter((item) => item.is_approved == 1);
        const rejected = res.data.filter((item) => item.is_approved == 2);
        setPendingFundRequests([...pending]);
        setApprovedFundRequests([...approved]);
        setRejectedFundRequests([...rejected]); */
        setWithdrawlRequests([...res.data]);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, something went wrong."
        );
      });
  }

  async function widthdrawAmount(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    console.log(formData);

    const fundRes = api.post("/widthdrawl", formData, apiHeaders);
    toast.promise(fundRes, {
      loading: "widthdrawl in progress...",
      success: (data) => {
        e.target.reset();
        getWithdrawlRequests();
        return `Congratulations, you have successfully widthdrawl.`;
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
        income_type: "widthdrawl",
      }, apiHeaders)
      .then((res) => {
        console.log("LevelIncome:: ", res.data.data);
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
    await getWithdrawlRequests()
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Widthdrawl Form */}
        <div className="col-lg">
          <div className="d-block mb-4 mb-md-0 mb-2">
            <h2 className="h4 my-0">Withdraw Amount</h2>
          </div>
          <form
            onSubmit={(e) => {
              widthdrawAmount(e);
            }}
          >
            <input
              type="hidden"
              name="member_id"
              value={userInfo?.user?.member_id}
            />
            <div class="input-group mb-3">
              <input
                type="number"
                name="amount"
                class="form-control"
                placeholder="Amount to widthdraw"
                aria-label="Amount to widthdraw"
                aria-describedby="button-addon2"
                min="0"
                required
              />
              <select
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="wallet_type"
              >
                <option selected disabled>
                  Select Wallet
                </option>
                <option value="income_wallet">Cashoneer Wallet</option>
                <option value="cashback_wallet">Moneypal Wallet</option>
              </select>
              {/* <button
                class="btn btn-outline-secondary"
                type="submit"
                id="button-addon2"
              >
                Widthdraw
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

      <div className="my-3">
        <div className="d-block mb-4 mb-md-0 mb-2">
          <h2 className="h4 my-0">Withdrawl Requests</h2>
        </div>
        <DataGrid
          getRowId={(r) => r._id}
          rows={withdrawlRequests}
          columns={appColumns}
          pageSize={10}
          autoHeight={true}
          className="bg-white"
        />
      </div>

      {/* Widthdrawal History */}
      <div className="my-3">
        <div className="d-block mb-4 mb-md-0 mb-2">
          <h2 className="h4 my-0">Withdraw History</h2>
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
