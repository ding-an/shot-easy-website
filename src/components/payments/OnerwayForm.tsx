import { useEffect, useState } from "react";
import useOnerway from "./useOnerway";

export default function OnerwayForm() {
  const { createOrder, email, setEmail, setProductId } = useOnerway();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const email = params.get("email");
    setEmail(email);
    setProductId(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-2 space-y-4 md:space-y-6 sm:p-8">
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="h-12 w-full rounded-full border-blue-600 bg-blue-100 pl-4 pr-11 text-base text-black outline-none placeholder:text-white-48 focus-visible:border"
            onInput={(e) => {
              // @ts-ignore
              setEmail(e.target.value);
            }}
          />
          <button
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={() => {
              createOrder();
            }}
          >
            Continue Payment
          </button>
        </div>
      </div>
    </div>
  );
}
