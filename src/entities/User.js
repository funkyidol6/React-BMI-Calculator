// src/Entities/User.js

export const User = {
  currentUser: {
    date_of_birth: "1990-01-01", // example date
  },

  // Simulate fetching the logged-in user
  me: async () => {
    return UserService.currentUser;
  },

  // Optionally update the user
  update: async (newData) => {
    UserService.currentUser = { ...UserService.currentUser, ...newData };
    return UserService.currentUser;
  }
};
