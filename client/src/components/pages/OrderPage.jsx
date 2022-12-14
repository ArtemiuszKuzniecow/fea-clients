import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import getDateFormat from "../../utils/getDateFormat";
import useUserData from "../../hooks/useUserData";
import { deleteOrderComment } from "../../store/OrdersComments/actions";
import { deleteOrder, editOrderParameter } from "../../store/Orders/actions";
import { getAllOrdersCommentsById } from "../../store/OrdersComments/selectors";
import MyButton from "../common/MyButton";
import Comments from "../common/Comment/Comments";
import TextField from "../common/TextField";
import ModalContent from "../common/ModalContent";
import ModalWindow from "../common/ModalWindow/ModalWindow";
import Loader from "../ui/Loader/Loader";
import Headline from "../common/Headline";
import TableLayout from "../common/TableLayout";

const OrderPage = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading, isLeadsLoading, isOrdersLoading, orders, companies } =
    useUserData();
  const orderComments = useSelector(getAllOrdersCommentsById(_id));

  const [newPrice, setNewPrice] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState({ price: "" });
  useEffect(() => {
    if (orders && companies) {
      setCurrentOrder(orders.find((order) => order._id === _id));
    }
  }, [isLoading, isLeadsLoading, isOrdersLoading]);
  useEffect(() => {
    if (currentOrder) {
      setCurrentCompany(
        companies.find((company) => company._id === currentOrder.companyId)
      );
    }
  }, [currentOrder]);

  const toggleNewPrice = () => {
    setNewPrice((prevState) => !prevState);
  };

  const handleChangePrice = (target) => {
    setPrice({ price: target.value });
  };

  const handleRefreshPrice = () => {
    dispatch(
      editOrderParameter({ payload: price, id: _id, parameter: "price" })
    );
    toggleNewPrice();
  };

  const handleCloseOrder = () => {
    dispatch(
      editOrderParameter({ payload: true, id: _id, parameter: "isClosed" })
    );
  };

  const handleDeleteOrder = () => {
    dispatch(deleteOrder(currentOrder));
    orderComments &&
      orderComments.forEach((c) => dispatch(deleteOrderComment(c)));
    history.push("/orders-list");
  };

  return currentOrder && currentCompany ? (
    <>
      <Headline>{currentCompany.company}</Headline>

      <div className="container">
        {/* CARGO INFO */}
        <div className="flex flex-wrap justify-between">
          <div className="w-1/2 max-lg:w-full">
            <div className="lg:mr-2">
              <TableLayout>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Данные о грузе
                    </th>
                    <th scope="col" className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Вес груза</th>
                    <td className="py-3 px-6">{currentOrder.weight}</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Объём груза</th>
                    <td className="py-3 px-6">{currentOrder.volume}</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Характер груза</th>
                    <td className="py-3 px-6">{currentOrder.typeOfCargo}</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Код ТН ВЭД</th>
                    <td className="py-3 px-6">{currentOrder.hsCode}</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Температурный режим</th>
                    <td className="py-3 px-6">{currentOrder.temperature}</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Класс опасности</th>
                    <td className="py-3 px-6">{currentOrder.hazard}</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Вид упаковки</th>
                    <td className="py-3 px-6">{currentOrder.package}</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Можно ли штабелировать</th>
                    <td className="py-3 px-6">
                      {currentOrder.transshipment ? "Да" : "Нет"}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">
                      Дополнительная информация по запросу
                    </th>
                    <td className="py-3 px-6">{currentOrder.special}</td>
                  </tr>
                </tbody>
              </TableLayout>
              {!newPrice ? (
                <div className="shadow-md my-3">
                  <h4 className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-3  sm:rounded-t-lg">
                    Ставка:{" "}
                  </h4>
                  <p className="bg-white p-5">{currentOrder?.price?.price}</p>
                </div>
              ) : null}
              {newPrice ? (
                <div className="m-3">
                  <TextField
                    type="text"
                    name="price"
                    value={currentOrder.price?.price}
                    hasButton={true}
                    buttonText="Обновить"
                    onChange={handleChangePrice}
                    onClick={handleRefreshPrice}
                  />
                </div>
              ) : null}
              <div className="flex flex-col w-3/4 max-lg:w-full">
                <MyButton onClick={toggleNewPrice}>Обновить ставку</MyButton>
                <Link to={"/" + currentCompany._id}>
                  <MyButton width="full" color="green">
                    Информация о компании
                  </MyButton>
                </Link>
              </div>
            </div>
          </div>

          {/* LOGISTICS INFO */}
          <div className="w-1/2 max-lg:w-full">
            <div className="lg:ml-2">
              <TableLayout>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Данные о маршруте
                    </th>
                    <th scope="col" className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Инкотермс</th>
                    <td className="py-3 px-6">{currentOrder.incoterms}</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Адрес забора груза</th>
                    <td className="py-3 px-6">{currentOrder.pickupAddress}</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Место таможенного оформления</th>
                    <td className="py-3 px-6">{currentOrder.customs}</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Адрес доставки груза</th>
                    <td className="py-3 px-6">
                      {currentOrder.deliveryAddress}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Актуальность груза</th>
                    <td
                      className={`py-3 px-6 ${
                        currentOrder.isActual ? "bg-green-300" : "bg-red-300"
                      }`}
                    >
                      {currentOrder.isActual
                        ? "Актуальный груз"
                        : "Неактуальный груз"}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Когда забирать</th>
                    <td className="py-3 px-6">{currentOrder.pickupDate}</td>
                  </tr>
                </tbody>
              </TableLayout>
              <TableLayout>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Данные о компании и запросе
                    </th>
                    <th scope="col" className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Вид перевозки</th>
                    <td className="py-3 px-6">
                      {currentOrder.containersTypes}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Вид контракта</th>
                    <td className="py-3 px-6">{currentOrder.contractType}</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Как часто возит</th>
                    <td className="py-3 px-6">{currentOrder.howOften}</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="py-3 px-6">Дата запроса</th>
                    <td className="py-3 px-6">
                      {getDateFormat(currentOrder.date, ".")}
                    </td>
                  </tr>
                  <tr
                    className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${
                      currentOrder.isClosed ? "bg-red-200" : ""
                    }`}
                  >
                    <th className="py-3 px-6">Статус запроса</th>
                    <td className="py-3 px-6">
                      {currentOrder.isClosed
                        ? "Запрос закрыт"
                        : currentOrder.status}
                    </td>
                  </tr>
                </tbody>
              </TableLayout>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-1/2 max-lg:w-full ">
            <MyButton
              onClick={() => setIsOpen((prevState) => !prevState)}
              color="red"
            >
              Удалить запрос из базы
            </MyButton>
            <ModalWindow
              open={isOpen}
              onClose={() => setIsOpen((prevState) => !prevState)}
            >
              <ModalContent
                deleteFunc={() => handleDeleteOrder()}
                openFunc={() => setIsOpen((prevState) => !prevState)}
                item="запрос"
              />
            </ModalWindow>
            <Headline>
              <div
                className={`rounded-xl ${
                  !currentOrder.isClosed ? "bg-green-100" : "bg-red-300"
                }`}
              >
                {currentOrder.isClosed ? "Запрос закрыт" : "Запрос открыт"}
              </div>
            </Headline>
            {!currentOrder.isClosed && (
              <MyButton color="red" onClick={handleCloseOrder}>
                Закрыть запрос
              </MyButton>
            )}
          </div>
          <div className="w-1/2 max-lg:w-full">
            <Comments companyId={currentCompany._id} typeOfComments="order" />
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default OrderPage;
