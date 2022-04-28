import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getFormData } from "../../helpers/helpers";
import { login } from "../../redux/User";
import api from "../../utils/api";

export default function ForgotPassword() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState();
  function authenticateUser(e) {
    e.preventDefault();
    //const recaptchaValue = recaptchaRef.current.getValue();
    //console.log("recaptcha", recaptchaValue);
    //e.target.onSubmit(recaptchaValue);

    const formData = getFormData(e.target);
    const signinRes = api.post("/forgot", formData);
    toast
      .promise(signinRes, {
        loading: "Verifying email address.",
        success: (data) => {
          setIsEmailSent(true);
          setEmail(formData.email);
          return `An email verification email has been sent to your email address.`;
        },
        error: (err) => {
          return (
            err?.response?.data?.errors ??
            err?.response?.data?.message ??
            err?.message ??
            "OOPs something went wrong."
          );
        },
      })
      .then((data) => {
        //dispatch(login({ isLoggedIn: true, userInfo: data.data }));
        //navigate("../dashboard", { replace: true });
      });
  }

  function changePassword(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    const signinRes = api.post("/forget_password", formData);
    toast.promise(signinRes, {
      loading: "Changing password...",
      success: (data) => {
        e.target.reset();
        return `Your password has been changed successfully.`;
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
  return (
    <>
      {isEmailSent ? (
        <section className="vh-lg-100 bg-soft d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center form-bg-image">
              <div className="col-12 d-flex align-items-center justify-content-center">
                <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <h1 className="h3 mb-4">Reset password</h1>
                  <form
                    onSubmit={(e) => {
                      changePassword(e);
                    }}
                  >
                    <input type="hidden" value={email} name="email" />

                    <div className="mb-4">
                      <label for="password">OTP</label>
                      <div className="input-group">
                        <span className="input-group-text" id="otp">
                          <span className="fas fa-unlock-alt"></span>
                        </span>
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          className="form-control"
                          id="otp"
                          required
                          autofocus
                          name="otp"
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
                          name="pass"
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
                          name="confirm_pass"
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
                      <Link to="/signin">Login page</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="vh-lg-100 bg-soft d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center form-bg-image">
              <div className="col-12 d-flex align-items-center justify-content-center">
                <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <h1 className="h3">Forgot your password?</h1>
                  <p className="mb-4">
                    Don't fret! Just type in your email and we will send you a
                    code to reset your password!
                  </p>
                  <form
                    onSubmit={(e) => {
                      authenticateUser(e);
                    }}
                  >
                    <div className="mb-4">
                      <label for="email">Your Email</label>
                      <div className="input-group">
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          id="email"
                          required
                          autofocus
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-block btn-primary">
                      Recover password
                    </button>
                  </form>
                  <div className="d-flex justify-content-center align-items-center mt-4">
                    <span className="font-weight-normal">
                      Go back to the
                      <Link to="/signin" className="font-weight-bold">
                        login page
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
