// import { useSelector } from "react-redux";
import * as yup from "yup";

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const useValidationSchema = (modalData) => {
  const ValidationSchema = yup.object().shape({
    fullName: yup
      .string()
      .min(3, "Mininum 3 hərfdən ibarət olmalıdır.")
      .required("Bu xana tələb olunur."),
    email: yup
      .string()
      .email("Email düzgün deyil.")
      .required("Bu xana tələb olunur."),
    password: yup.string().min(6, "Mininum 6 simvoldan ibarət olmalıdır."),
    // fin:yup.string()
    // .matches(/^[a-zA-Z0-9]*$/, "Yalnız hərf və rəqəmlərdən ibarət olmalıdır.")
    // .min(7, "Minimum 7 simvoldan ibarət olmalıdır.")
    // .required("Bu xana tələb olunur."),
  });

  return ValidationSchema;
};
