import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Navbar from "../layouts/Navbar";
import { AuthContext } from '../config/route';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, handleAuth } = useContext(AuthContext);

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required!"),
    password: Yup.string().required("Password is required!"),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Simulate API call for login
        const fakeAuth = new Promise((resolve, reject) => {
          setTimeout(() => {
            if (values.username === "admin" && values.password === "password") {
              resolve("Login Successful");
            } else {
              reject("Invalid Credentials");
            }
          }, 1000);
        });

        await fakeAuth;
        handleAuth();  // Set authentication status
        setMessage("Login Successful");
        navigate("/user");
      } catch (error) {
        setLoading(false);
        setMessage(error);
      }
    }
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Navbar>
      <section className="vh-70 mt-5" style={{ minWidth: "500px" }}>
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <h1 className="mb-5">Login</h1>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control form-control-lg"
                    {...formik.getFieldProps('username')}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="error-feedback">{formik.errors.username}</div>
                  ) : null}
                </div>

                {/* Password input */}
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error-feedback">{formik.errors.password}</div>
                  ) : null}
                </div>

                {/* Submit button */}
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    disabled={loading}
                  >
                    {loading && <span className="spinner-border spinner-border-sm"></span>}
                    <span>Login</span>
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account? <a href="/register">Register here</a>
                  </p>
                </div>
                
                {/* Error message */}
                <div className="form-group">
                  {message && (
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Navbar>
  );
};

export default Login;
