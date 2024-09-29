import useOnerway from "./useOnerway";

export default function OnerwayForm() {
  const { polling } = useOnerway();

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto py-4 w-full lg:w-[480px]">
      <script src="/js/onerway.js"></script>
      {polling ? (
        <div className="text-center">Updating order status...</div>
      ) : (
        <div id="pacypay_checkout" className="mx-4 my-4 w-full"></div>
      )}
    </div>
  );
}
