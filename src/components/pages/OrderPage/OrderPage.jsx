import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import getDateFormat from "../../../assets/utils/getDateFormat";
import {
  getAllLeadsSelector,
  getLeadsLoadingStatus,
} from "../../../store/Leads/selectors";
import {
  getAllOrders,
  getOrdersLoadingStatus,
} from "../../../store/Orders/selectors";
import {
  getIsLoadingStatus,
  getUserDataSelector,
} from "../../../store/Users/selectors";
import MyButton from "../../common/Button/MyButton";
import Comments from "../../common/Comment/Comments";
import TextField from "../../common/Form/TextField/TextField";
import Loader from "../../ui/Loader/Loader";
import style from "./OrderPage.module.scss";

const OrderPage = () => {
  const isLoading = useSelector(getIsLoadingStatus());
  const isLeadsLoading = useSelector(getLeadsLoadingStatus());
  const isOrdersLoading = useSelector(getOrdersLoadingStatus());
  const { id } = useParams();
  const state = useSelector(getUserDataSelector());
  const orders = useSelector(getAllOrders(state?.userData?.orders));
  const companies = useSelector(getAllLeadsSelector(state?.userData?.leads));
  const [newPrice, setNewPrice] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);

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
  console.log(id);

  const toggleNewPrice = () => {
    setNewPrice((prevState) => !prevState);
  };
  const handleChange = () => {
    console.log("any");
  };
  return currentOrder && currentCompany ? (
    <>
      <h1>{currentCompany.company}</h1>

      <div className={style.order_container}>
        <div className={style.order_container_column}>
          <h2>Данные о грузе</h2>
          <hr />
          <div className={style.order_container_frame_item}>
            <h4>Вес груза:</h4>
            <p className={style.order_container_frame}>{currentOrder.weight}</p>
          </div>
          <hr />
          <div className={style.order_container_frame_item}>
            <h4>Объём груза: </h4>
            <p className={style.order_container_frame}>{currentOrder.volume}</p>
          </div>
          <hr />
          <div className={style.order_container_frame_item}>
            <h4>Характер груза: </h4>
            <p className={style.order_container_frame}>
              {currentOrder.typeOfCargo}
            </p>
          </div>
          <hr />
          <div className={style.order_container_frame_item}>
            <h4>Код ТН ВЭД: </h4>
            <p className={style.order_container_frame}>{currentOrder.hsCode}</p>
          </div>
          <hr />
          <div className={style.order_container_frame_item}>
            <h4>Температурный режим: </h4>
            <p className={style.order_container_frame}>
              {currentOrder.temperature}
            </p>
          </div>
          <hr />
          <div className={style.order_container_frame_item}>
            <h4>Класс опасности: </h4>
            <p className={style.order_container_frame}>{currentOrder.hazard}</p>
          </div>
          <hr />
          <div className={style.order_container_frame_item}>
            <h4>Вид упаковки: </h4>
            <p className={style.order_container_frame}>
              {currentOrder.package}
            </p>
          </div>
          <hr />
          <div className={style.order_container_frame_item}>
            <h4>Можно ли штабелировать: </h4>
            <p className={style.order_container_frame}>
              {currentOrder.transshipment}
            </p>
          </div>
          <hr />
          <div className={style.order_container_frame_item}>
            <h4>Дополнительная информация о грузе: </h4>
            <p className={style.order_container_frame}>
              {currentOrder.addition}
            </p>
          </div>
          <hr />
        </div>
        <div className={style.order_container_column}>
          <h2>Данные о маршруте</h2>
          <hr />
          <div className={style.order_container_frame_item}>
            <h4>Инкотермс: </h4>
            <p className={style.order_container_frame}>
              {currentOrder.incoterms}
            </p>
          </div>
          <hr />
          <div className={style.order_container_frame_item}>
            <h4>Адрес забора груза: </h4>
            <p className={style.order_container_frame}>
              {currentOrder.pickupAddress}
            </p>
          </div>
          <hr />
          <div className={style.order_container_frame_item}>
            <h4>Таможенный пост: </h4>
            <p className={style.order_container_frame}>
              {currentOrder.customs}
            </p>
          </div>
          <hr />
          <div className={style.order_container_frame_item}>
            <h4>Адрес доставки: </h4>
            <p className={style.order_container_frame}>
              {currentOrder.deliveryAddress}
            </p>
          </div>
          <hr />
          <div className={style.order_container_frame_item}>
            <h4>Актуальность груза:</h4>
            <p className={style.order_container_frame}>
              {currentOrder.isActual ? "Актуальный груз" : "Неактуальный груз"}
            </p>
          </div>
          <hr />
          <div className={style.order_container_frame_item}>
            <h4>Дата забора груза: </h4>
            <p className={style.order_container_frame}>
              {currentOrder.pickupDate}
            </p>
          </div>
          <hr />
        </div>

        <div className={style.order_container_column}>
          <h2>Данные о компании</h2>
          <hr />

          <div className={style.order_container_frame_item}>
            <h4>Как часто возит: </h4>
            <p className={style.order_container_frame}>
              {currentOrder.howOften}
            </p>
          </div>
          <hr />
          <div className={style.order_container_frame_item}>
            <h4>Дата запроса: </h4>
            <p className={style.order_container_frame}>
              {getDateFormat(currentOrder.date, ".")}
            </p>
          </div>
          <hr />
          <div>
            <div className={style.order_container_frame_item}>
              <h4>Наша актуальная ставка: </h4>
              <p className={style.order_container_frame}>
                {currentOrder.price}
              </p>
            </div>
            <hr />
            <div className={style.order_container_frame_item}>
              <Link to={"/" + currentCompany.id}>
                <MyButton text="Информация о компании" />
              </Link>
              <MyButton text="Обновить ставку" onClick={toggleNewPrice} />
            </div>
            {newPrice ? <TextField type="text" name="price" /> : null}
          </div>
          <h3>{currentOrder.isClosed ? "Запрос закрыт" : "Запрос открыт"}</h3>
        </div>
      </div>
      <div className={style.comment}>
        <Comments companyId={currentCompany.id} typeOfComments="order" />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default OrderPage;
