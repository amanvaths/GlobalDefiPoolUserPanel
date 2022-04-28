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
import { getFormData } from "../../helpers/helpers";

export default function Support() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const authToken = userInfo.token;
  const apiHeaders = { headers: { Authorization: `Bearer ${authToken}` } };
  const [userData, setUserData] = useState({});
  const [directChilds, setDirectChilds] = useState([]);
  const [tableData, setTableData] = useState([]);
  const columns = [
    { field: "member_id", headerName: "Member ID", width: 150 },
    { field: "support_subject", headerName: "Subject", width: 200 },
    { field: "support_message", headerName: "Message", width: 200, flex: 1 },
    { field: "admin_reply", headerName: "Admin's Reply", width: 200, flex: 1 },
    { field: "createdAt", headerName: "Request Date", type: "date", width: 150 },
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

  async function getSupportRequests() {
    api
      .post("getSupportRequests", {
        member_id: userInfo?.user?.member_id,
      }, apiHeaders)
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

  async function sendSupportRequest(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    console.log(formData);
    const fundRes = api.post("/place_support_request", formData, apiHeaders);

    toast.promise(fundRes, {
      loading: "Sending support request...",
      success: (data) => {
        e.target.reset();
        getSupportRequests();
        return `Congratulations, support request has been placed.`;
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

  //

  useEffect(async () => {
    await getUsersInfo();
    await getSupportRequests();
  }, []);
  return (
    <>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-lg">
            <div className="my-2">
              <div className="d-block mb-4 mb-md-0 mb-2">
                <h2 className="h4 my-0">Support Requests</h2>
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
          <div className="col-lg-4">
            <div className="card card-body bg-white border-light shadow-sm mb-4">
              <h2 className="h5">Place Support Request</h2>
              <form
                onSubmit={(e) => {
                  sendSupportRequest(e);
                }}
              >
                <input
                  type="hidden"
                  name="member_id"
                  value={userData.member_id}
                />
                <input type="hidden" name="password_type" value="password" />
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div>
                      <label for="support_subject">Subject</label>
                      <input
                        className="form-control"
                        id="support_subject"
                        type="text"
                        placeholder="Subject"
                        name="support_subject"
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <div>
                      <label for="support_message">Your Query</label>
                      <textarea
                        className="form-control"
                        id="support_message"
                        placeholder="You Query"
                        name="support_message"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="mt-1 text-end">
                  <button type="submit" className="btn btn-primary">
                    Place Request 
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
