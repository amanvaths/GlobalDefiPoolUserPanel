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
export default function TransferFund() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const authToken = userInfo.token;
  const apiHeaders = { headers: { Authorization: `Bearer ${authToken}` } };
  const [tableData, setTableData] = useState([]);
  const [fundHistory, setFundHistory] = useState([]);
  const [isMemberVerified, setIsMemberVerified] = useState(null);

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

  async function verifyMemberID(memberID) {
    if (memberID.length > 0) {
      const fundRes = api.post("/userInfo", {member_id: memberID}, apiHeaders);
      toast.promise(fundRes, {
        loading: "Verifying member to transfer amount...",
        success: (data) => {
          setIsMemberVerified({...data.data.data})
          return `MemberID verified successfully.`;
        },
        error: (err) => {
          setIsMemberVerified(null);
          return (
            err?.response?.data?.errors ??
            err?.response?.data?.message ??
            err?.message ??
            "OOPs something went wrong."
          );
        },
      });
    }
  }

  useEffect(async () => {
    await getFundTransferHistory();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        {/* FundTransfer */}
        <div className="col-lg">
          <div className="d-block mb-2">
            <h2 className="h4 my-0">Transfer Vibration Wallet</h2>
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
            <input
              type="hidden"
              name="member_id"
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
                onBlur={(e) => {
                  verifyMemberID(e.target.value);
                }}
              />
              {isMemberVerified && <div className="fw-bold text-success" style={{fontSize: "12px"}}>Member Name : {isMemberVerified?.full_name ?? "Name not available"}</div>}
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
              {/* <button
                class="btn btn-outline-secondary"
                type="submit"
                id="fund_transfer"
              >
                Transfer Fund
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
      {/* FundTransfer History */}
      <div className="my-3">
        <div className="d-block mb-4 mb-md-0 mb-2">
          <h2 className="h4 my-0">Fund Transfer History</h2>
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
