import React, { useEffect, useState } from "react";
import "./financeDateFilter.css";
import { useDispatch, useSelector } from "react-redux";
import { FINANCE_FILTER_ACTION_TYPE } from "../../../../redux/actions-type";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import DateRangeModal from "../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";
import { useFinanceCustomHook } from "../../utils";
import moment from "moment";

const FinanceDateFilter = () => {
  const dispatch = useDispatch();
  const { getAllDataByMonth, getAllDataByDateRange } = useFinanceCustomHook();
  const { financeDateSelectedOption } = useSelector(
    (state) => state.financeDateFilter
  );
  const data = [
    { key: 1, name: "Cari ay" },
    { key: 3, name: "Son 3 ay" },
    { key: 6, name: "Son 6 ay" },
    { key: 12, name: "İllik" },
    { key: "", name: "Tarix seç" },
  ];
  const [openCalendar, setOpenCalendar] = useState(false);

  const [selectedDate, setSelectedDate] = useState({});

  const applyFilter = (startDate = "", endDate = "") => {
    getAllDataByDateRange(startDate, endDate);
    dispatch({
      type: FINANCE_FILTER_ACTION_TYPE.GET_CHOOSE_DATE_FILTER,
      payload: { financeChooseDate: { startDate, endDate } },
    });
    setOpenCalendar(false);
  };

  const applyMonthFilter = (option) => {
    getAllDataByMonth(option.key);
    setOpenCalendar(false);
    dispatch({
      type: FINANCE_FILTER_ACTION_TYPE.GET_MONTHS_FILTER,
      payload: { financeMonthsFilter: option.key },
    });
  };

  const selectOption = (option) => {
    dispatch({
      type: FINANCE_FILTER_ACTION_TYPE.GET_DATE_SELECTED_OPTION,
      payload: option,
    });
    if (option.name === "Tarix seç") {
      setOpenCalendar(!openCalendar);
    } else {
      applyMonthFilter(option);
      setSelectedDate({});
    }
  };

  useEffect(() => {
    dispatch({
      type: FINANCE_FILTER_ACTION_TYPE.GET_DATE_SELECTED_OPTION,
      payload: {
        key: 1,
        name: "Cari ay",
      },
    });
    return () => {
      dispatch({
        type: FINANCE_FILTER_ACTION_TYPE.GET_MONTHS_FILTER,
        payload: { financeMonthsFilter: "" },
      });
    };
  }, []);

  return (
    <>
      <div
        className="finance-date-filter-con"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="finance-date-filter desktop">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => selectOption(item)}
              className={`content-box ${
                financeDateSelectedOption.key === item.key ? "active" : ""
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>

        <div className="finance-date-filter mobile">
          <Swiper slidesPerView={4} spaceBetween={12} className="mySwiper">
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  onClick={() => selectOption(item)}
                  className={`content-box ${
                    financeDateSelectedOption.key === item.key ? "active" : ""
                  }`}
                >
                  {item.name}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div
          style={{
            marginLeft: "10px",
          }}
        >
          {moment(selectedDate.startDate).isSame(new Date(), "day") &&
          moment(selectedDate.endDate).isSame(new Date(), "day") ? null : (
            <h2 style={{ color: "var(--neutrals-600)" }}>
              {(selectedDate?.startDate &&
                selectedDate?.endDate &&
                moment(selectedDate.startDate)
                  .locale("az")
                  .format("MMMM YYYY") !=
                  moment(selectedDate.endDate)
                    .locale("az")
                    .format("MMMM YYYY") &&
                `${moment(selectedDate.startDate)
                  .locale("az")
                  .format("MMMM YYYY")} - ${moment(selectedDate.endDate)
                  .locale("az")
                  .format("MMMM YYYY")}`) ||
                moment(selectedDate.startDate).locale("az").format("MMMM YYYY")}
            </h2>
          )}
        </div>
      </div>

      {openCalendar && (
        <DateRangeModal
          applyFilter={applyFilter}
          setOpenCalendar={setOpenCalendar}
          setSelectedDate={setSelectedDate}
        />
      )}
    </>
  );
};

export default FinanceDateFilter;
