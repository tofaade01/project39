import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layouts/Navbar';

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      phone: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required!')
        .min(3, 'Must be at least 3 characters!')
        .max(20, 'Must be maximum 20 characters!'),
      phone: Yup.string()
        .required('Phone number is required!')
        .matches(/^[0-9]+$/, 'Must be a valid phone number')
        .min(10, 'Must be at least 10 digits!')
        .max(15, 'Must be maximum 15 digits!'),
      email: Yup.string()
        .required('Email is required!')
        .email('Email is invalid!')
        .max(50, 'Must be maximum 50 characters!'),
      password: Yup.string()
        .required('Password is required!')
        .min(6, 'Must be at least 6 characters!')
        .max(40, 'Must be maximum 40 characters!'),
    }),
    onSubmit: (values) => {
      // Handle registration logic here

      // Simulate successful registration and redirect to login
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    },
  });

  return (
    <Navbar>
    <section className="text-center text-lg-start">
      <div className="container pt-4">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0 p-0">
            <img
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              style={{
                width: '485px',
                borderRadius: '25px',
                padding: '10px',
                boxShadow: '5px 10px 5px lightblue',
                height: '505px',
              }}
              alt=""
            />
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0 p-0">
            <div
              className="card cascading-right bg-body-tertiary"
              style={{
                backdropFilter: 'blur(30px)',
                marginRight: '-39px',
                borderRadius: '15px',
                padding: '10px',
                boxShadow: '10px 5px 5px black',
              }}
            >
              <div className="card-body p-3 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Daftar sekarang</h2>
                <form onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label d-flex justify-content-flex-start" htmlFor="username">
                          Username
                        </label>
                        <input
                          name="username"
                          type="text"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username ? (
                          <div className="error-feedback">{formik.errors.username}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label d-flex justify-content-flex-start" htmlFor="phone">
                          No. HP
                        </label>
                        <input
                          name="phone"
                          type="text"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.phone}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                          <div className="error-feedback">{formik.errors.phone}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label d-flex justify-content-flex-start" htmlFor="email">
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
                  <div className="form-outline mb-4">
                    <label className="form-label d-flex justify-content-flex-start" htmlFor="password">
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
                  <button type="submit" className="btn btn-primary btn-block mb-4">
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </Navbar>
  );
};

export default Register;
