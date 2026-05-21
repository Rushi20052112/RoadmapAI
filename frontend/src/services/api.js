import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + "/api/auth",
    withCredentials: true,
});

const PAYMENT_API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + "/api/payment",
    withCredentials: true,
});

API.interceptors.response.use(
    (response) => response, // success → pass through

    async (error) => {
        const original = error.config

        // if token expired and not already retried
        if (error.response?.data?.expired && !original._retry) {
            original._retry = true

            try {
                // silently refresh the access token
                await axios.post(
                    import.meta.env.VITE_BASE_URL + "/api/auth/refresh-token",
                    {},
                    { withCredentials: true }
                )

                // retry the original failed request
                return API(original)

            } catch (refreshError) {
                // refresh token also expired → force logout
                window.location.href = "/auth/login"
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export const registerUser = (data) => {
    return API.post("/register", data)
}


export const loginUser = (data) => {
    return API.post("/login", data)
}

export const logout = () => {
    return API.post("/logout")
}

export const checkAuth = () => {
    return API.get("/check-auth")
}

export const getUserData = () => {
    return API.get("/get-user-data")
}

export const roadmapGenerate = (data) => {
    return API.post("/roadmap-generate", data)
}

export const getUserRoadmaps = async () => {
    return API.get("/my-roadmaps");
};

export const markWeekCompletedAPI = (roadmapId, weekId) => {
    return API.patch(`/roadmap/${roadmapId}/week/${weekId}/complete`);
};

export const updateProfile = (data) => {
    return API.put("/update-profile", data);
};

export const changePassword = (data) => {
    return API.put("/change-password", data);
};

export const deleteAccount = () => {
    return API.delete("/delete-account");
};

export const createOrder = (data) => {
    return PAYMENT_API.post("/create-order", data);
}

export const verifyPayment = (data) => {
    return PAYMENT_API.post("/verify-payment", data);
}
