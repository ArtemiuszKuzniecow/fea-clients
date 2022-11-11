import { createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from "../../assets/services/commentsService";

export const loadLeadsCommentsData = createAsyncThunk(
  "leadsComment/loadleadsComment",
  async (thunkApi) => {
    try {
      const { content } = await commentsService.getLeadsComments();
      return content;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// export const postCompanyComment = createAsyncThunk(
//   "comment/created",
//   async (commentsPayload, thunkAPI) => {
//     const { commentEndpoint, companyEndpoint, prevState, payload } =
//       commentsPayload;

//     try {
//       const data = await commentsService.postNewComment(
//         commentEndpoint,
//         companyEndpoint,
//         prevState,
//         payload
//       );

//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
