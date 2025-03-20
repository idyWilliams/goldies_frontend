import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../admin-auth";
import { IUser, UserParams } from "@/interfaces/user.interface";
import { useMemo } from "react";

const useUsers = (params: UserParams) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["getUsers", params],
    queryFn: async () => getUsers(params),
  });

  const { users, totalPages, totalUsers } = useMemo(() => {
    if (!data || isLoading || isError) {
      return { users: [], totalPages: 0, totalUsers: 0 };
    }
    return {
      users: (data.users as IUser[]) ?? [],
      totalPages: data.pagination.totalPages ?? 0,
      totalUsers: data.pagination.totalUsers ?? 0,
    };
  }, [data, isLoading, isError]);

  return {
    users,
    totalPages,
    totalUsers,
    isLoading,
    isError,
    refetch,
  };
};

export default useUsers;
