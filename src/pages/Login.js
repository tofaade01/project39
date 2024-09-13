import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authStore'; // Import the login action from Redux store

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
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
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Dispatch the login action from Redux
        await dispatch(login({ email: values.email, password: values.password }));
        setLoading(false);
        navigate('/'); // Redirect to home on successful login
      } catch (err) {
        setLoading(false);
        setMessage(err.message || 'Login failed');
      }
    },
  });

  // If authenticated, redirect to the user profile page
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className="vh-70 mt-5" style={{ minWidth: '500px' }}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Login illustration"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <h1 className="mb-5">Login</h1>
            <form onSubmit={formik.handleSubmit}>
              {/* Email input */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  className="form-control form-control-lg"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error-feedback">{formik.errors.email}</div>
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
                  disabled={loading}  // Disable button during loading
                >
                  {loading && <span className="spinner-border spinner-border-sm"></span>}
                  <span>Login</span>
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account? <a href="/register">Register here</a>
                </p>
              </div>

              {/* Error or success message */}
              {message && (
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              )}

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
