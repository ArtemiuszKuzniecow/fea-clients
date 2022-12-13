import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import getDateFormat from "../../utils/getDateFormat";
import cargo from "../../cargo.json";
import useUserData from "../../hooks/useUserData";
import { deleteLead, editLeadParameter } from "../../store/Leads/actions";
import { deleteCompanyComment } from "../../store/LeadsComments/actions";
import { getAllCompanyComments } from "../../store/LeadsComments/selecetors";
import { deleteOrder } from "../../store/Orders/actions";
import { deleteOrderComment } from "../../store/OrdersComments/actions";
import { getAllOrdersComments } from "../../store/OrdersComments/selectors";
import MyButton from "./MyButton";
import Comments from "./Comment/Comments";
import CompanyContacts from "./CompanyContacts";
import DropDownList from "./DropDownList";
import ModalContent from "./ModalContent";
import ModalWindow from "./ModalWindow/ModalWindow";

const CompanyCard = ({ companyId }) => {
  const dispatch = useDispatch();
  const { getCompanyById } = useUserData();
  const company = getCompanyById(companyId);
  const [status, setStatus] = useState({
    date: company ? company?.status?.date : null,
    value: company ? company?.status?.value : null,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [currentOrders, setCurrentOrders] = useState();
  const [changeDate, setChangeDate] = useState(false);

  const { orders, isLoading, isOrdersLoading } = useUserData();
  const leadsComments = useSelector(getAllCompanyComments(company?._id));
  const ordersComments = useSelector(getAllOrdersComments());
  const history = useHistory();

  const handleChangeDate = () => {
    setChangeDate((prevState) => !prevState);
  };

  useEffect(() => {
    if (orders) {
      setCurrentOrders(orders.filter((o) => o.companyId === company?._id));
    }
  }, [isLoading, isOrdersLoading]);

  const handleDeleteCompany = () => {
    dispatch(deleteLead(company));
    leadsComments &&
      leadsComments.forEach((c) => dispatch(deleteCompanyComment(c)));
    ordersComments &&
      ordersComments.forEach((c) => {
        if (currentOrders.map((o) => o.orderId).includes(c.orderId)) {
          dispatch(deleteOrderComment(c));
        }
      });
    orders && currentOrders.forEach((o) => dispatch(deleteOrder(o)));
    history.push("/companies");
  };

  const handleChangeData = ({ target }) => {
    const currentDate = new Date(target.value);
    setStatus((prevState) => ({ ...prevState, date: currentDate.getTime() }));
  };
  const handleChange = (data) => {
    setStatus((prevState) => ({ ...prevState, ...data }));
  };

  const refreshStatus = () => {
    dispatch(
      editLeadParameter({
        payload: status,
        _id: company._id,
        parameter: "status",
      })
    );
  };
  return (
    company && (
      <div className="p-5 mt-5 rounded-lg shadow-lg bg-sky-50">
        <h3 className="flex justify-center rounded-lg font-medium leading-tight text-3xl mt-0 mb-2 text-sky-600 bg-white">
          {company.company}
        </h3>
        <div className="container flex flex-wrap p-5 mt-5 bg-sky-50">
          <div className="xl:w-1/4 lg:w-2/4 md:w-full sm:w-full max-sm:w-full p-5">
            <CompanyContacts
              phone={company.contacts.phone}
              email={company.contacts.email}
              website={company.contacts.website}
              manager={company.manager}
              city={company.city}
            />
          </div>
          <div className="xl:w-1/4 lg:w-2/4 md:w-full sm:w-full max-sm:w-full p-5 flex flex-col">
            {company.isRequested ? (
              <Link to={`${company._id}/orders`} className="w-full">
                <MyButton
                  isDisabled={!company.isRequested}
                  color="green"
                  width="full"
                >
                  Посмотреть все запросы
                </MyButton>
              </Link>
            ) : (
              <div>Запросов нет</div>
            )}
            <Link to={"/" + company._id} className="w-full">
              <MyButton color="green" width="full">
                Информация о компании
              </MyButton>
            </Link>

            <MyButton
              onClick={() => setIsOpen((prevState) => !prevState)}
              color="red"
              width="full"
            >
              Удалить компанию из базы
            </MyButton>
            <ModalWindow
              open={isOpen}
              onClose={() => setIsOpen((prevState) => !prevState)}
            >
              <ModalContent
                deleteFunc={() => handleDeleteCompany(company)}
                openFunc={() => setIsOpen((prevState) => !prevState)}
                item="компанию"
              />
            </ModalWindow>
          </div>

          <div className="xl:w-1/4 lg:w-2/4 md:w-full sm:w-full max-sm:w-full p-5">
            <div>
              <DropDownList
                array={
                  company.isRequested
                    ? cargo.clientStatusArray.filter((s, i) => i > 2)
                    : cargo.clientStatusArray.filter((s, i) => i !== 3)
                }
                sampleText={company.status.value}
                onChange={handleChange}
                name="value"
              />
            </div>
            {changeDate && (
              <div>
                <label htmlFor="date">Когда связаться: </label>
                <input type="date" id="date" onChange={handleChangeData} />
                <MyButton
                  onClick={() => {
                    refreshStatus();
                    handleChangeDate();
                  }}
                  color="green"
                >
                  OK
                </MyButton>
              </div>
            )}
            {!changeDate && (
              <div className="flex gap-2 items-center">
                Связаться: {getDateFormat(company.status.date, ".")}
                <MyButton onClick={handleChangeDate}>Изменить</MyButton>
              </div>
            )}
          </div>

          <div className="xl:w-1/4 lg:w-2/4 md:w-full sm:w-full max-sm:w-full p-5">
            <Comments companyId={company._id} typeOfComments="company" />
          </div>
        </div>
      </div>
    )
  );
};

CompanyCard.propTypes = {
  companyId: PropTypes.string.isRequired,
};

export default CompanyCard;
