import { useQuery } from "@tanstack/react-query";
import { api } from "./client";

export function useCourses() {
  return useQuery(
    ["courses"],
    async () => {
      const res = await api.get("/courses");
      return res.data;
    },
    { staleTime: 1000 * 60 * 5 } // caching 5 minutos
  );
}
