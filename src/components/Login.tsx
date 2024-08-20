import { initApp, signIn } from "@utils/firebase";
import { useEffect } from "react";

export default function Login() {
  const login = async () => {
    try {
      initApp();
      const data = await signIn();
      localStorage.setItem("user", JSON.stringify(data));
      location.href = "/";
    } catch (error) {
      console.log(error);
      alert("Network Error");
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login();
  };
  useEffect(() => {
    login();
  }, []);

  return (
    <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
      <button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Continue
      </button>
    </form>
  );
}
