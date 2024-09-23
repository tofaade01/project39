import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth-service';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import images from '../images/login.svg';
import imagesOca from '../images/OCA.svg';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Username is required!')
        .min(3, 'Must be at least 3 characters!')
        .max(20, 'Must be maximum 20 characters!'),
      email: Yup.string()
        .required('Email is required!')
        .email('Email is invalid!')
        .max(50, 'Must be maximum 50 characters!'),
      password: Yup.string()
        .required('Password is required!')
        .min(6, 'Must be at least 6 characters!')
        .max(40, 'Must be maximum 40 characters!'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await AuthService.register({
          name: values.name,
          email: values.email,
          password: values.password,
        });
        toast.success('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } catch (error) {
        toast.error(error.message || 'An error occurred during registration.');
        setLoading(false);
      }
    },
  });

  return (
    <section
      className="container-fluid register-page"
      style={{ backgroundColor: '#f9f9f9', height: '100vh' }}
    >
      <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
        <img
          src={imagesOca}
          alt="OCA Logo"
          className="img-fluid"
          style={{
            width: '100px',
            height: 'auto',
          }}
        />
      </div>
      <div className="row g-0 d-flex align-items-center h-100 mt-5">
        <div
          className="col-md-6 right-side mt-4"
          style={{ paddingLeft: '51px' }}
        >
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
            Sign up now, blast your content in one click!
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md-12 mb-2">
                <div className="form-outline col-9">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div
                      className="error-feedback"
                      style={{
                        color: 'red',
                        fontSize: '0.9rem',
                        marginTop: '5px',
                      }}
                    >
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="form-outline col-9 mb-2">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-feedback">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="form-outline col-9 mb-2">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-feedback">{formik.errors.password}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-md btn-block mb-2"
              disabled={loading}
              style={{ backgroundColor: '#BA0E44' }}
            >
              {loading ? 'Registering...' : 'Sign Up'}
            </button>
            <p className="small fw-bold mt-2 pt-1 mb-0">
              Already have an account? <a href="/login">Login here</a>
            </p>
          </form>
        </div>
        <div className="col-md-6 left-side text-align-center">
          <img
            src={images}
            alt="phone illustration"
            className="img-fluid"
            style={{ maxWidth: '700px' }}
          />
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

export default Register;
