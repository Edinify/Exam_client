import axios from "axios";
import {
  EXPENSES_ACTION_TYPE,
  EXPENSES_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/expense`,
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
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
const toastError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    toastClassName: "custom-toast",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
const pageLoading = (loadingValue) => ({
  type: EXPENSES_ACTION_TYPE.EXPENSES_LOADING,
  payload: loadingValue,
});
const modalLoading = (loadingValue) => ({
  type: EXPENSES_MODAL_ACTION_TYPE.EXPENSES_MODAL_LOADING,
  payload: loadingValue,
});

export const getExpensesPaginationAction =
  (length, startDate, endDate, category, sort) => async (dispatch) => {
    dispatch(pageLoading(true));
    try {
      const { data } = await API.get(
        `/?length=${length}&startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&category=${category || ""}&sort=${sort || "oldest"}`
      );
      dispatch({
        type: EXPENSES_ACTION_TYPE.GET_EXPENSES_PAGINATION,
        payload: data,
      });
    } catch (error) {
      // console.log(error);
      const originalRequest = error.config;
      if (error.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const token = await refreshApi.get("/");
          localStorage.setItem(
            "auth",
            JSON.stringify({
              AccessToken: token.data.accesstoken,
            })
          );

          const { data } = await API.get(
            `/?length=${length}&startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&category=${category || ""}&sort=${sort || "oldest"}`
          );

          // dispatch({
          //   type: EXPENSES_ACTION_TYPE.GET_EXPENSES_LAST_PAGE,
          //   payload: page,
          // });
          dispatch({
            type: EXPENSES_ACTION_TYPE.GET_EXPENSES_PAGINATION,
            payload: data,
          });
        } catch (error) {
          // console.log(error);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    } finally {
      dispatch(pageLoading(false));
    }
  };

export const createExpensesAction = (expensesData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.post("/", expensesData);

    dispatch({
      type: EXPENSES_MODAL_ACTION_TYPE.EXPENSES_OPEN_MODAL,
      payload: false,
    });

    dispatch({
      type: EXPENSES_ACTION_TYPE.CREATE_EXPENSES,
      payload: data,
    });

    toastSuccess("Yeni məhsul əlavə edildi");
  } catch (error) {
    toastError("Xəta baş verdi.");
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );

        const { data } = await API.post("/", expensesData);

        dispatch({
          type: EXPENSES_ACTION_TYPE.CREATE_EXPENSES,
          payload: data,
        });

        dispatch({
          type: EXPENSES_MODAL_ACTION_TYPE.EXPENSES_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Yeni məhsul əlavə edildi");
      } catch (error) {
        // console.log(error);
        toastError("Xəta baş verdi.");
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const updateExpensesAction = (_id, expensesData) => async (dispatch) => {
  dispatch(modalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, expensesData);
    dispatch({ type: EXPENSES_ACTION_TYPE.UPDATE_EXPENSES, payload: data });
    dispatch({
      type: EXPENSES_MODAL_ACTION_TYPE.EXPENSES_OPEN_MODAL,
      payload: false,
    });
    dispatch({
      type: EXPENSES_MODAL_ACTION_TYPE.EXPENSES_MODAL_ACTIVATE_GET,
      payload: "update",
    });
    toastSuccess("Məhsul yeniləndi");
  } catch (error) {
    toastError("Xəta baş verdi.");
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );
        const { data } = await API.patch(`/${_id}`, expensesData);
        dispatch({ type: EXPENSES_ACTION_TYPE.UPDATE_EXPENSES, payload: data });
        dispatch({
          type: EXPENSES_MODAL_ACTION_TYPE.EXPENSES_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Məhsul yeniləndi");
      } catch (error) {
        // console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  } finally {
    dispatch(modalLoading(false));
  }
};

export const deleteExpensesAction = (id) => async (dispatch) => {
  try {
    console.log(id, "deleted item id");
    const { data } = await API.delete(`/${id}`);
    dispatch({ type: EXPENSES_ACTION_TYPE.DELETE_EXPENSES, payload: data._id });

    toastSuccess("Məhsul silindi");
  } catch (error) {
    toastError("Xəta baş verdi.");
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );

        const { data } = await API.delete(`/${id}`);
        dispatch({
          type: EXPENSES_ACTION_TYPE.DELETE_EXPENSES,
          payload: data._id,
        });

        toastSuccess("Məhsul silindi");
      } catch (error) {
        // console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  }
};
