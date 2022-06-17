import { chainParameters } from "@/constants/chains";

export const useCurrentChain = () => {
  return { name: "astar", param: chainParameters["astar"] };
};
