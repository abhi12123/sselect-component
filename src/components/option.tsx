import type { IOption } from "../types";

interface IProps extends IOption {
  onClick: () => void;
}

export default function Option(option: IProps) {
  return (
    <div
      key={option.option_id}
      onClick={option.has_group ? () => option.onClick() : undefined}
      className="w-full flex cursor-pointer hover:bg-stone-100 p-2 pl-5 rounded justify-between items-center"
    >
      {option.option_label}
      <div>{option.has_group && ">"}</div>
    </div>
  );
}
