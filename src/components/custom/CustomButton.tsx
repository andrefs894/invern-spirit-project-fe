"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const CustomButton = ({
  children,
  position,
  type,
  onClick,
  isDisabled,
}: {
  children: string;
  position?: string;
  type: string;
  onClick?: () => void;
  isDisabled?: () => boolean;
}) => {
  return (
    <>
      {type === "button" ? (
        <button
          type="button"
          onClick={onClick}
          disabled={isDisabled ? isDisabled() : false}
          className={`${isDisabled && isDisabled() ? `${position} bg-[#4C4B48]` : `${position} bg-[#201F1D] hover:bg-[#C36A2D]`}`}
        >
          {children}
        </button>
      ) : type === "submit" ? (
        <button
          type="submit"
          onClick={onClick}
          disabled={isDisabled ? isDisabled() : false}
          className={`${isDisabled && isDisabled() ? `${position} bg-[#4C4B48]` : `${position} bg-[#201F1D] hover:bg-[#C36A2D]`}`}
        >
          {children}
        </button>
      ) : (
        <button
          type="button"
          onClick={onClick}
          disabled={isDisabled ? isDisabled() : false}
          className={`${isDisabled && isDisabled() ? `${position} bg-[#4C4B48]` : `${position} bg-[#201F1D] hover:bg-[#C36A2D]`}`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export const CustomLinkButton = ({
  children,
  position,
  href,
  type,
}: {
  children: any;
  position?: string;
  href: string;
  type: string;
}) => {
  const router = useRouter();
  return (
    <CustomButton
      type={type}
      position={position}
      onClick={() => router.push(href)}
    >
      {children}
    </CustomButton>
  );
};
