import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function LogoutView() {
  const router = useRouter();

  useEffect(() => {
    const signOut = async () => {
      router.push("/views/login-view");
    };
    signOut();
  }, []);
  
  return null;
}
