import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', values);
      
        console.log(response.data);
        toast.success(response.data.msg);
        resetForm();
      } catch (error) {
        if (error.response?.data?.message) {
            toast.error(
                error?.response?.data?.msg || "Login failed.",
               
              );
        } else {
            toast.error(
                error?.response?.data?.msg || "Login failed.",
           
              );
        }
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <section className="bg-light p-3 p-md-4 p-xl-5">
    <Toaster/>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-11">
            <div className="card border-light-subtle shadow-sm">
              <div className="row g-0">
                <div className="col-12 col-md-6">
                  <img
                    className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                    loading="lazy"
                    src="https://bootstrapbrain.com/demo/components/registrations/registration-8/assets/img/logo-img-1.webp"
                    alt="Welcome back you've been missed!"
                  />
                </div>
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <div className="col-12 col-lg-11 col-xl-10">
                    <div className="card-body p-3 p-md-4 p-xl-5">
                      <h4 className="text-center mb-4">Login</h4>

                      <form onSubmit={formik.handleSubmit}>
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                            placeholder="name@example.com"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                          />
                          <label htmlFor="email">Email</label>
                          {formik.touched.email && formik.errors.email && (
                            <div className="invalid-feedback">{formik.errors.email}</div>
                          )}
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                            placeholder="Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                          />
                          <label htmlFor="password">Password</label>
                          {formik.touched.password && formik.errors.password && (
                            <div className="invalid-feedback">{formik.errors.password}</div>
                          )}
                        </div>

                        <div className="form-check mb-3">
                          <input className="form-check-input" type="checkbox" value="" id="remember_me" />
                          <label className="form-check-label" htmlFor="remember_me">
                            Keep me logged in
                          </label>
                        </div>

                        <div className="d-grid">
                          <button className="btn btn-dark btn-lg" type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? 'Logging in...' : 'Log in now'}
                          </button>
                        </div>
                      </form>

                      <div className="text-center mt-4">
                        <a href="/register" className="link-secondary text-decoration-none">Create new account</a> | 
                        <a href="#" className="link-secondary text-decoration-none ms-2">Forgot password</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
