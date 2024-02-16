import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const checkRiskScore = (arg1, arg2) => {
  return (arg1 * arg2) / 5;
};

export const showNotification = (msg, type) => {
  if (type === "success") {
    return toast.success(msg, {
      position: "top-center",
    });
  } else {
    return toast.error(msg, {
      position: "top-center",
    });
  }
};

export const generateShortUUID = (length) => {
  const prefix = "RS-";
  const characters = "0123456789";
  const charactersLength = characters.length;
  let uuid = prefix;
  for (let i = prefix.length; i < length; i++) {
    uuid += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return uuid;
};

export const handleUnauthorizedAccess = () => {
  return window.location.reload();
};
