import { getDecrypt } from "@utils/crypto";

export const getParams = (key: string) => {
  let urlSearchParams: URLSearchParams;
  if (location.search.includes("spOrderId")) {
    urlSearchParams = new URLSearchParams(location.search);
  } else if (sessionStorage.getItem("myParams")) {
    urlSearchParams = new URLSearchParams(sessionStorage.getItem("myParams"));
  } else {
    return "";
  }

  const value = urlSearchParams.get(key);
  if (key === "returnUrl") {
    return getDecrypt(window.atob(value), "_onerway_");
  }

  return value;
};

export const getOrderParamsFromA = () => {
  const spOrderId = getParams("spOrderId");
  const orderId = getParams("id");

  if (spOrderId) {
    if (location.search.includes("spOrderId")) {
      history.replaceState(null, "", location.pathname);
    }

    return { spOrderId, id: orderId };
  }
};

export const goToA = () => {
  // id 为后台订单 id，spOrderId 为支付商交易 id
  const { id, spOrderId } = getOrderParamsFromA() || {};
  if (spOrderId && id) {
    setTimeout(() => {
      sessionStorage.removeItem("myParams");
    }, 0);
    location.href = `${getParams(
      "returnUrl"
    )}?transaction_id=${spOrderId}&order_id=${id}`;
  }
};
