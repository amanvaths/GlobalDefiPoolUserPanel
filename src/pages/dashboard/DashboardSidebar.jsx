import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import sidebarMenus from "../../helpers/sidebar_menus";
import { logout } from "../../redux/User";

export default function DashboardSidebar() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const dispatch = useDispatch();
  return (
    <nav
      id="sidebarMenu"
      className="sidebar d-md-block bg-primary text-white collapse"
      data-simplebar
    >
      <div className="sidebar-inner px-4 pt-3">
        <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
          <div className="d-flex align-items-center">
            <div className="user-avatar lg-avatar mr-4">
              <img
                src="/Images/profilepics.png"
                className="card-img-top rounded-circle border-white"
                alt="Bonnie Green"
              />
            </div>
            <div className="d-block">
              <h2 className="h6">Hi, {userInfo?.user?.email}</h2>
              {/* <a
                href=""
                className="btn btn-secondary text-dark btn-xs"
                onClick={(e) => {
                  e.preventDefault();
                  //localStorage.removeItem("exchange_inrx_userID");
                  dispatch(logout());
                }}
              >
                <span className="mr-2">
                  <span className="fas fa-sign-out-alt"></span>
                </span>
                Sign Out
              </a> */}
            </div>
          </div>
          <div className="collapse-close d-md-none">
            <a
              href="#sidebarMenu"
              className="fas fa-times"
              data-toggle="collapse"
              data-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="true"
              aria-label="Toggle navigation"
            ></a>
          </div>
        </div>
        <ul className="nav flex-column">
          {sidebarMenus.map((menuItem, index) =>
            menuItem.childrens ? (
              <li className="nav-item">
                <span
                  className="nav-link  collapsed  d-flex justify-content-between align-items-center"
                  data-toggle="collapse"
                  data-target={`#submenu-page${index}`}
                >
                  <span>
                    <span className="sidebar-icon">
                      <span className={menuItem.icon}></span>
                    </span>
                    {menuItem.title}
                  </span>
                  <span className="link-arrow">
                    <span className="fas fa-chevron-right"></span>
                  </span>
                </span>
                <div
                  className="multi-level collapse "
                  role="list"
                  id={`submenu-page${index}`}
                  aria-expanded="false"
                >
                  <ul className="flex-column nav">
                    {menuItem.childrens.map((submenuItem) => (
                      <li className="nav-item">
                        <a className="nav-link" href={submenuItem.page}>
                          <span>{submenuItem.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li className="nav-item">
                <a href={menuItem.page} className="nav-link">
                  <span className="sidebar-icon">
                    <span className={menuItem.icon}></span>
                  </span>
                  <span>{menuItem.title}</span>
                </a>
              </li>
            )
          )}
          {/* AfterSeparator */}
          {/* <li
            role="separator"
            className="dropdown-divider mt-4 mb-3 border-black"
          ></li>
          <li className="nav-item">
            <a
              href="../../index.html"
              className="nav-link d-flex align-items-center"
            >
              <span className="sidebar-icon">
                <img
                  src="/theme_files/assets/img/brand/light.svg"
                  height="20"
                  width="20"
                  alt="Volt Logo"
                />
              </span>
              <span className="mt-1">Volt Overview</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://themesberg.com/docs/volt-bootstrap-5-dashboard/getting-started/quick-start/"
              target="_blank"
              className="nav-link d-flex align-items-center"
            >
              <span className="sidebar-icon">
                <span className="fas fa-book"></span>
              </span>
              <span>Quick Start</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://themesberg.com/product/admin-dashboard/volt-premium-bootstrap-5-dashboard"
              target="_blank"
              className="nav-link d-flex align-items-center"
            >
              <span className="sidebar-icon">
                <span className="fas fa-rocket"></span>
              </span>
              <span>Upgrade to Pro</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://themesberg.com"
              target="_blank"
              className="nav-link d-flex align-items-center"
            >
              <span className="sidebar-icon">
                <img
                  src="/theme_files/assets/img/themesberg.svg"
                  height="20"
                  width="20"
                  alt="Themesberg Logo"
                />
              </span>
              <span>Themesberg</span>
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}
