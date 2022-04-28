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
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Tree from "react-hierarchy-tree-graph";
import { getFormData } from "../../helpers/helpers";
import { OrgDiagram } from "basicprimitivesreact";
import { PageFitMode, Enabled } from "basicprimitives";
import Downline from "./Downline";

export default function MyDownlines() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const authToken = userInfo.token;
  const apiHeaders = { headers: { Authorization: `Bearer ${authToken}` } };
  const [childData, setChildData] = useState([]);

  var photos = {
    a:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA8CAIAAACrV36WAAAAAXNSR0IArs4c6QAAAARn" +
      "QU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGnSURBVGhD7dnBbQJBDAVQk1o2QjlQwKYGzpSwKQfq4IxIC" +
      "RTB9jLZHCJFwWv7/7EiDt6zmX2yPYMHNq01eb7n5flI36JiIXWpbFW2kAwgsdVblS0kA0hs9db/ZWs+vW/Wno9PxPE3dh" +
      "ls6Od+HI1XT1d64Sb8R5utEulwdbA8VY+LZ/kqkfF456pBHxDz5Xxze/p2vsxukBbAshTVOE0PO4B2cUlWKrgUTKsrV0e" +
      "ut3RVU/cm5aKKqPXVbjuIDPtDUh2JImq1+jmjkupIFNFStXadHncWXkecpb3393me4oJZnionXyjLV6W4QFZEleHCWNG+" +
      "0eKggQJiRVV6vhAXwoqrul0AC1H1uuIsTLUyukYH1jBL7WJ8lgq6oqwkVXSQDrLSVEFXjJWoirlCrFRVyBVhJasirgCr6" +
      "5tEv7a5A5jL0tcN7vNl9OVcHqtXRbocVr+Kc9k3H/3qPL69Ise7dh0SsS+2JmtFddgvdy/gGbY7Jdp2GRcyrlu1BfUjxt" +
      "iPRm/lqVbGHOMHnU39zQm0I/UbBLA+GVosJHGVrcoWkgEktnoLydYXkF/LiXG21MwAAAAASUVORK5CYII=",
  };
  const config = {
    pageFitMode: PageFitMode.AutoSize,
    autoSizeMinimum: { width: 100, height: 100 },
    cursorItem: 0,
    highlightItem: 0,
    //hasSelectorCheckbox: Enabled.True,
    items: [
      {
        id: 0,
        parent: null,
        title: "James Smith",
        description: "VP, Public Sector",
        image: photos.a,
      },
      {
        id: 1,
        parent: 0,
        title: "Ted Lucas",
        description: "VP, Human Resources",
        image: photos.a,
      },
      {
        id: 2,
        parent: 0,
        title: "Fritz Stuger",
        description: "Business Solutions, US",
        image: photos.a,
      },
    ],
  };

  async function getChilds(memberID) {
    api.post("/userInfo", { member_id: memberID }, apiHeaders).then((res) => {
      console.log(res.data);
      /* let childs = [
        {
          id: userInfo?.user?.member_id,
          parent: null,
          title: userInfo?.user?.member_id,
          description: userInfo?.user?.full_name,
          image: photos.a,
        },
      ]; */
      /*  res.data.directChild.map((child, index) => {
        const cInfo = {
          id: child.member_id,
          parent: child.sponsor_id,
          title: child.member_id,
          description: child.full_name,
          image: photos.a,
        };
        childs.push(cInfo);
      }); */

      setChildData([...res.data.directChild]);
    });
  }

  useEffect(async () => {
    //await getChilds(userInfo?.user?.member_id);
  }, []);
  return (
    <div className="container-fluid">
      {/*  */}
      {/* <OrgDiagram centerOnCursor={true} config={config} /> */}
      <div className="row">
        <div className="col-md">
          <Downline memberID={userInfo.user.member_id}/>
        </div>
      </div>
    </div>
  );
}
