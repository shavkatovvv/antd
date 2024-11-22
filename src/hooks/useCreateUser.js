import { useMutation } from "@tanstack/react-query";

import { request } from "../config/request";

import queryClient from "../client/client";

export const useCreateUser = () => {
    return useMutation({
        mutationFn: (data) =>
            request.post("/catalog", data).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
        },
    });
};
