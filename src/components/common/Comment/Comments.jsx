import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import localStorageService from "../../../assets/services/localStorageService";
import { useComments } from "../../../hooks/useComments";
import {
  getCompanyCommentsSelector,
  getOrderCommentsSelector,
} from "../../../store/Users/selectors";
import Loader from "../../ui/Loader/Loader";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({ companyId, typeOfComments }) => {
  const localId = localStorageService.getUserId();
  const { id } = useParams();
  const companyComments = useSelector(getCompanyCommentsSelector(companyId));
  const orderComments = useSelector(getOrderCommentsSelector(companyId, id));

  const currentComments =
    typeOfComments === "company" ? companyComments : orderComments;
  const { postComment, deleteComment, loadCurrentCompany, currentCompany } =
    useComments();
  useEffect(() => {
    loadCurrentCompany(companyId);
  }, []);

  const [allCommentsShown, setAllCommentsShown] = useState(false);

  const handleCollapse = () => {
    setAllCommentsShown((prevState) => !prevState);
  };

  const handleDelete = (comment) => {
    const commentEndpoint =
      typeOfComments === "company"
        ? `${localId}/comments/company/${comment._id}`
        : `${localId}/comments/order/${comment._id}`;
    const companyEndpoint =
      typeOfComments === "company"
        ? `${localId}/leads/${comment.companyId}/companyComments/`
        : `${localId}/leads/${comment.companyId}/ordersComments/${id}/`;
    const folderKey =
      typeOfComments === "company" ? "companyComments" : "ordersComments";
    const commentsPayload = {
      commentEndpoint: commentEndpoint,
      companyEndpoint: companyEndpoint,
      newState: currentComments
        .filter((c) => c._id !== comment._id)
        .map((c) => c._id),
      folderKey: folderKey,
      payload: comment,
    };
    deleteComment(commentsPayload);
  };

  const handleAddComment = (data) => {
    const comment = {
      date: Date.now(),
      value: data,
      companyId: companyId,
      _id: nanoid(),
    };
    const commentEndpoint =
      typeOfComments === "company"
        ? `${localId}/comments/company/${comment._id}`
        : `${localId}/comments/order/${comment._id}`;
    const companyEndpoint =
      typeOfComments === "company"
        ? `${localId}/leads/${comment.companyId}/companyComments`
        : `${localId}/leads/${comment.companyId}/ordersComments/${id}`;
    const prevState =
      typeOfComments === "company"
        ? currentCompany.companyComments
        : currentCompany.ordersComments[id];
    const folderKey =
      typeOfComments === "company" ? "companyComments" : "ordersComments";
    const commentPayload = {
      commentEndpoint: commentEndpoint,
      companyEndpoint: companyEndpoint,
      prevState: prevState,
      payload: comment,
      folderKey: folderKey,
    };
    postComment(commentPayload);
  };

  return (
    <>
      {currentComments.length > 0 ? (
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
