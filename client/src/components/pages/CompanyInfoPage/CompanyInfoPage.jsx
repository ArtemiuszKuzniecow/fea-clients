import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { SortingArrowsImg } from "../../../assets/styles/svg";
import useUserData from "../../../hooks/useUserData";
import { deleteLead } from "../../../store/Leads/actions";
import { deleteCompanyComment } from "../../../store/LeadsComments/actions";
import { getAllCompanyComments } from "../../../store/LeadsComments/selecetors";
import { deleteOrder } from "../../../store/Orders/actions";
import { deleteOrderComment } from "../../../store/OrdersComments/actions";
import { getAllOrdersComments } from "../../../store/OrdersComments/selectors";
import MyButton from "../../common/Button/MyButton";
import Comments from "../../common/Comment/Comments";
import CompanyContacts from "../../common/CompanyContacts/CompanyContacts";
import Headline from "../../common/Headline";
import ModalContent from "../../common/ModalContent/ModalContent";
import ModalWindow from "../../common/ModalWindow/ModalWindow";
import OrderCard from "../../common/OrderCard/OrderCard";
import TableLayout from "../../common/TableLayout";
import Loader from "../../ui/Loader/Loader";

const CompanyInfoPage = () => {
  const { id } = useParams();
  const { isLoading, isLeadsLoading, isOrdersLoading, companies, orders } =
    useUserData();
  const dispatch = useDispatch();
  const history = useHistory();

  const [currentCompany, setCurrentCompany] = useState();
  const [currentOrders, setCurrentOrders] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const leadsComments = useSelector(getAllCompanyComments(id));
  const ordersComments = useSelector(getAllOrdersComments());

  useEffect(() => {
    if (companies && orders) {
      setCurrentCompany(companies.find((item) => item.id === id));
      setCurrentOrders(orders.filter((o) => o.companyId === id));
    }
  }, [isLoading, isLeadsLoading, isOrdersLoading]);

  const handleDeleteCompany = (currentCompany) => {
    dispatch(deleteLead(currentCompany));
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

  return !isLoading && !isLeadsLoading && !isOrdersLoading ? (
    currentCompany && (
      <>
        <div>
          <Headline>{currentCompany.company}</Headline>
          <div className="container">
            <div className="flex flex-wrap gap-3">
              <div className="w-full">
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="py-3 px-6">
                          Основные направления компании
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Тип контракта
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Виды перевозок
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Вид контрактов
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="py-3 px-6">
                          {currentCompany.directions}
                        </td>
                        <td className="py-3 px-6">
                          {currentCompany.contractType}
                        </td>
                        <td className="py-3 px-6">
                          {currentCompany.containersTypes}
                        </td>
                        <td className="py-3 px-6">
                          {currentCompany.contractType}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex flex-row justify-between w-full">
                <div>
                  <CompanyContacts
                    phone={currentCompany.contacts.phone}
                    email={currentCompany.contacts.email}
                    website={currentCompany.contacts.website}
                    manager={currentCompany.manager}
                    city={currentCompany.city}
                  />
                  <div className="mt-3 mb-1">
                    <Link to={`${id}/edit`}>
                      <MyButton>Изменить информацию о компании</MyButton>
                    </Link>
                  </div>
                  <MyButton
                    onClick={() => setIsOpen((prevState) => !prevState)}
                  >
                    Удалить компанию из базы
                  </MyButton>
                  <ModalWindow
                    open={isOpen}
                    onClose={() => setIsOpen((prevState) => !prevState)}
                  >
                    <ModalContent
                      deleteFunc={() => handleDeleteCompany(currentCompany)}
                      openFunc={() => setIsOpen((prevState) => !prevState)}
                      item="компанию"
                    />
                  </ModalWindow>
                </div>
                <div className="w-2/3">
                  <Comments
                    companyId={currentCompany.id}
                    typeOfComments="company"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <TableLayout>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Компания
                </th>
                <th scope="col" className="py-3 px-6 max-sm:hidden">
                  <div className="flex items-center">
                    Статус запроса <SortingArrowsImg />
                  </div>
                </th>
                <th scope="col" className="py-3 px-6 max-md:hidden">
                  <div className="flex items-center">
                    Статус груза <SortingArrowsImg />
                  </div>
                </th>
                <th scope="col" className="py-3 px-6 max-sm:hidden">
                  <div className="flex items-center">
                    Дата запроса <SortingArrowsImg />
                  </div>
                </th>
                <th scope="col" className="py-3 px-6 max-md:hidden">
                  <div className="flex items-center">
                    Вид перевозки <SortingArrowsImg />
                  </div>
                </th>
                <th scope="col" className="py-3 px-6 max-xl:hidden">
                  <div className="flex items-center">
                    Инкотермс <SortingArrowsImg />
                  </div>
                </th>
                <th scope="col" className="py-3 px-6 max-xl:hidden">
                  <div className="flex items-center">
                    Характер груза <SortingArrowsImg />
                  </div>
                </th>
                <th scope="col" className="py-3 px-6 max-xl:hidden">
                  <div className="flex items-center">
                    Вид контракта <SortingArrowsImg />
                  </div>
                </th>
                <th scope="col" className="py-3 px-6 lg:hidden">
                  click
                </th>
                <th scope="col" className="py-3 px-6 max-lg:hidden"></th>
                <th scope="col" className="py-3 px-6 max-lg:hidden"></th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length >= 1 ? (
                currentOrders.map((order) => {
                  return (
                    <OrderCard
                      order={order}
                      companyName={currentCompany.company}
                      key={order.orderId}
                    />
                  );
                })
              ) : (
                <h3>Запросов нет</h3>
              )}
            </tbody>
          </TableLayout>
        </div>
      </>
    )
  ) : (
    <Loader />
  );
};

export default CompanyInfoPage;
