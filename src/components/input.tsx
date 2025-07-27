import React from "react";

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className="border w-full py-2 px-1 border-stone-300 outline-0 rounded-lg focus:border-cyan-600"
    />
  );
}
