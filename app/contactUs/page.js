"use client";
import * as Yup from "yup";
import { Formik } from "formik";

const ContactUs = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required().max(50),
    email: Yup.string().email().required("Acha ujinga, andika freshi"),
    message: Yup.string().required("Sasa unamaana gani, kuacha hapa wazi"),
  });
  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const payload = {
          name: values.name,
          email: values.email,
          message: values.message,
        };
        console.log(values);
        //function
      }}
      initialValues={{ name: "", email: "", message: "" }}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <div className="flex justify-center">
          <div className=" rounded-lg w-11/12 md:w-6/12 my-12 md:my-24 ">
            <h1 className="text-2xl md:text-4xl font-bold  pb-2">Contact Us</h1>
            <p className="text-mutedText ">
              You can reach out to us via form below
            </p>
            <form onSubmit={handleSubmit} className=" space-y-2 md:space-y-4 mt-8">
              {/* Single form group */}
              <div className="space-y-1">
                <p>Full Name</p>
                <input
                  value={values.name}
                  onChange={handleChange}
                  name="name"
                  className="form-style"
                  placeholder="Enter your name"
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              <div className="space-y-1">
                <p>Email</p>
                <input
                  value={values.email}
                  name="email"
                  onChange={handleChange}
                  className="form-style"
                  placeholder="Enter your email"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="space-y-1">
                <p>Message</p>
                <textarea
                  value={values.message}
                  name="message"
                  onChange={handleChange}
                  className="form-style"
                  placeholder="Write something here..."
                />
                {errors.message && touched.message && (
                  <p className="text-red-500 text-sm">{errors.message}</p>
                )}
              </div>
              {/* The end */}
              <button
                className="bg-primaryColor hover:scale-105 transition-all duration-300 text-white font-bold px-6 py-3 rounded "
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ContactUs;
