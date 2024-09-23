import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authStore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import images from '../images/login.svg';
import imagesOca from '../images/OCA.svg';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required!'),
    password: Yup.string().required('Password is required!'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      dispatch(login({ email: values.email, password: values.password }));
      setLoading(false);
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Login successful!');
      const timer = setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
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
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <img
            src={imagesOca}
            alt="OCA Logo"
            className="img-fluid"
            style={{ width: '100px', height: 'auto' }}
          />
        </div>
        <div className="row d-flex align-items-center">
          <div className="col-md-6 mt-5" style={{ paddingLeft: '51px' }}>
            <div style={{ marginBottom: '20px' }}>
              <img
                src={imagesOca}
                alt="OCA Logo"
                className="img-fluid"
                style={{
                  width: '250px',
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>
            <h2
              className="mb-2"
              style={{
                fontWeight: 'bold',
                color: '#BA0E44',
                fontSize: '26px',
                marginTop: '0',
              }}
            >
              Boost Your Social Life,
            </h2>
            <h2
              className="mb-2"
              style={{
                fontWeight: 'bold',
                color: '#BA0E44',
                fontSize: '26px',
                marginTop: '0',
              }}
            >
              blast it anywhere in one-click away!
            </h2>
            <p className="lead" style={{ fontSize: '14px', color: '#BA0E44' }}>
              Save your time, let us blast it for you!
            </p>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-outline col-9 mb-2">
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

              <div className="form-outline col-9 mb-2">
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

              <div className="text-center text-lg-start mt-2 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-md btn-block"
                  style={{
                    paddingLeft: '2.5rem',
                    paddingRight: '2.5rem',
                    backgroundColor: '#BA0E44',
                  }}
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
                <p className="small fw-bold mt-1 pt-1 mb-0">
                  Don't have an account? <a href="/register">Register here</a>
                </p>
              </div>
            </form>
          </div>
          <div className="col-md-6 right-side">
            <img
              src={images}
              alt="phone illustration"
              className="img-fluid"
              style={{ maxWidth: '700px' }}
            />
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
