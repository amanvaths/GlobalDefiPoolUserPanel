import { Link } from "react-router-dom";

export default function Footer() {
  const socialLinks = [
    /*  {
      channel: "Corporate",
      channelLink: "support@demo.com",
      icon: "fas fa-envelope-open",
    }, */
    {
      channel: "About Us",
      channelLink: "/about",
      icon: "fas fa-globe",
    },
    {
      channel: "FAQ",
      channelLink: "/faq",
      icon: "fas fa-globe",
    },
    {
      channel: "Terms & Condition",
      channelLink: "/terms",
      icon: "fas fa-globe",
    },
    /*  {
      channel: "Twitter",
      channelLink: "support@demo.com",
      icon: "fas fa-envelope-open",
    }, */
    /*  {
      channel: "Linkedin",
      channelLink: "https://www.demo.com",
      icon: "fas fa-globe",
    },
    {
      channel: "Forum",
      channelLink: "https://www.demo.com",
      icon: "fas fa-globe",
    }, */
  ];
  return (
    <>
      <footer className="app-footer-bg app-footer text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="mb-2">
                <img
                  src="/theme_files/assets/logo_footer.png"
                  alt=""
                  style={{ height: "50px" }}
                />
              </div>
              <p>
                Founded in 2022, GDP is a U.S. based technology company with
                staking rewards growing a community around the XcelDefi token.
                We provide rewards and an incentivized affiliate program that
                helps users from our community benefit from our efforts.GDP
                provides a sustainable staking platform for users all over the
                world.
              </p>
            </div>
            <div className="col-md-6 col-lg-4">
              <h1 className="font-righteous text-white">Office</h1>
              <p>
                Global Defi Pool Corporate U.S. Office 2727 Lyndon B Johnson,
                Farmers Branch, Tx 75234, (Dallas, TX USA)
              </p>
            </div>
            <div className="col-md-6 col-lg-4">
              <nav class="nav flex-column">
                {socialLinks.map((item) => (
                  <Link
                    className="nav-link text-muted my-1 py-0"
                    to={item.channelLink}
                    target="_parent"
                  >
                    <div>{item.channel}</div>
                  </Link>
                ))}
                <a
                  href="https://www.facebook.com/globaldefipool"
                  target="_blank"
                  className="nav-link text-muted my-1 py-0"
                >
                  Facebook
                </a>
                <a
                  href="https://t.me/globaldefipoolofficial"
                  target="_blank"
                  className="nav-link text-muted my-1 py-0"
                >
                  Telegram
                </a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
      {/* <div className="container-fluid foot-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <div>Copyrights © 2022. All Rights Reserved</div>
          <div>Registered in England and Wales Company Number: 3597254</div>
        </div>
      </div> */}
    </>
  );
}
