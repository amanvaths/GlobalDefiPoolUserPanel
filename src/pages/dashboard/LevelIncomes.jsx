import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import NewTaskExport from "./NewTaskExport";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCheckDouble,
  faChevronCircleUp,
  faCoffee,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";

export default function LevelIncomes() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const authToken = userInfo.token;
  const apiHeaders = { headers: { Authorization: `Bearer ${authToken}` } };
  const [userData, setUserData] = useState({});
  const [directChilds, setDirectChilds] = useState([]);
  const [tableData, setTableData] = useState([]);
  const columns = [
    { field: "member_id", headerName: "Member ID", width: 150, flex: 1 },
    { field: "income_from", headerName: "Income From", width: 150, flex: 1 },
    { field: "amount", headerName: "Amount", width: 200, flex: 1 },
    { field: "coin_wallet", headerName: "Vibration wallet", width: 200, flex: 1 },
    { field: "income_wallet", headerName: "Cashoneer wallet", width: 200, flex: 1 },
    { field: "investment", headerName: "Investment amount", type: "date", width: 150, flex:1  },
    { field: "createdAt", headerName: "Income Date", type: "date", width: 150, flex:1  },
  ];
  const newJoinings = [
    { member_id: "XELL000001", name: "Demo User", img: "" },
    { member_id: "XELL000003", name: "Demo User", img: "" },
    { member_id: "XELL000003", name: "Demo User", img: "" },
    { member_id: "XELL000004", name: "Demo User", img: "" },
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

  async function getLevelIncome() {
    api
      .post("getIncomeHistory", {
        member_id: userInfo?.user?.member_id,
        income_type: "Rank Bonus",
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
    await getUsersInfo();
    await getLevelIncome();
  }, []);
  return (
    <>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-lg">
            <div className="my-2">
              <div className="d-block mb-4 mb-md-0 mb-2">
                <h2 className="h4 my-0">Level Incomes</h2>
              </div>
              <DataGrid
                //loading={loadingData}
                getRowId={(r) => r._id}
                rows={tableData}
                columns={columns}
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
        </div>
      </div>
    </>
  );
}
