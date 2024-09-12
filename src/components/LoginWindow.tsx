"use client";
import React, { Context, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import MenuAnimation from "./MenuAnimation";
import ItemAnimation from "./ItemAnimation";
import { CustomLink } from "./CustomComponents";
import { UserContext, userContext } from "@/context/user";
import { syncUser } from "@/utils/syncUser";
import { cartContext, CartContext } from "@/context/cart";
import { changeCartFunction } from "@/utils/cart/change-cart-function";
import { logout } from "@/service/user";
import { ToastContext, toastContext } from "@/context/toast";
import { removeCheckoutUrl } from "@/utils/checkout-url";

export default function LoginWindow() {
  const [menu, setMenu] = useState(false);
  const { user, setUser } = useContext<UserContext | null>(
    userContext,
  ) as UserContext;
  const { setCart } = useContext<CartContext>(
    cartContext as Context<CartContext>,
  );

  const { handleToast } = useContext(toastContext as Context<ToastContext>);

  const handleLogout = async () => {
    setUser(null);
    syncUser(null);
    const changeCart = changeCartFunction(setCart);
    const emptyCart = {
      cartId: "",
      products: [],
    };
    localStorage.removeItem("remember");
    changeCart(emptyCart);
    const [error] = await logout();
    if (error) {
      handleToast(false, error);
      return;
    }

    removeCheckoutUrl();

    handleToast(true, "Logged out successfully");
  };

  const style =
    "absolute top-16 right-12 mt-[18px] lg:mt-[3px] bg-[#4C4B48] bg-opacity-95 p-8 origin-top card-shadow";

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const stagger = {
    initial: {
      transition: {
        staggerChildren: 0.025,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: 1,
      },
    },
  };

  return (
    <>
      <div className="icon-scale" onClick={toggleMenu}>
        <Link href="" className="icon-scale">
          <FontAwesomeIcon icon={faUserAlt} />
        </Link>
      </div>
      {user === null ? (
        <AnimatePresence>
          {menu && (
            <MenuAnimation scale={"scaleY"} style={style}>
              <motion.div
                variants={stagger}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col justify-center gap-4"
              >
                <ItemAnimation>
                  <CustomLink href="/login">Sign in</CustomLink>
                </ItemAnimation>
                <ItemAnimation>
                  <CustomLink href="/login?signup=true">Sign up</CustomLink>
                </ItemAnimation>
              </motion.div>
            </MenuAnimation>
          )}
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          {menu && (
            <MenuAnimation scale={"scaleY"} style={style}>
              <motion.div
                variants={stagger}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col justify-center gap-4"
              >
                <ItemAnimation>
                  <h5>{user.email}</h5>
                  <CustomLink href="#" onClick={handleLogout}>
                    Sign out
                  </CustomLink>
                </ItemAnimation>
              </motion.div>
            </MenuAnimation>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
