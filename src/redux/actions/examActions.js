import axios from "axios";
import { apiRoot } from "../../apiRoot";
import { toast } from "react-toastify";
import {
  EXAM_MODAL_ACTION_TYPE,
  EXAM_PAGE_ACTION_TYPE,
  EXAM_QUESTION_MODAL_ACTION_TYPE,
  EXAM_QUESTIONS_ACTION_TYPE,
} from "../actions-type";

const API = axios.create({
  baseURL: `${apiRoot}/exam`,
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
  withCredentials: true,
});

const REGISTERAPI = axios.create({
  baseURL: `${apiRoot}/user/auth`,
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("auth")).AccessToken
    }`;
  }

  return req;
});

REGISTERAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("auth")).AccessToken
    }`;
  }

  return req;
});

const toastSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const pageLoading = (loadingValue) => ({
  type: EXAM_PAGE_ACTION_TYPE.EXAM_LOADING,
  payload: loadingValue,
});

const modalLoading = (loadingValue) => ({
  type: EXAM_MODAL_ACTION_TYPE.EXAM_MODAL_LOADING,
  payload: loadingValue,
});

const examModalOpen = (value) => ({
  type: EXAM_MODAL_ACTION_TYPE.EXAM_OPEN_MODAL,
  payload: value,
});

// question loadingggg

const questionPageLoading = (loadingValue) => ({
  type: EXAM_QUESTIONS_ACTION_TYPE.QUESTION_LOADING,
  payload: loadingValue,
});

const questionModalLoading = (loadingValue) => ({
  type: EXAM_QUESTION_MODAL_ACTION_TYPE.QUESTION_MODAL_LOADING,
  payload: loadingValue,
});

const questionModalOpen = (value) => ({
  type: EXAM_QUESTION_MODAL_ACTION_TYPE.QUESTION_OPEN_MODAL,
  payload: value,
});

export const getExamAction =
  (length, searchQuery, type = "notHeld") =>
  async (dispatch) => {
    dispatch(pageLoading(true));
    try {
      console.log("yyyyyyyyyyyyyyyy");
      const { data } = await API.get(
        `/pagination?length=${length}&searchQuery=${
          searchQuery || ""
        }&type=${type}`
      );
      dispatch({ type: EXAM_PAGE_ACTION_TYPE.GET_EXAMS, payload: data });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(pageLoading(false));
    }
  };

export const createExamAction = (newExam) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.post("/", newExam);
    dispatch({ type: EXAM_PAGE_ACTION_TYPE.CREATE_EXAM, payload: data });
    toastSuccess("Yeni imtahan yaradıldı");
    dispatch(examModalOpen(false));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(modalLoading(false));
  }
};

export const updateExamAction = (_id, newExam) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, newExam);
    dispatch({ type: EXAM_PAGE_ACTION_TYPE.UPDATE_EXAM, payload: data });
    toastSuccess("İmtahan yeniləndi");
    dispatch(examModalOpen(false));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(modalLoading(false));
  }
};

export const deleteExamAction = (_id) => async (dispatch) => {
  try {
    await API.delete(`/${_id}`);
    dispatch({ type: EXAM_PAGE_ACTION_TYPE.DELETE_EXAM, payload: _id });
    toastSuccess("İmtahan silindi");
  } catch (error) {
    console.log(error);
  }
};

export const getExamResultAction=(_id) =>async(dispatch)=>{
  try {
    const {data} = await API.get(`/results/byExam/${_id}`);
    dispatch({type:EXAM_PAGE_ACTION_TYPE.GET_RESULTS,payload:data})
  } catch (error) {
    console.log(error)
  }
}

export const getStudentExamResultAction=()=>async(dispatch)=>{
  try {
    const {data} = await API.get("/results/bySudent");
    dispatch({type:EXAM_PAGE_ACTION_TYPE.GET_STUDENT_RESULTS,payload:data})
  } catch (error) {
    console.log(error)
  }
}

// questions  actions

export const getQuestionAction = (id) => async (dispatch) => {
  dispatch(questionPageLoading(true));
  try {
    const { data } = await API.get(`/questions?examId=${id}`);
    dispatch({ type: EXAM_QUESTIONS_ACTION_TYPE.GET_QUESTIONS, payload: data });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(questionPageLoading(false));
  }
};

export const createQuestionAction = (newQuestion) => async (dispatch) => {
  dispatch(questionModalLoading(true));
  try {
    const { data } = await API.post("/question", newQuestion);
    dispatch({
      type: EXAM_QUESTIONS_ACTION_TYPE.CREATE_QUESTION,
      payload: data,
    });
    toastSuccess("Yeni sual yaradıldı");
    dispatch(questionModalOpen(false));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(questionModalLoading(false));
  }
};

export const updateQuestionAction = (_id, newQuestion) => async (dispatch) => {
  dispatch(questionModalLoading(true));
  try {
    const { data } = await API.patch(`/question/${_id}`, newQuestion);
    dispatch({
      type: EXAM_QUESTIONS_ACTION_TYPE.UPDATE_QUESTION,
      payload: data,
    });
    dispatch(questionModalOpen(false));
    toastSuccess(" Sual yeniləndi");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(questionModalLoading(false));
  }
};
export const updateQuestionByStudentAction =
  (_id, newQuestion) => async (dispatch) => {
    dispatch(questionModalLoading(true));
    try {
      const { data } = await API.patch(
        `/question/${_id}/by-student`,
        newQuestion
      );
      dispatch({
        type: EXAM_QUESTIONS_ACTION_TYPE.UPDATE_QUESTION,
        payload: data,
      });
      dispatch(questionModalOpen(false));
      toastSuccess(" Sual yeniləndi");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(questionModalLoading(false));
    }
  };

export const deleteQuestion = (_id) => async (dispatch) => {
  try {
    await API.delete(`/question/${_id}`);
    dispatch({
      type: EXAM_QUESTIONS_ACTION_TYPE.DELETE_QUESTION,
      payload: _id,
    });
    toastSuccess("Sual silindi");
  } catch (error) {
    console.log(error);
  }
};
