import { Link } from "react-router-dom";

export default function Wallet() {
  return (
    <section className="container-fluid">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md">
            <h1 className="font-righteous mb-4">
              The Easy way to Earn Money-Like Crypto Assets
            </h1>
            <p className="app-para mb-4">
              Download the app and start earning rewards today.
            </p>
            <div>
              <a
                href="https://apps.apple.com/us/app/xcelpay-secure-crypto-wallet/id146121541"
                target="_blank"
                rel="noreferrer"
                className="me-3"
              >
                <img src="/theme_files/assets/app-store.png" alt="" />
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.XcelTrip.XcelPay"
                className=""
                target="_blank"
                rel="noreferrer"
              >
                <img src="/theme_files/assets/gplay.png" alt="" />
              </a>
            </div>
          </div>
          <div className="col-md">
            <img src="/theme_files/yamgo/yamgo-paid-for-life.png" />
          </div>
        </div>
      </div>
    </section>
  );
}
