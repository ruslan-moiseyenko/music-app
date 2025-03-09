import apiClient from "../utils/axios-config";
import {
  LoginCredentials,
  RegisterCredentials,
  User
} from "../types/user.types";
import { AuthResponse } from "../types/api.types";
import { jwtDecode } from "jwt-decode";

class AuthService {
  async login(
    credentials: LoginCredentials
  ): Promise<{ token: string; user: User }> {
    const response = await apiClient.post<AuthResponse>(
      "/users/login",
      credentials
    );
    const { token } = response.data;

    const user = this.getUserFromToken(token);

    localStorage.setItem("token", token);

    return { token, user };
  }

  async register(
    credentials: RegisterCredentials
  ): Promise<{ token: string; user: User }> {
    const { confirmPassword, ...registerData } = credentials;
    const response = await apiClient.post<AuthResponse>(
      "/users/register",
      registerData
    );
    const { token } = response.data;

    const user = this.getUserFromToken(token);

    localStorage.setItem("token", token);

    return { token, user };
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      return decoded.exp > currentTime;
    } catch (error) {
      console.log("🚀 ~ AuthService ~ isAuthenticated ~ error:", error);
      return false;
    }
  }

  getCurrentUser(): User | null {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      return this.getUserFromToken(token);
    } catch (error) {
      console.log("🚀 ~ AuthService ~ getCurrentUser ~ error:", error);
      return null;
    }
  }

  private getUserFromToken(token: string): User {
    const decoded: any = jwtDecode(token);

    return {
      id: decoded.id,
      username: decoded.username
    };
  }
}

export default new AuthService();
