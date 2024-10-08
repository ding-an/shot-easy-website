/** @format */

import { useEffect, useState } from "react";
import { get } from "@utils/request";
import PayssionSelect from "@components/payssion/PayssionSelect";
import useHandlers from "./payssion/hooks/useHandlers";

const features = [
  ["Individual configuration", "No setup, or hidden fees", "Credits"],
  ["Supports Up to 2 Devices/Users", "No setup, or hidden fees", "Credits"],
  [
    "Supports Up to 10 Devices/Users",
    "No setup, or hidden fees",
    "Credits",
    "API Batch Processing",
    "24/7 Dedicated Customer Support",
  ],
];

function FeatureItems({ product, index }) {
  return (
    <ul role="list" className="mb-8 space-y-4 text-left text-sm">
      <li className="flex items-center space-x-3">
        <svg
          className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span>{features[index][0]}</span>
      </li>
      <li className="flex items-center space-x-3">
        <svg
          className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span>{features[index][1]}</span>
      </li>
      <li className="flex items-center space-x-3">
        <svg
          className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span>{product.credits} Credits</span>
      </li>
      {features[index][3] && (
        <li className="flex items-center space-x-3">
          <svg
            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>{features[index][3]}</span>
        </li>
      )}
      {features[index][4] && (
        <li className="flex items-center space-x-3">
          <svg
            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>{features[index][4]}</span>
        </li>
      )}
    </ul>
  );
}

export default function PricingCard() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const handlers = useHandlers();
  const { setVisible } = handlers;

  useEffect(() => {
    get(`/products`, { type: 1 }).then(({ data }) => {
      const extraInfo = [
        {
          title: "Starter Package",
          desc: "Best option for personal use & for your next project.",
        },
        {
          title: "Basic Package",
          desc: "Relevant for multiple users, extended & premium support.",
        },
        {
          title: "Business Package",
          desc: "Best for large scale uses and extended redistribution rights.",
        },
      ];
      setProducts(
        data.map((product, index) => ({
          ...product,
          ...(extraInfo[index] || {}),
        }))
      );
    });
  }, []);

  return (
    <>
      <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-3 xl:gap-5 lg:space-y-0 min-h-[500px]">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex flex-col p-3 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-4 dark:bg-gray-800 dark:text-white"
          >
            <h3 className="mb-4 text-2xl font-semibold">{product.title}</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              {product.desc}
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">
                ${product?.discount?.price || product.price}
              </span>
            </div>
            <FeatureItems product={product} index={index} />
            <div className="flex flex-col gap-2 mt-auto">
              <a
                href="#"
                className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
                onClick={() => {
                  const user = localStorage.getItem("user");
                  if (!user) {
                    const login = document.getElementById("login");
                    login.click();
                  } else {
                    setVisible(true);
                    setProduct(product);
                  }
                }}
              >
                Get started by Payssion
              </a>
              <a
                href={`/pricing/onerway?id=${product.id}`}
                className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
                onClick={() => {
                  const user = localStorage.getItem("user");
                  if (!user) {
                    const login = document.getElementById("login");
                    login.click();
                  }
                }}
              >
                Get started by Onerway
              </a>
            </div>
          </div>
        ))}
      </div>
      <PayssionSelect {...handlers} product={product} />
    </>
  );
}
