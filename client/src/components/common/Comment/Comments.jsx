import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import localStorageService from "../../../services/localStorageService";
import useUserData from "../../../hooks/useUserData";
import {
  deleteCompanyComment,
  postCompanyComment,
} from "../../../store/LeadsComments/actions";
import { getAllCompanyComments } from "../../../store/LeadsComments/selecetors";
import {
  deleteOrderComment,
  postOrderComment,
} from "../../../store/OrdersComments/actions";
import { getAllOrdersCommentsById } from "../../../store/OrdersComments/selectors";
import Loader from "../../ui/Loader/Loader";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({ companyId, typeOfComments }) => {
  const userId = localStorageService.getUserId();
  const dispatch = useDispatch();
  const { _id } = useParams();
  const {
    isLoading,
    isLeadsLoading,
    isLeadsCommentsLoading,
    isOrdersCommentsLoading,
    companies,
    orders,
  } = useUserData();
  const leadsComments = useSelector(getAllCompanyComments(companyId));
  const ordersComments = useSelector(getAllOrdersCommentsById(_id));
  const [currentComments, setCurrentComments] = useState(null);
  const [allCommentsShown, setAllCommentsShown] = useState(false);

  useEffect(() => {
    if (companies && leadsComments && typeOfComments === "company") {
      const commentsArray = leadsComments.sort((a, b) => a.date - b.date);
      setCurrentComments(commentsArray.length > 0 ? commentsArray : null);
    } else if (orders && ordersComments && typeOfComments === "order") {
      const commentsArray = ordersComments.sort((a, b) => a.date - b.date);
      setCurrentComments(commentsArray.length > 0 ? commentsArray : null);
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
    if (typeOfComments === "company") {
      dispatch(deleteCompanyComment(comment));
    } else {
      dispatch(deleteOrderComment(comment));
    }
  };

  const handleAddComment = (data) => {
    const comment =
      typeOfComments === "company"
        ? {
            date: Date.now(),
            value: data,
            companyId: companyId,
            userID: userId,
          }
        : {
            date: Date.now(),
            value: data,
            orderId: _id,
            userID: userId,
          };
    if (typeOfComments === "company") {
      dispatch(postCompanyComment(comment));
    } else {
      dispatch(postOrderComment(comment));
    }
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
        <p className="flex p-4 bg-white rounded-lg dark:bg-gray-700 mb-2">
          Комментариев нет, добавьте первый комментарий!
        </p>
      )}
      <CommentForm onClick={handleAddComment} />
    </>
  );
};

Comments.propTypes = {
  companyInfo: PropTypes.object,
};

export default Comments;
