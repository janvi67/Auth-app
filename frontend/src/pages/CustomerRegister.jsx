import React from "react";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const validationsRegister = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "First name must be at least 3 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(3, "Last name must be at least 3 characters")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  iAgree: Yup.boolean().oneOf([true], "You must accept the terms"),
});

function CustomerRegister() {
  const handleRegister = (values, { resetForm }) => {
    const { firstName, lastName, email, password } = values;

    Axios.post(
      "http://localhost:3000/api/auth/register/customer",
      {
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email: email.toLowerCase(),
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        toast.success(response.data.msg);
        resetForm();
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.msg || "Registration failed.",
          
        );
      });
  };

  return (
    <section className="bg-light p-3 p-md-4 p-xl-5">
      <Toaster />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-11">
            <div className="card border-light-subtle shadow-sm">
              <div className="row g-0">
                <div className="col-12 col-md-6">
                  <img
                    className="img-fluid rounded-start w-100 h-100"
                    loading="lazy"
                    src="https://www.questionpro.com/blog/wp-content/uploads/2023/04/customer_satisfaction.jpg"
                    alt="Welcome"
                  />
                </div>
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <div className="col-12 col-lg-11 col-xl-10">
                    <div className="card-body p-3 p-md-4 p-xl-5">
                      <h2 className="h4 text-center mb-4">Registration</h2>
                      <Formik
                        initialValues={{
                          firstName: "",
                          lastName: "",
                          email: "",
                          password: "",
                          iAgree: false,
                        }}
                        validationSchema={validationsRegister}
                        onSubmit={handleRegister}
                      >
                        <Form>
                          <div className="form-floating mb-3">
                            <Field
                              type="text"
                              name="firstName"
                              className="form-control"
                              placeholder="First Name"
                            />
                            <label>First Name</label>
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <div className="form-floating mb-3">
                            <Field
                              type="text"
                              name="lastName"
                              className="form-control"
                              placeholder="Last Name"
                            />
                            <label>Last Name</label>
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <div className="form-floating mb-3">
                            <Field
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Email"
                            />
                            <label>Email</label>
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <div className="form-floating mb-3">
                            <Field
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Password"
                            />
                            <label>Password</label>
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <div className="form-check mb-3">
                            <Field
                              type="checkbox"
                              name="iAgree"
                              className="form-check-input"
                              id="iAgree"
                            />
                            <label
                              htmlFor="iAgree"
                              className="form-check-label text-secondary"
                            >
                              I agree to the{" "}
                              <a href="#!" className="link-primary">
                                terms and conditions
                              </a>
                            </label>
                            <ErrorMessage
                              name="iAgree"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <button type="submit" className="btn btn-dark btn-lg w-100">
                            Sign Up
                          </button>
                        </Form>
                      </Formik>
                      <p className="text-center mt-4">
                        Already have an account?{" "}
                        <a href="/login" className="link-primary">
                          Sign in
                        </a>
                      </p>
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

export default CustomerRegister;
