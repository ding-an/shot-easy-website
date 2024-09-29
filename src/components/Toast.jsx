/** @format */

import { createRoot } from "react-dom/client";

export const ToastType = {
  SUCCESS: 0,
  ERROR: 1,
  INFO: 2,
  TIPS: 3,
};

export const ToastPosition = {
  TOP_CENTER: 0,
  CENTER: 1,
};

let container = null;
let toast = null;

const Toast = (props) => {
  const { content, type, position } = props;
  const path = getSvgPath(type);
  const bg = getColorByToastType(type);
  const parentOffset =
    position === ToastPosition.CENTER ? "top-1/2 -translate-y-1/2" : "top-0";
  const offset = position === ToastPosition.CENTER ? "" : "mt-[80px]";

  return (
    <div
      className={`fixed left-0 right-0 -translate-x-0 ${parentOffset} ${offset} z-[1000]`}
    >
      <div className="w-full p-2 text-center">
        <div
          className={`${bg} inline-block max-w-[360px] rounded-lg py-3 px-4 text-[14px] text-white xl:max-w-[960px]`}
        >
          <div>
            {path && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 inline-block align-text-bottom"
              >
                <path d={path} fill="currentColor" fillRule="evenodd" />
              </svg>
            )}
            <span>{content}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function getSvgPath(type) {
  switch (type) {
    case ToastType.SUCCESS:
      return "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.943 5.057a1.333 1.333 0 0 0-1.886 0L7 8.114 5.943 7.057l-.085-.078a1.333 1.333 0 0 0-1.8 1.964l2 2 .084.078a1.333 1.333 0 0 0 1.8-.078l4-4 .079-.085a1.333 1.333 0 0 0-.078-1.8z";
    case ToastType.TIPS:
      return "";
    default:
      return "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.667a1.333 1.333 0 1 0 0 2.666 1.333 1.333 0 0 0 0-2.666zm0-8c-.736 0-1.333.597-1.333 1.333v4a1.333 1.333 0 1 0 2.666 0V4c0-.736-.597-1.333-1.333-1.333z";
  }
}

function getColorByToastType(type) {
  switch (type) {
    case ToastType.INFO:
      return "bg-yellow-600";
    case ToastType.TIPS:
      return "bg-black-600";
    case ToastType.SUCCESS:
      return "bg-green-600";
    default:
      return "bg-red-600";
  }
}

function show(toastConfig, duration) {
  const { content, type, position } = toastConfig;
  if (!container || !toast) {
    container = document.createElement("div");
    document.body.appendChild(container);
    toast = createRoot(container);
  }

  toast.render(<Toast content={content} type={type} position={position} />);
  setTimeout(function () {
    toast?.unmount();
    toast = null;
  }, duration || 300000);
}

const alert = (
  content,
  position = ToastPosition.TOP_CENTER,
  duration = 3000
) => {
  show(
    {
      content,
      position,
      type: ToastType.ERROR,
    },
    duration
  );
};

alert.success = (
  content,
  position = ToastPosition.TOP_CENTER,
  duration = 3000
) => {
  show(
    {
      content,
      position,
      type: ToastType.SUCCESS,
    },
    duration
  );
};

alert.info = (
  content,
  position = ToastPosition.TOP_CENTER,
  duration = 3000
) => {
  show(
    {
      content,
      position,
      type: ToastType.INFO,
    },
    duration
  );
};
alert.tips = (
  content,
  position = ToastPosition.TOP_CENTER,
  duration = 3000
) => {
  show(
    {
      content,
      position,
      type: ToastType.TIPS,
    },
    duration
  );
};

export default alert;
alert.error = alert;
export { alert as Alert };
