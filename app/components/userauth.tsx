import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the accessToken exists in localStorage
    const token = localStorage.getItem("accessToken");

    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [router]);

  return isAuthenticated;
}
