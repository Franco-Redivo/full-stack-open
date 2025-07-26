import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    addUser(state, action) {
      state.push(action.payload);
    },
    addBlogToUser(state, action) {
      const { userId, blog } = action.payload;
      const user = state.find(u => u.id === userId);
      if (user) {
        user.blogs.push(blog);
      }
    },
    removeBlogFromUser(state, action) {
      const { userId, blogId } = action.payload;
      const user = state.find(u => u.id === userId);
      if (user) {
        user.blogs = user.blogs.filter(blog => blog.id !== blogId);
      }
    }
  }
});

export const fetchUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  };
};

export const createUser = (newUser) => {
  return async (dispatch) => {
    const createdUser = await usersService.create(newUser);
    dispatch(addUser(createdUser));
  };
};

export const { setUsers, addUser, addBlogToUser, removeBlogFromUser } = usersSlice.actions;
export default usersSlice.reducer;
