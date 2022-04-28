import { createRef, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getFormData } from "../../helpers/helpers";
import api from "../../utils/api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

export default function SignUp() {
  const [isSignupSuccessful, setIsSignupSuccessful] = useState();
  const [isMemberVerified, setIsMemberVerified] = useState(null);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const recaptchaRef = createRef();
  const { referrer } = useParams();

  async function verifyMemberID(memberID) {
    if (memberID.length > 0) {
      const fundRes = api.post("/userInfo", { member_id: memberID });
      toast.promise(fundRes, {
        loading: "Verifying member to transfer amount...",
        success: (data) => {
          setIsMemberVerified({ ...data.data.data });
          return `MemberID verified successfully.`;
        },
        error: (err) => {
          setIsMemberVerified(null);
          return (
            err?.response?.data?.errors ??
            err?.response?.data?.message ??
            err?.message ??
            "OOPs something went wrong."
          );
        },
      });
    }
  }

  function registerUser(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    if (!isInvalidEmail) {
      const recaptchaValue = recaptchaRef.current.getValue();
      console.log("recaptcha", recaptchaValue);
      if (recaptchaValue) {
        if (isMemberVerified) {
          const signupRes = api.post("/signup", formData);

          toast
            .promise(signupRes, {
              loading: "Registration in progress...",
              success: (data) => {
                console.log(data);
                setIsSignupSuccessful({ ...data.data.data });
                return `Congratulations, you have successfully registered.`;
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
              e.target.reset();
            });
        } else {
          toast.error("Enter valid SponsorID, sponsor does not exists.");
        }
      } else {
        toast.error("Please verify captcha.");
      }
    }
  }

  useEffect(() => {
    if (referrer) {
      verifyMemberID(referrer);
    }
  }, []);
  return (
    <section className="vh-lg-100 d-flex align-items-center">
      {isSignupSuccessful ? (
        <div className="container col-md-6">
          <h1 className="font-righteous">Congratulations,</h1>
          <h4 className=" font-righteous">
            You have successfully registered. Your login credentials are.
          </h4>
          <hr />
          <div className="d-flex">
            <div className="fw-bold" style={{ minWidth: "200px" }}>
              Member ID :{" "}
            </div>
            <div>{isSignupSuccessful?.member_id}</div>
          </div>
          <div className="d-flex">
            <div className="fw-bold" style={{ minWidth: "200px" }}>
              Email Address :{" "}
            </div>
            <div>{isSignupSuccessful?.email}</div>
          </div>
          <div className="d-flex">
            <div className="fw-bold" style={{ minWidth: "200px" }}>
              Password :{" "}
            </div>
            <div>{isSignupSuccessful?.password}</div>
          </div>
          <div className="d-flex">
            <div className="fw-bold" style={{ minWidth: "200px" }}>
              Transaction Password :{" "}
            </div>
            <div>{isSignupSuccessful?.txn_password}</div>
          </div>
          <hr />
          <div className="d-flex justify-content-end">
            <div>
              <Link
                to="/signup"
                className="btn yamgo-blue darken-3 me-3 rounded shadow-sm py-3 px-5 fw-bold"
                onClick={(e) => {
                  setIsSignupSuccessful(null);
                }}
              >
                SIGN UP
              </Link>

              <Link
                to="/signin"
                className="btn orange rounded shadow-sm py-3 px-5 fw-bold"
              >
                SIGN IN
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div
            className="row justify-content-center form-bg-image"
            //data-background-lg="/theme_files/assets/img/illustrations/signin.svg"
            style={{
              backgroundImage:
                "url(/theme_files/assets/img/illustrations/signin.svg)",
            }}
          >
            <div className="col-12 d-flex align-items-center justify-content-center">
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-2 mt-md-0">
                  <h1 className="mb-0 h3">Create an account</h1>
                </div>
                <form
                  onSubmit={(e) => {
                    registerUser(e);
                  }}
                >
                  <div className="form-group mb-2">
                    <label for="sponsor_id">Sponsor ID</label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon3">
                        <span className="fas fa-user"></span>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Sponsor ID"
                        id="sponsor_id"
                        name="sponsor_id"
                        defaultValue={referrer}
                        autofocus
                        required
                        onBlur={(e) => {
                          verifyMemberID(e.target.value);
                        }}
                      />
                    </div>
                    {isMemberVerified && (
                      <div
                        className="fw-bold text-success"
                        style={{ fontSize: "12px" }}
                      >
                        Member Name :{" "}
                        {isMemberVerified?.full_name ?? "Name not available"}
                      </div>
                    )}
                  </div>

                  <div className="form-group mb-2">
                    <label for="fullname">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon3">
                        <span className="fas fa-user"></span>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        id="fullname"
                        name="full_name"
                        autofocus
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group mb-2">
                    <label for="email">Email ID</label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon3">
                        <span className="fas fa-envelope"></span>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="example@company.com"
                        id="email"
                        name="email"
                        autofocus
                        required
                        //pattern="/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/"
                        /* onInvalid={(e) => {
                          e.target.setCustomValidity(
                            "Please enter valid email address."
                          );
                        }}
                        onInput={(e)=>{e.target.setCustomValidity('')}} */
                        onChange={(e) => {
                          if (e.target.value.match(
                              /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                            )
                          ) {
                            setIsInvalidEmail(false);
                          } else {
                            setIsInvalidEmail(true);
                          }
                        }}
                      />
                    </div>
                    {isInvalidEmail && (
                      <span className="text-danger">
                        Enter valid email address.
                      </span>
                    )}
                  </div>

                  <div className="form-group mb-2">
                    <label for="mobile">Phone Number</label>
                    <PhoneInput
                      id="mobile"
                      country={"us"}
                      inputProps={{
                        name: "mobile",
                        required: true,
                        autoFocus: true,
                      }}
                      masks={{}}
                      enableSearch={true}
                      //value={}
                      //onChange={(phone) => this.setState({ phone })}
                    />
                  </div>

                  {/* <div className="form-group mb-2">
                    <label for="mobile">Phone Number</label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon3">
                        <span className="fas fa-mobile"></span>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        id="mobile"
                        name="mobile"
                        autofocus
                        required
                        pattern="^\d{10}$"
                        //title="Please enter valid mobile number"
                        onInvalid={(e) => {
                          e.target.setCustomValidity(
                            "Please enter valid mobile number"
                          );
                        }}
                      />
                    </div>
                  </div> */}

                  <div className="form-group">
                    {/* Password ConfirmPassword */}
                    {/*  <div className="form-group mb-2">
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
                        name="password"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group mb-2">
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
                        name="confirm_password"
                        required
                      />
                    </div>
                  </div> */}

                    <div className="form-group mb-2">
                      <label for="xcelpay_wallet">XcelPay Wallet Address</label>
                      <div className="input-group">
                        <span className="input-group-text" id="basic-addon3">
                          <span className="fas fa-wallet"></span>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="XcelPay Wallet Address"
                          id="xcelpay_wallet"
                          name="xcelpay_wallet"
                          autofocus
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group mb-4">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LfZoqweAAAAADv45cRiERxVOzNE6ZlWbYtl3tcN"
                        theme="dark"
                        onChange={(t) => {
                          console.log("cap", t);
                        }}
                      />
                    </div>

                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="terms"
                        required
                      />
                      <label className="form-check-label" for="terms">
                        I agree to the <Link to="">terms and conditions</Link>
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-block btn-primary">
                    Sign Up
                  </button>
                </form>
                {/* <div className="mt-3 mb-2 text-center">
                <span className="font-weight-normal">or</span>
              </div>
              <div className="btn-wrapper my-4 text-center">
                <button
                  className="btn btn-icon-only btn-pill btn-outline-light text-facebook mr-2"
                  type="button"
                  aria-label="facebook button"
                  title="facebook button"
                >
                  <span aria-hidden="true" className="fab fa-facebook-f"></span>
                </button>
                <button
                  className="btn btn-icon-only btn-pill btn-outline-light text-twitter mr-2"
                  type="button"
                  aria-label="twitter button"
                  title="twitter button"
                >
                  <span aria-hidden="true" className="fab fa-twitter"></span>
                </button>
                <button
                  className="btn btn-icon-only btn-pill btn-outline-light text-facebook"
                  type="button"
                  aria-label="github button"
                  title="github button"
                >
                  <span aria-hidden="true" className="fab fa-github"></span>
                </button>
              </div> */}
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="font-weight-normal">
                    Already have an account?
                    <Link to="/signin" className="font-weight-bold">
                      Login here
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
