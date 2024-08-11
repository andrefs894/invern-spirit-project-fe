import { User } from "@/types/store/user";
import { getUserById, getUserVersion } from "@/service/user";
import { Cart } from "@/types/store/cart";

export const loadUser = async (setCart: (cart: Cart) => void) => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      const { userId, version } = parsedUser;
      if (!userId) {
        localStorage.removeItem("user");
        return null;
      }
      const { version: newVersion } = await getUserVersion(userId);
      if (newVersion !== version) {
        const updatedUser = await getUserById(userId);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("cart", JSON.stringify(updatedUser.cart));
        setCart(updatedUser.cart);
        return updatedUser;
      }
      return JSON.parse(user);
    }
    return null;
  }
  return null;
};

export const syncUser = (user: User | null) => {
  if (typeof window !== "undefined") {
    user === null
      ? localStorage.removeItem("user")
      : localStorage.setItem("user", JSON.stringify(user));
  }
};
