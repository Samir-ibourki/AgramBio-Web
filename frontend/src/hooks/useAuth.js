import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser, registerUser, getUserOrders, getMe } from "../api/authApi";
import { useAuthStore } from "../store/useAuthStore";

export const useLogin = () => {
  const setCredentials = useAuthStore((state) => state.setCredentials);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setCredentials(data.user, data.token);
    },
  });
};

export const useRegister = () => {
  const setCredentials = useAuthStore((state) => state.setCredentials);

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setCredentials(data.user, data.token);
    },
  });
};

export const useOrders = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["orders", token],
    queryFn: () => getUserOrders(token),
    enabled: !!token,
  });
};

export const useUser = () => {
  const token = useAuthStore((state) => state.token);
  const updateUser = useAuthStore((state) => state.updateUser);

  return useQuery({
    queryKey: ["user", token],
    queryFn: () => getMe(token),
    enabled: !!token,
    onSuccess: (data) => {
      updateUser(data.data);
    },
  });
};
