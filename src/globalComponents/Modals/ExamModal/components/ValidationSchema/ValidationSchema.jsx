import * as yup from "yup";

export const ValidationSchema = yup.object().shape({
  examName: yup.string().required("Bu xana tələb olunur."),
});
