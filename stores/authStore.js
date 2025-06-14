import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const setCookie = (name, value, days = 7) => {
  if (typeof window !== "undefined") {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
  }
};

const deleteCookie = (name) => {
  if (typeof window !== "undefined") {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  }
};

const getCookieValue = (name) => {
  if (typeof window === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      fetchUserProfile: async (token) => {
        try {
          set({ isLoading: true });

          const response = await fetch(
            "https://test-fe.mysellerpintar.com/api/auth/profile",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const userProfile = await response.json();

            const userInfo = {
              id: userProfile.id,
              username: userProfile.username,
              role: userProfile.role,
            };

            set({
              user: userInfo,
              token: token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            setCookie("auth-token", token);
            setCookie("auth-user", JSON.stringify(userInfo));

            return userInfo;
          } else {
            throw new Error("Failed to fetch user profile");
          }
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      setUser: (userData) => {
        // Jika userData adalah object lengkap dengan token
        if (userData && typeof userData === "object") {
          const userInfo = {
            id: userData.id,
            username: userData.username,
            role: userData.role,
            // tambahkan field lain yang diperlukan
          };

          const token = userData.token || userData.access_token;

          set({
            user: userInfo,
            token: token,
            isAuthenticated: true,
            error: null,
          });

          // Simpan ke cookies untuk middleware
          if (token) setCookie("auth-token", token);
          setCookie("auth-user", JSON.stringify(userInfo));
        } else {
          // Jika hanya set user tanpa token
          set({ user: userData, isAuthenticated: !!userData });

          if (userData) {
            setCookie("auth-user", JSON.stringify(userData));
          }
        }
      },

      setToken: (token) => {
        set({ token });
        if (token) {
          setCookie("auth-token", token);
        }
      },

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      login: (user, token) => {
        const userInfo = typeof user === "object" ? user : { username: user };

        set({
          user: userInfo,
          token,
          isAuthenticated: true,
          error: null,
          isLoading: false,
        });

        // Simpan ke cookies untuk middleware
        setCookie("auth-token", token);
        setCookie("auth-user", JSON.stringify(userInfo));
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
        });

        // Hapus dari cookies
        deleteCookie("auth-token");
        deleteCookie("auth-user");

        // Redirect ke login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      },

      clearError: () => set({ error: null }),

      // Computed functions
      isAdmin: () => {
        const user = get().user;
        return user ? user.role === "Admin" : false; // Sesuaikan dengan format role dari API
      },

      isUser: () => {
        const user = get().user;
        return user ? user.role === "User" : false; // Sesuaikan dengan format role dari API
      },

      // Helper function untuk cek role
      hasRole: (role) => {
        const user = get().user;
        return user?.role === role;
      },

      // Function untuk init auth dari cookies
      initFromCookies: () => {
        if (typeof window !== "undefined") {
          const token = getCookieValue("auth-token");
          const userStr = getCookieValue("auth-user");

          if (token && userStr) {
            try {
              const user = JSON.parse(userStr);
              set({
                user,
                token,
                isAuthenticated: true,
                error: null,
              });
            } catch (error) {
              console.error("Error parsing user data from cookies:", error);
              // Clear invalid cookies
              deleteCookie("auth-token");
              deleteCookie("auth-user");
            }
          }
        }
      },
    }),
    {
      name: "auth-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist specific fields
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      // Callback setelah rehydrate
      onRehydrateStorage: () => (state) => {
        // Sync dengan cookies setelah rehydrate
        if (state) {
          state.initFromCookies();
        }
      },
    }
  )
);

// Hook untuk init auth saat app pertama kali load
export const useInitAuth = () => {
  const initFromCookies = useAuthStore((state) => state.initFromCookies);

  React.useEffect(() => {
    initFromCookies();
  }, [initFromCookies]);
};
