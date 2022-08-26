import { API } from "helpers";

export const UserService = {};

UserService.getAllUsers = async () => API.get(`users`);

UserService.getUserById = async (id) => API.get(`users/${id}`);

UserService.updateUser = async (id, userData) =>
  API.patch(`users/${id}`, userData);
