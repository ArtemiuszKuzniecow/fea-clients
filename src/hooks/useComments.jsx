import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import commentsService from "../assets/services/commentsService";

const CommmentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommmentsContext);
};

export const CommmentsProvider = ({ children }) => {
  // const companies = useSelector(getUserLeadsSelector());
  const [isLoading, setLoading] = useState(true);
  const [currentCompany, setCurrentCompany] = useState();
  const [currentComments, setCurrentComments] = useState([]);

  // export const getCompanyCommentsSelector = (companyId) => (state) => {
  //   if (state.userData.userData) {
  //     const comments = Object.values(
  //       state.userData?.userData?.comments.company
  //     );

  //     return comments.filter((comment) =>
  //       state.userData.userData.leads[companyId].companyComments.includes(
  //         comment._id
  //       )
  //     );
  //   }
  // };
  // export const getOrderCommentsSelector = (companyId, orderId) => (state) => {
  //   const comments = Object.values(state.userData?.userData?.comments.order);
  //   const commentsArray =
  //     state.userData.userData.leads[companyId].ordersComments[orderId];
  //   return (
  //     commentsArray &&
  //     comments.filter((comment) => commentsArray.includes(comment._id))
  //   );
  // };

  // const loadCurrentCompany = (companyId) => {
  //   setCurrentCompany(companies.find((item) => item.id === companyId));
  // };

  const loadCurrentComments = (typeOfComments, comments, id, folderKey) => {
    if (comments && currentCompany) {
      if (typeOfComments === "company") {
        setCurrentComments(
          comments
            .filter((comment) =>
              currentCompany.companyComments.includes(comment._id)
            )
            .sort((a, b) => a.date - b.date)
        );
        setLoading(false);
      } else {
        setCurrentComments(
          comments
            .filter((comment) =>
              currentCompany.ordersComments[id].includes(comment._id)
            )
            .sort((a, b) => a.date - b.date)
        );
        setLoading(false);
      }
    }
  };

  async function postComment(commentsPayload) {
    const { commentEndpoint, companyEndpoint, prevState, payload, folderKey } =
      commentsPayload;

    try {
      const [data, comments] = await commentsService.postNewComment(
        commentEndpoint,
        companyEndpoint,
        prevState,
        payload
      );
      setCurrentComments((prevState) =>
        [...prevState, payload].sort((a, b) => a.date - b.date)
      );
      setCurrentCompany((prevState) => ({
        ...prevState,
        [folderKey]: currentComments.map((c) => c._id),
      }));
      return [data, comments];
    } catch (error) {
      alert(error);
    }
  }

  async function deleteComment(commentsPayload) {
    const { commentEndpoint, companyEndpoint, newState, folderKey, payload } =
      commentsPayload;
    try {
      const [data, comments] = await commentsService.removeComment(
        commentEndpoint,
        companyEndpoint,
        newState
      );
      setCurrentComments((prevState) =>
        prevState.filter((c) => c._id !== payload._id)
      );
      setCurrentCompany((prevState) => ({
        ...prevState,
        [folderKey]: currentComments
          .filter((c) => c._id !== payload._id)
          .map((c) => c._id),
      }));
      return [data, comments];
    } catch (error) {
      alert(error);
    }
  }

  return (
    <CommmentsContext.Provider
      value={{
        postComment,
        deleteComment,
        currentCompany,
        currentComments,
        loadCurrentComments,
        isLoading,
      }}
    >
      {children}
    </CommmentsContext.Provider>
  );
};
CommmentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
