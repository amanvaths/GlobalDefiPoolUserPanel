const sidebarMenus = [
    {title: "Dashboard", icon:"fas fa-chart-pie", page:"/dashboard"},
    {title: "Deposit XLD Coin", icon:"fas fa-hand-holding-usd", page:"/dashboard/addfund"},
    {title: "Stake Coin", icon:"fas fa-hand-holding-usd", page:"/dashboard/topupwallet"},
    {title: "Transfer Wallet", icon:"fas fa-hand-holding-usd", page:"/dashboard/transferfund"},
    {title: "Transaction History", icon:"fas fa-hand-holding-usd", page:"/dashboard/transactionhistory"},
    {title: "Team Bonus", icon:"fas fa-hand-holding-usd", page:"/dashboard/levelincomes"},
    {title: "Royalty Incomes", icon:"fas fa-hand-holding-usd", page:"/dashboard/royaltyincomes"},
    {title: "Withdraw Amount", icon:"fas fa-hand-holding-usd", page:"/dashboard/widthdraw"},
    {title: "My Team", icon:"fas fa-hand-holding-usd", page:"/dashboard/downlines"},
    {title: "Support Requests", icon:"fas fa-hand-holding-usd", page:"/dashboard/support"},
    {title: "Settings", icon:"fas fa-cog", page:"/dashboard/settings"},
    {title: "StakingBounsReport", icon:"fas fa-cog", page:"/dashboard/stakingbounsreport"},
    /* {title: "Page Examples", icon:"far fa-file-alt", childrens:[
        {title: "Sign In", page: "/"},
        {title: "Sign Up", page: "/"},
        {title: "Forgot Password", page: "/forgot-password"},
        {title: "Reset Password", page: "/reset-password"},
        {title: "404 Not Found", page: "/error404"},
        {title: "500 Server Error", page: "/error500"},
    ]}, */
]
export default sidebarMenus;