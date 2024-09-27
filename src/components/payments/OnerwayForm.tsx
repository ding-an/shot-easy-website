import { useEffect, useState } from "react";
import useOnerway from "./useOnerway";

export default function OnerwayForm() {
  const { createOrder } = useOnerway();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    createOrder(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto py-4 w-full lg:w-[480px]">
      <div id="pacypay_checkout" className="mx-4 my-4 w-full"></div>
    </div>
  );
}
