export default function () {
  return (
    <section className="vh-lg-100 bg-soft d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center form-bg-image">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
              <h1 className="h3 mb-4">Reset password</h1>
              <form action="#">
                <div className="mb-4">
                  <label for="email">Your Email</label>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="example@company.com"
                      id="email"
                      required
                      disabled
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label for="password">Your Password</label>
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon4">
                      <span className="fas fa-unlock-alt"></span>
                    </span>
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      id="password"
                      required
                      autofocus
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label for="confirm_password">Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon5">
                      <span className="fas fa-unlock-alt"></span>
                    </span>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="form-control"
                      id="confirm_password"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-block btn-primary">
                  Reset password
                </button>
              </form>
              <div className="d-flex justify-content-center align-items-center mt-4">
                <span className="font-weight-normal">
                  Go back to the
                  <a href="./sign-in.html" className="font-weight-bold">
                    login page
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
