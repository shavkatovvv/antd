import { request } from "../config/request";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../client/client";
export const useLoginUsers = () => {
    return useMutation({
        mutationFn: (data) =>
            request.post("/login", data).then((res) => res.data),
        onSuccess: () => {
            localStorage.setItem(
                "userData",
                JSON.stringify(queryClient.getQueryData())
            );
        },
    });
};
