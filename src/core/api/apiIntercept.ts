import axios, { AxiosRequestConfig,InternalAxiosRequestConfig  } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    const fullUrl = `${config.baseURL ?? ""}${config.url ?? ""}`;

    console.log("🚀 REQUEST:");
    console.log("URL:", fullUrl);
    console.log("Method:", config.method?.toUpperCase());
    console.log("Headers:", config.headers);
    console.log("Payload:", config.data);

    return config;
  },
  (error) => {
    console.error("❌ REQUEST ERROR:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ RESPONSE:");
    console.log(
      "URL:",
      `${response.config.baseURL ?? ""}${response.config.url ?? ""}`
    );
    console.log("Status:", response.status);
    console.log("Data:", response.data);

    return response;
  },
  (error) => {
    console.error("❌ RESPONSE ERROR:");
    console.log(
      "URL:",
      `${error.config?.baseURL ?? ""}${error.config?.url ?? ""}`
    );
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);

    if (error.response?.status === 401) {
      console.log("🔐 Token expired. Logging out...");

      localStorage.removeItem("token");

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;