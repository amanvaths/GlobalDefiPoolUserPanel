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

export default function StakingBounsReport() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const authToken = userInfo.token;
  const apiHeaders = { headers: { Authorization: `Bearer ${authToken}` } };
  const [userData, setUserData] = useState({});
  const [directChilds, setDirectChilds] = useState([]);
  const [tableData, setTableData] = useState([]);
  const columns = [
    { field: "member_id", headerName: "Member ID", width: 150, flex: 1 },
    { field: "staking_amount", headerName: "Staking Amount", width: 150, flex: 1 },
    { field: "cashback_amount", headerName: "Amount", width: 200, flex: 1 },
    {
      field: "cashback_date",
      headerName: "Staking Bonus",
      type: "date",
      width: 150,
      flex: 1,
    },
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

  async function getStackingBonusReport() {
    api
      .post(
        "getStackingBonusReport",
        {
          member_id: userInfo?.user?.member_id,
        },
        apiHeaders
      )
      .then((res) => {
        setTableData([...res.data]);
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
    await getStackingBonusReport();
  }, []);
  return (
    <>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-lg">
            <div className="my-2">
              <div className="d-block mb-4 mb-md-0 mb-2">
                <h2 className="h4 my-0">Staking Bouns Report</h2>
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
