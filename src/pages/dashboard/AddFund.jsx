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
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getFormData } from "../../helpers/helpers";
import { connection, setWalletInfo } from "../../redux/User";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../../redux/User";

export default function AddFund() {
  const dispatch = useDispatch();
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const authToken = userInfo.token;
  const apiHeaders = { headers: { Authorization: `Bearer ${authToken}` } };
  //const [ownerWalletAddress, setOwnerWalletAddress] = useState();
  const [tableData, setTableData] = useState([]);
  const [manualRequests, setManualRequests] = useState([]);
  const [fundHistory, setFundHistory] = useState([]);
  const [disableAddFund, setDisableAddFund] = useState(false);
  const topupColumns = [
    { field: "member_id", headerName: "Member ID", minWidth: 200 },
    {
      field: "trans_hash",
      headerName: "Transaction Hash",
      flex: 1,
      minWidth: 150,
    },
    { field: "amount", headerName: "Amount" },
    {
      field: "createdAt",
      headerName: "Deposit Date",
      type: "date",
      width: 150,
    },
  ];

  const reqColumns = [
    { field: "member_id", headerName: "Member ID", minWidth: 200 },
    {
      field: "txn_hash",
      headerName: "Transaction Hash",
      flex: 1,
      minWidth: 150,
    },
    { field: "amount", headerName: "Amount", flex: 1, minWidth: 150 },
    {
      field: "is_approved",
      headerName: "Request Status",
      //type: "boolean",
      flex: 1,
      minWidth: 150,
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
      flex: 1,
      minWidth: 150,
    },
  ];

  async function addFund(e) {
    e.preventDefault();
    const formData = getFormData(e.target);

    const fundRes = api.post("/investment", formData, apiHeaders);
    toast.promise(fundRes, {
      loading: "Fund transfer in progress...",
      success: (data) => {
        return `Congratulations, you have successfully added fund to your wallet.`;
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

  async function addManualFund(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    const { txn_hash, amount } = formData;
    formData.member_id = userInfo?.user?.member_id;
    const verifyTrans = axios.get(
      `https://api.globaldefipool.com/payment-details?address=${userInfo.user.deposit_wallet}&tx_hash=${txn_hash}`
    );
    toast
      .promise(verifyTrans, {
        loading: "Verifying transaction....",
        success: (data) => {
          return "Transaction verified";
        },
        error: (error) => {
          return "Verification failed, invalid address or transaction hash.";
        },
      })
      .then((res) => {
        if (res.data.txDetailsObj.value == amount) {
          const fundRes = api.post(
            "/investment",
            {
              member_id: formData.member_id,
              trans_hash: formData.txn_hash,
              amount: formData.amount,
            },
            apiHeaders
          );
          toast.promise(fundRes, {
            loading: "Fund transfer in progress...",
            success: (data) => {
              getAllFundReq();
              e.target.reset();
              return `Congratulations, you have successfully added fund to your wallet.`;
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
        } else {
          toast.error("Invalid amount for this transaction.");
        }
      });
  }


  async function getAllFundReq() {
    api
      .post(
        "getcreateInvestment",
        {
          member_id: userInfo?.user?.member_id,
        },
        apiHeaders
      )
      .then((res) => {
        console.log("LevelIncome:: ", res.data);
        setManualRequests([...res.data.data]);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, Something went wrong."
        );
      });
  }

  async function generateAddress() {
    const r = api.post(
      "generate_new_address",
      { member_id: userInfo.user.member_id },
      apiHeaders
    );
    toast.promise(r, {
      loading: "Generating new wallet address",
      success: (data) => {
        localStorage.setItem("xceltrip_user", JSON.stringify({isLoggedIn, userInfo: {...userInfo, user: {...userInfo.user, deposit_wallet: data.data.address}}}));
        dispatch(login({isLoggedIn, userInfo: {...userInfo, user: {...userInfo.user, deposit_wallet: data.data.address}}}));
        return "New wallet address geberated successfully.Please logout and login again.";
      },
      error: "Error in wallet creation.",
    });
  }

  useEffect(async () => {
    await getAllFundReq();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Widthdrawl Form */}
        <div className="col-lg">
          <div className="d-flex justify-content-between my-2">
            <div>
              <h2 className="h4 my-0">Deposit XLD Coin</h2>
            </div>
            {!userInfo.user.deposit_wallet && (
              <div>
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    generateAddress();
                  }}
                >
                  Generate Wallet
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg">
          <div className="card card-body">
            <div className="row">
              <div className="col-md-4 align-items-center">
                <div>
                  {" "}
                  <img
                    src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${userInfo?.user?.deposit_wallet}`}
                    height={200}
                  />
                </div>
                <div>
                  <span className="fw-bold">Owner Wallet : </span>
                  {userInfo?.user?.deposit_wallet}
                </div>
              </div>
              <div className="col-md">
                <form
                  onSubmit={(e) => {
                    addManualFund(e);
                  }}
                >
                  <div className="row">
                    <div className="col-md">
                      <div>
                        <label for="amount">Amount</label>
                        <input
                          className="form-control"
                          id="amount"
                          type="number"
                          placeholder="Amount"
                          name="amount"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md">
                      <div>
                        <label for="txn_hash">Transaction Hash</label>
                        <input
                          className="form-control"
                          id="txn_hash"
                          type="text"
                          placeholder="Transaction Hash"
                          name="txn_hash"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-end">
                    <button type="submit" className="btn btn-primary">
                      Add Fund
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-3">
        <div className="d-block mb-4 mb-md-0 mb-2">
          <h2 className="h4 my-0">Deposit History</h2>
        </div>
        <DataGrid
          //loading={loadingData}
          getRowId={(r) => r._id}
          rows={manualRequests}
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
