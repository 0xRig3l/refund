import { mergeTailwindClasses } from "../utils/mergeTailwindClasses";

type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  variant?: "default" | "icon";
};

const variants = {
  button: {
    default: "h-12",
    icon: "h-12 w-12 not-disabled:hover:scale-105",
  },
};

export function Button({
  isLoading,
  children,
  className,
  type = "button",
  variant = "default",
  ...rest
}: Props) {
  return (
    <button
      className={mergeTailwindClasses([
        "font-medium flex items-center justify-center bg-green-100 not-disabled:hover:bg-green-800 rounded-lg text-white cursor-pointer transform transition-all duration-200 ease-linear disabled:opacity-50 disabled:cursor-not-allowed",
        variants.button[variant],
        className,
      ])}
      disabled={isLoading}
      {...rest}
      type={type}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
}
