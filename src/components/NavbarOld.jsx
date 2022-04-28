import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import navbarMenus from "../helpers/navbar_menus";
import { logout } from "../redux/User";

export default function NavbarOld(props) {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  //console.log("navbar", isLoggedIn);
  const langs = {
    en: "English/USD",
    hi: "Hindi",
  };
  const [currentLang, setCurrentLang] = useState(langs.en);
  return (
    <header className="header-global">
      <nav
        id="navbar-main"
        aria-label="Primary navigation"
        className="navbar navbar-main navbar-expand-lg navbar-theme-primary pt-4 navbar-dark"
      >
        <div className="container-fluid position-relative">
          <Link class="navbar-brand" to="/">
            <img
              src="/theme_files/assets/logo-webf.png"
              alt=""
              height="24"
            />
          </Link>
          <div
            className="navbar-collapse collapse mr-auto w-100"
            id="navbar_global"
          >
            <div className="navbar-collapse-header">
              <div className="row">
                <div className="col-6 collapse-brand">
                  <a href="/">
                    <img
                      src="/theme_files/assets/img/brand/light.svg"
                      alt="Volt logo"
                    />
                  </a>
                </div>
                <div className="col-6 collapse-close">
                  <a
                    href="#navbar_global"
                    className="fas fa-times"
                    data-toggle="collapse"
                    data-target="#navbar_global"
                    aria-controls="navbar_global"
                    aria-expanded="false"
                    title="close"
                    aria-label="Toggle navigation"
                  ></a>
                </div>
              </div>
            </div>
            {/*  <ul className="navbar-nav navbar-nav-hover align-items-lg-center me-auto">
              <li className="nav-item mr-2">
                <a href="/dashboard" className="nav-link">
                  Dashboard
                </a>
              </li>
              <li className="nav-item mr-2">
                <a href="/signin" className="nav-link">
                  Login
                </a>
              </li>
              <li className="nav-item mr-2">
                <a href="/signup" className="nav-link">
                  Register
                </a>
              </li>
            </ul> */}

            {navbarMenus?.leftMenu && (
              <ul className="navbar-nav navbar-nav-hover align-items-lg-center mr-auto">
                {navbarMenus.leftMenu.map((menu) => (
                  <li className="nav-item mr-2">
                    <Link to={menu.page} className="nav-link">
                      {menu.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {navbarMenus?.rightMenu && (
              <ul className="navbar-nav navbar-nav-hover align-items-lg-center ml-auto">
                {navbarMenus.rightMenu.map((menu) => (
                  <li className="nav-item mr-2">
                    <Link to={menu.page} className="nav-link">
                      {menu.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/*  <div className="d-flex align-items-center ml-auto">
            <a
              href="https://themesberg.com/product/admin-dashboard/volt-bootstrap-5-dashboard"
              target="_blank"
              className="btn btn-secondary text-dark mr-md-3"
              ><span className="fas fa-download mr-2"></span> Download Free</a
            >
            <a
              href="https://themesberg.com/docs/volt-bootstrap-5-dashboard/getting-started/quick-start/"
              target="_blank"
              className="btn btn-outline-soft d-none d-lg-block"
              ><span className="fas fa-book mr-2"></span> Docs v1.0</a
            >
            <button
              className="navbar-toggler ml-2"
              type="button"
              data-toggle="collapse"
              data-target="#navbar_global"
              aria-controls="navbar_global"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div> */}
        </div>
      </nav>
    </header>
  );
}
