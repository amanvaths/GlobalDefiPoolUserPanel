import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

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


export default function RoyaltyIncomes() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const authToken = userInfo.token;
  const apiHeaders = { headers: { Authorization: `Bearer ${authToken}` } };
  const [userData, setUserData] = useState({});
  const [directChilds, setDirectChilds] = useState([]);
  const [tableData, setTableData] = useState([]);
  const columns = [
    { field: "member_id", headerName: "Member ID", minWidth: 150, flex: 1 },
    { field: "amount", headerName: "Amount", minWidth: 150, flex: 1 },
    { field: "coin_wallet", headerName: "Vibration wallet", minWidth: 150, flex: 1 },
    { field: "income_wallet", headerName: "Cashoneer wallet", minWidth: 150, flex: 1 },
    { field: "createdAt", headerName: "Income Date", type: "date", minWidth: 150, flex: 1 },
  ];

  async function getUsersInfo() {
    api
      .post("userInfo", { member_id: userInfo?.user?.member_id }, apiHeaders)
      .then((res) => {
        console.log("userInfo :: ", res.data.data);
        setUserData({ ...res.data.data });
        setDirectChilds([...res.data.directChild]);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, Something went wrong."
        );
      });
  }

  async function getRoyaltyIncome() {
    api
      .post("getIncomeHistory", {
        member_id: userInfo?.user?.member_id,
        income_type: "royalty",
      }, apiHeaders)
      .then((res) => {
        console.log("RoyaltyIncomes:: ", res.data.data);
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
    await getUsersInfo();
    await getRoyaltyIncome();
  }, []);
  return (
    <>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-lg">
            <div className="my-2">
              <div className="d-block mb-4 mb-md-0 mb-2">
                <h2 className="h4 my-0">Royalty Incomes</h2>
              </div>
              <DataGrid
                //loading={loadingData}
                getRowId={(r) => r._id}
                rows={tableData}
                columns={columns}
                pageSize={10}
                autoHeight={true}
                className="bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
