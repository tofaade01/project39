import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authStore'; // Import the login action from Redux store
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import images from '../images/login.svg';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access authentication state from Redux
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  // Validation schema for the login form
  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required!'),
    password: Yup.string().required('Password is required!'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      // Dispatch the login action from Redux
      dispatch(login({ email: values.email, password: values.password }));
      setLoading(false);
    },
  });

  // Handle success and error notifications
  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Login successful!');
      // Delay navigation by 2 seconds (2000 ms)
      const timer = setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);

      // Cleanup the timer when the component unmounts
      return () => clearTimeout(timer);
    } else if (error) {
      toast.error(error);
    }
  }, [isAuthenticated, error, navigate]);

  return (
    <section className="vh-70" style={{ minWidth: '500px' }}>
      <div
        className="container-fluid h-custom"
        style={{ backgroundColor: '#f9f9f9', height: '100vh' }}
      >
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-6 left-side text-align-center">
            <img
              src={images} // Use the phone image as in the screenshot
              alt="phone illustration"
              className="img-fluid"
              style={{ maxWidth: '700px' }}
            />
          </div>
          <div className="col-md-6 right-side">
            <h2
              className="mb-4"
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#f63f64',
              }}
            >
              Welcome Back!
            </h2>
            <p
              className="lead"
              style={{ fontSize: '1.2rem', color: '#f63f64' }}
            >
              Login to manage your social media blasts.
            </p>
            <form onSubmit={formik.handleSubmit}>
              {/* Email input */}
              <div className="form-outline col-9 mb-4">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="form-control form-control-md"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div
                    className="error-feedback"
                    style={{
                      color: 'red',
                      fontSize: '0.9rem',
                      marginTop: '5px',
                    }}
                  >
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              {/* Password input */}
              <div className="form-outline col-9 mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-md"
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
                  style={{
                    paddingLeft: '2.5rem',
                    paddingRight: '2.5rem',
                    backgroundColor: '#f63f64',
                  }}
                  disabled={loading} // Disable button during loading
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account? <a href="/register">Register here</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </section>
  );
};

export default Login;
