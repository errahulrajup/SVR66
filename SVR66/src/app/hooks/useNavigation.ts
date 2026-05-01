import { useNavigate } from "react-router";

/**
 * Shared navigation hook — navigate + scroll to top.
 * Use this instead of copy-pasting the go() function in every page.
 */
export function useNavigation() {
  const navigate = useNavigate();
  const go = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  return { go };
}
