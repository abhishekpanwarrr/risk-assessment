import Cookies from "js-cookie";
import { API_BASE_URL } from "../constants/urls";
import { handleUnauthorizedAccess } from "./helpers";

const errorHandling = (response) => {
  switch (response.status) {
    case 200 || 201 || 204:
      return;

    case 401:
      Object.keys(Cookies.get()).forEach((cookie) => Cookies.remove(cookie));
      handleUnauthorizedAccess();
      throw new Error("Please Logout and Login again.");

    case 404:
      throw new Error(
        "The resource that you're trying to access was not found!"
      );

    case 500:
      throw new Error("There's an error with one of our servers");

    default:
      if (!response.ok) {
        throw new Error("There's an unknown error while accessing information");
      }
  }
};

export const getFetch = async (endpoint, params = {}) => {
  const queryString = Object.entries(params)
    .map((param) => {
      return `${param[0]}=${param[1]}`;
    })
    .join("&");

  const url = `${API_BASE_URL + endpoint}?${queryString}`;

  let response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });

  errorHandling(response);

  // if (response) {
  //   const contentType = response.headers.get("content-type");

  //   if (contentType !== "application/json") {
  //     return await response.blob();
  //   }

  //   if (response.status === 204) {
  //     return {};
  //   }

  return await response.json();
  // }
};

export const postFetch = async (endpoint, payload) => {
  let response = await fetch(API_BASE_URL + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
    body: JSON.stringify(payload),
  });
  errorHandling(response);
  return await response.json();
};
