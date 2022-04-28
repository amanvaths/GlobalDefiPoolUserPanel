import { Route, Routes, useParams } from "react-router-dom";
import DashboardNav from "../../components/DashboardNav";
import AddFund from "./AddFund";
import DashboardAreaNav from "./DashboardAreaNav";
import DashboardFooter from "./DashboardFooter";
import DashboardHome from "./DashboardHome";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTrasactions from "./DashboardTransactions";
import FundTransfer from "./FundTransfer";
import LevelIncomes from "./LevelIncomes";
import MyDownlines from "./MyDownlines";
import RoyaltyIncomes from "./RoyaltyIncomes";

import Settings from "./Settings";
import Support from "./Support";
import TopUpWallet from "./TopUpWallet";
import TransactionHistory from "./TransactionHistory";
import TransferFund from "./TransferFund";
import Widthdraw from "./Widthdraw";
import StakingBounsReport from "./StakingBounsReport"

export default function Dashboard() {
  const { page } = useParams();
  const pages = {
    settings: <Settings />,
    topupwallet: <TopUpWallet />,
    transferfund: <TransferFund />,
    transactions: <DashboardTrasactions />,
    transactionhistory: <TransactionHistory />,
    widthdraw: <Widthdraw />,
    downlines: <MyDownlines />,
    addfund: <AddFund />,
    levelincomes: <LevelIncomes />,
    royaltyincomes: <RoyaltyIncomes />,
    support: <Support />,
   stakingbounsreport:<StakingBounsReport/>
  };
  return (
    <>
      <DashboardNav />
      <div className="container-fluid bg-soft">
        <div className="row">
          <div className="col-12">
            {/* DashboardSidebar */}
            <DashboardSidebar />
            <main className="content">
              {/* DashboardNav */}
              <DashboardAreaNav />
              {pages?.[page] ? pages[page] : <DashboardHome />}
              {/* DashboardFooter */}
              {/* <DashboardFooter /> */}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
