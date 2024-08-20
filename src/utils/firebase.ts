import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  type Auth,
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import qs from "qs";

import cookie from "./cookie";
import { post } from "./request";

const authJson = {
  development: {
    apiKey: "AIzaSyD4g4OmnuIRDApLoufCzUL-3RTs1aJrc2s",
    authDomain: "ai-chat-fee8d.firebaseapp.com",
    projectId: "ai-chat-fee8d",
    storageBucket: "ai-chat-fee8d.appspot.com",
    messagingSenderId: "993590619928",
    appId: "1:993590619928:web:b5db20cb2555a0a59d786d",
    measurementId: "G-C9LZ8RH876",
  },
  production: {
    apiKey: "AIzaSyCbG9HdvuyX9Te3M1J5yJ0YBYjkvMAyCX8",
    authDomain: "soulfun-92880.firebaseapp.com",
    projectId: "soulfun-92880",
    storageBucket: "soulfun-92880.appspot.com",
    messagingSenderId: "723618079850",
    appId: "1:723618079850:web:cd6a80570ed4815372d613",
    measurementId: "G-Q7JYJX3P32",
  },
};

export const firebaseConfig = authJson.development;

const provideMap = {
  "google.com": "Google",
};

export const providers = {
  Google: {
    provider: null as null | GoogleAuthProvider,
  },
};

let app = null as null | FirebaseApp;

export function initApp() {
  if (app) {
    return;
  }

  app = initializeApp(firebaseConfig);
  providers.Google.provider = new GoogleAuthProvider();
}

// 提交 Firebase 认证信息到DS系统进行登录
export async function signInWithAuth(auth: Auth) {
  const firebaseIdToken = await auth.currentUser?.getIdToken();
  const utm_source = cookie.get("utm_source") || "";
  const cp_id = cookie.get("cp_id") || "";
  const ck_id = cookie.get("ck_id") || "";

  const json = await post(
    `/user/social/login?${qs.stringify({ utm_source, cp_id, ck_id })}`,
    {
      firebaseIdToken,
      utm: `utm_source=${utm_source}&cp_id=${cp_id}&ck_id=${ck_id}`,
      // inviteCode,
      // // 邀请码来源(0=CLIPBOARD, 1=LINK, 2=INPUT)
      // sourceType: 1
    }
  );
  cookie.set("access_token", json.data.token, 31536000000);
  return json;
}

// 获取重定向返回的用户数据
export async function getSignInResult(auth: Auth) {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      await signInWithAuth(auth);
      return provideMap[result.providerId];
    }
  } catch (error) {
    alert(error.message);
  }
}

export async function signIn(provider = "Google") {
  const auth = getAuth();
  const providerInstance = providers[provider].provider;
  // request facebook email
  providerInstance.addScope("email");
  try {
    await signInWithPopup(auth, providerInstance);
    const { data } = await signInWithAuth(auth);
    return data;
  } catch (error) {
    if (error.code === "auth/popup-blocked") {
      await signInWithRedirect(auth, providerInstance); //解决safari首次无法弹出的问题
      return;
    }
    if (
      [
        "auth/cancelled-popup-request",
        "auth/popup-closed-by-user",
        "auth/user-cancelled",
      ].includes(error.code)
    ) {
      console.log("signInlog:", error.message);
      return;
    }

    alert(error.message);
  }
}
