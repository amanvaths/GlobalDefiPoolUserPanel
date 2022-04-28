import { createRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "wc-toast";
import api from "../utils/api";

export default function (props) {
  const accessToken = props?.params?.access_token ?? "";
  const [isProgress, setIsProgress] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = createRef(); //useRef({});
  password.current = watch("password", "");

  const changePassword = (data) => {
    console.log(data);
    setIsProgress(true);
    api
      .post("/set-password", data)
      .then((res) => {
        toast.success(res?.data?.message);
        setShowSuccess(true);
        console.log(res.data);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ??
            error?.message ??
            "Something went wrong."
        );
      })
      .then(() => {
        setIsProgress(false);
      });
  };

  return (
    <>
      {showSuccess ? (
        <div className="card card-body border-0 text-center shadow-sm my-5">
          <h1 className="font-dongle fs-1 my-0 py-0">Congratulations</h1>
          <p className="font-comforta py-0 mb-3">Your password has been changed successfully.</p>
          <div className="d-flex justify-content-center">
            <Link to="/login" className="text-muted">
              <i className="fa fa-arrow-left"></i> Back to Login
            </Link>
          </div>
        </div>
      ) : (
        <div className="card card-body border-0">
          <h1 className="font-dongle fs-1 my-0 py-0">Change your password.</h1>
          <form onSubmit={handleSubmit(changePassword)}>
            <div class="form-floating mb-2">
              <input
                type="hidden"
                name="access_token"
                value={accessToken}
                {...register("access_token")}
              />
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="New Password"
                {...register("password", {
                  required: "You must specify a password",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
              />
              <label for="password">New Password</label>
            </div>
            {errors?.password && (
              <div className="app-text-danger">{errors?.password?.message}</div>
            )}
            <div class="form-floating mb-2">
              <input
                type="password"
                class="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                {...register("confirm_password", {
                  required: "Confirm password",
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
              <label for="confirmPassword">Confirm Password</label>
            </div>
            {errors?.confirm_password && (
              <div className="app-text-danger">
                {errors?.confirm_password?.message}
              </div>
            )}
            <div class="d-grid gap-2">
              <button class="btn btn-lg btn-primary mb-2" type="submit">
                {isProgress ? (
                  <>
                    <span
                      class="spinner-grow spinner-grow-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Updating Password....
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-end">
            <Link to="/login" className="text-muted">
              <i className="fa fa-arrow-left"></i> Back to Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
