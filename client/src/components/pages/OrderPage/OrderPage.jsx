import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import getDateFormat from "../../../utils/getDateFormat";
import useUserData from "../../../hooks/useUserData";
import { deleteOrderComment } from "../../../store/OrdersComments/actions";
import { deleteOrder, editOrderParameter } from "../../../store/Orders/actions";
import { getAllOrdersCommentsById } from "../../../store/OrdersComments/selectors";
import MyButton from "../../common/Button/MyButton";
import Comments from "../../common/Comment/Comments";
import TextField from "../../common/Form/TextField/TextField";
import ModalContent from "../../common/ModalContent/ModalContent";
import ModalWindow from "../../common/ModalWindow/ModalWindow";
import Loader from "../../ui/Loader/Loader";
import Headline from "../../common/Headline";

const OrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading, isLeadsLoading, isOrdersLoading, orders, companies } =
    useUserData();
  const orderComments = useSelector(getAllOrdersCommentsById(id));

  const [newPrice, setNewPrice] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState({ price: "" });

  useEffect(() => {
    if (orders && companies) {
      setCurrentOrder(orders.find((order) => order.orderId === id));
    }
  }, [isLoading, isLeadsLoading, isOrdersLoading]);
  useEffect(() => {
    if (currentOrder) {
      setCurrentCompany(
        companies.find((company) => company.id === currentOrder.companyId)
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
      editOrderParameter({ payload: price, id: id, parameter: "price" })
    );
    toggleNewPrice();
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

      <div>
        <div>
          <h2>Данные о грузе</h2>
          <hr />
          <div>
            <h4>Вес груза:</h4>
            <p>{currentOrder.weight}</p>
          </div>
          <hr />
          <div>
            <h4>Объём груза: </h4>
            <p>{currentOrder.volume}</p>
          </div>
          <hr />
          <div>
            <h4>Характер груза: </h4>
            <p>{currentOrder.typeOfCargo}</p>
          </div>
          <hr />
          <div>
            <h4>Код ТН ВЭД: </h4>
            <p>{currentOrder.hsCode}</p>
          </div>
          <hr />
          <div>
            <h4>Температурный режим: </h4>
            <p>{currentOrder.temperature}</p>
          </div>
          <hr />
          <div>
            <h4>Класс опасности: </h4>
            <p>{currentOrder.hazard}</p>
          </div>
          <hr />
          <div>
            <h4>Вид упаковки: </h4>
            <p>{currentOrder.package}</p>
          </div>
          <hr />
          <div>
            <h4>Можно ли штабелировать: </h4>
            <p>{currentOrder.transshipment ? "Да" : "Нет"}</p>
          </div>
          <hr />
          <div>
            <h4>Дополнительная информация по запросу: </h4>
            <p>{currentOrder.special}</p>
          </div>
          <hr />
        </div>
        <div>
          <h2>Данные о маршруте</h2>
          <hr />
          <div>
            <h4>Инкотермс: </h4>
            <p>{currentOrder.incoterms}</p>
          </div>
          <hr />
          <div>
            <h4>Адрес забора груза: </h4>
            <p>{currentOrder.pickupAddress}</p>
          </div>
          <hr />
          <div>
            <h4>Место таможенного оформления: </h4>
            <p>{currentOrder.customs}</p>
          </div>
          <hr />
          <div>
            <h4>Адрес доставки груза: </h4>
            <p>{currentOrder.deliveryAddress}</p>
          </div>
          <hr />
          <div>
            <h4>Актуальность груза:</h4>
            <p>
              {currentOrder.isActual ? "Актуальный груз" : "Неактуальный груз"}
            </p>
          </div>
          <hr />
          <div>
            <h4>Когда забирать: </h4>
            <p>{currentOrder.pickupDate}</p>
          </div>
          <hr />
        </div>

        <div>
          <h2>Данные о компании и запросе</h2>
          <hr />

          <div>
            <h4>Вид перевозки: </h4>
            <p>{currentOrder.containersTypes}</p>
          </div>
          <hr />
          <div>
            <h4>Вид контракта: </h4>
            <p>{currentOrder.contractType}</p>
          </div>
          <hr />
          <div>
            <h4>Как часто возит: </h4>
            <p>{currentOrder.howOften}</p>
          </div>
          <hr />
          <div>
            <h4>Дата запроса: </h4>
            <p>{getDateFormat(currentOrder.date, ".")}</p>
          </div>
          <hr />
          <div>
            <div>
              <h4>Статус запроса: </h4>
              <p>{currentOrder.status}</p>
            </div>
            <hr />
            <div>
              <h4>Ставка: </h4>
              <p>{currentOrder?.price?.price}</p>
            </div>
            <hr />
            <div>
              <Link to={"/" + currentCompany.id}>
                <MyButton>Информация о компании</MyButton>
              </Link>
              <MyButton onClick={toggleNewPrice}>Обновить ставку</MyButton>
            </div>
            {newPrice ? (
              <TextField
                type="text"
                name="price"
                value={currentOrder.price?.price}
                hasButton={true}
                buttonText="Обновить"
                onChange={handleChangePrice}
                onClick={handleRefreshPrice}
              />
            ) : null}
          </div>
          <hr />
          <MyButton onClick={() => setIsOpen((prevState) => !prevState)}>
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
          <h3>{currentOrder.isClosed ? "Запрос закрыт" : "Запрос открыт"}</h3>
        </div>
      </div>
      <div>
        <Comments companyId={currentCompany.id} typeOfComments="order" />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default OrderPage;
