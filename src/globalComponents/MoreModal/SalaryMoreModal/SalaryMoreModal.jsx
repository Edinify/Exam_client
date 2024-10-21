import { ReactComponent as CloseIcon } from "../../../assets/icons/more-modal/x-close.svg";
import moment from "moment";
import "moment/locale/az";

const SalaryMoreModal = ({ salary, setOpenSalaryModal }) => {
  console.log(salary, "salary,,,");

  const salaryHead = [
    { id: 1, label: "Tələbə adı" },
    { id: 2, label: "Qrup" },
    { id: 3, label: "Müqavilə" },
    { id: 4, label: "Müqavilə başlama tarixi" },
    { id: 5, label: "Müqavilə bitmə tarixi" },
    { id: 6, label: "Tələbənin aylıq ödənişi" },
    { id: 7, label: "Dərs sayı" },
    { id: 8, label: "Müəllim əməkhaqqı" },
  ];
  return (
    <div className="more-modal salary ">
      <div className="more-modal-con">
        <div className="more-modal-header">
          <h2>{salary?.teacher?.fullName}</h2>
          <div className="more-modal-header-icons">
            <div className="header-icon-close">
              <CloseIcon onClick={() => setOpenSalaryModal(false)} />
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              {salaryHead?.map((salary) => (
                <th key={salary.id}>{salary.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {salary?.salariesListEveryStudent?.map((salary, i) => (
              <tr key={i}>
                <td>{salary.student.fullName}</td>
                <td>{salary?.group?.name}</td>
                <td>{salary?.contractName}</td>
                <td>
                  {salary?.contractStartDate
                    ? moment(salary?.contractStartDate)
                        .locale("az")
                        .format("DD MMMM YYYY")
                    : ""}
                </td>
                <td>
                  {salary?.contractEndDate
                    ? moment(salary?.contractEndDate)
                        .locale("az")
                        .format("DD MMMM YYYY")
                    : ""}
                </td>
                <td>{salary?.studentMonthlyPayment}</td>
                <td>{salary?.lessonsCount}</td>
                <td>{salary?.teacherSalaryToStudentPayment} AZN</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Cəmi</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{salary.totalSalary} AZN</td>
              
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default SalaryMoreModal;
