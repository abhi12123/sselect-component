import React from "react";

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className=" p-2 w-full cursor-pointer bg-orange-300 hover:bg-orange-500"
    />
  );
}
