import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import localStorageService from "../../../assets/services/localStorageService";
import useUserData from "../../../hooks/useUserData";
import { getAllCompanyComments } from "../../../store/LeadsComments/selecetors";
import { getAllOrdersComments } from "../../../store/OrdersComments/selectors";
import Loader from "../../ui/Loader/Loader";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({ companyId, typeOfComments }) => {
  const localId = localStorageService.getUserId();
  const { id } = useParams();
  const {
    isLoading,
    isLeadsLoading,
    isLeadsCommentsLoading,
    isOrdersCommentsLoading,
    companies,
    orders,
  } = useUserData();
  const leadsComments = useSelector(
    getAllCompanyComments(
      companies.find((c) => c.id === companyId).companyComments
    )
  );
  const ordersComments = useSelector(
    getAllOrdersComments(
      typeOfComments === "order"
        ? orders.find((o) => o.orderId === id).ordersComments
        : null
    )
  );
  const [currentComments, setCurrentComments] = useState(null);
  const [allCommentsShown, setAllCommentsShown] = useState(false);

  useEffect(() => {
    if (companies && leadsComments && typeOfComments === "company") {
      setCurrentComments(leadsComments);
    } else if (orders && ordersComments && typeOfComments === "order") {
      setCurrentComments(ordersComments);
    }
  }, [
    isLoading,
    isLeadsLoading,
    isLeadsCommentsLoading,
    isOrdersCommentsLoading,
  ]);
  const handleCollapse = () => {
    setAllCommentsShown((prevState) => !prevState);
  };

  const handleDelete = (comment) => {
    console.log("delete");
  };

  const handleAddComment = (data) => {
    console.log("add comment");
  };

  return (
    <>
      {currentComments ? (
        currentComments.length !== 0 ? (
          currentComments.length > 1 ? (
            allCommentsShown ? (
              currentComments.map((comment, index, array) => (
                <Comment
                  text={comment.value}
                  date={comment.date}
                  key={comment.value}
                  collapse={allCommentsShown}
                  onCollapse={handleCollapse}
                  lastComment={index === array.length - 1 ? true : false}
                  onDelete={() => handleDelete(comment)}
                />
              ))
            ) : (
              <Comment
                text={currentComments[currentComments.length - 1].value}
                date={currentComments[currentComments.length - 1].date}
                key={currentComments[currentComments.length - 1].date}
                collapse={allCommentsShown}
                onCollapse={handleCollapse}
                onDelete={() =>
                  handleDelete(currentComments[currentComments.length - 1])
                }
                lastComment={true}
                onlyComment={false}
              />
            )
          ) : (
            <Comment
              text={currentComments[0].value}
              date={currentComments[0].date}
              onDelete={() => handleDelete(currentComments[0])}
              onlyComment={true}
              lastComment={true}
            />
          )
        ) : (
          <Loader />
        )
      ) : (
        <h4>Комментариев нет, добавьте первый комментарий!</h4>
      )}
      <CommentForm onClick={handleAddComment} />
    </>
  );
};

Comments.propTypes = {
  companyInfo: PropTypes.object,
};

export default Comments;
