import * as Yup from "yup";

const FORMS = {
  SIGN_IN: {
    INIT: {
      email: "",
      password: "",
    },
    SCHEME: Yup.object().shape({
      email: Yup.string().email().required("This field is required."),
      password: Yup.string().min(8).required("This field is required."),
    }),
  },
  SIGN_UP: {
    INIT: {
      email: "",
      password: "",
      confirmationPassword: "",
    },
    SCHEME: Yup.object().shape({
      email: Yup.string().email().required("This field is required."),
      password: Yup.string().min(8).required("This field is required."),
      confirmationPassword: Yup.string()
        .min(8)
        .oneOf([Yup.ref("password"), null], "Passwords don't match.")
        .required("This field is required."),
    }),
  },
  PRODUCT: {
    INIT: {
      image: "",
      title: "",
      description: "",
      price: "",
      discount: "",
      discount_time: "",
    },
    SCHEME: Yup.object().shape({
      image: Yup.string().required("This field is required."),
      title: Yup.string()
        .min(20, "Minimum 20 symbols.")
        .max(60, "Maximum 60 symbols.")
        .required("This field is required."),
      description: Yup.string().max(200, "Maximum 200 symbols."),
      price: Yup.number()
        .positive("Value must be a positive number.")
        .max(99999999.99, "Maximum value 99999999.99.")
        .required("This field is required."),
      discount: Yup.number()
        .integer("Validates that a number is an integer.")
        .positive("Value must be a positive number.")
        .min(10, "Minimum value 10.")
        .max(90, "Maximum value 90."),
      discount_time: Yup.date()
        .min(new Date())
        .when("discount", {
          is: (discount) => discount,
          then: Yup.date().min(new Date()).required("This field is required."),
        }),
    }),
  },
};

export default FORMS;
