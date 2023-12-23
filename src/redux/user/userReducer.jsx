export const initialState = {
  token: "",
  username: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOKEN":
      return {
        ...state,
        token: action.data,
      };
    case "CHANGEUSER":
      return {
        ...state,
        username: action.data,
      };
    case "CHANGEPASSWORD":
      return {
        ...state,
        password: action.data,
      };
    case "REMOVE":
      return {
        ...state,
        token: "",
        username: "",
        password: "",
      };
    default:
      return { ...state };
  }
};
export default reducer;
