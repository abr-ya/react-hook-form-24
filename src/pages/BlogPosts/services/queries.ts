import { useQuery } from "@tanstack/react-query";

import { blogApi } from "@/api/blog";

const getPosts = () => blogApi.get<unknown[]>("posts").then((res) => res.data);

export const usePosts = () => useQuery({ queryKey: ["posts"], queryFn: getPosts });
