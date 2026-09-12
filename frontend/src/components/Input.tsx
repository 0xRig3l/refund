import { forwardRef } from "react";

type Props = React.ComponentProps<"input"> & {
  legend?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ legend, type = "text", ...rest }, ref) => {
    return (
      <fieldset className="flex flex-1 max-h-20 text-gray-200 focus-within:text-green-200">
        {legend && (
          <legend className="uppercase text-xxs  mb-2 text-inherit">
            {legend}
          </legend>
        )}

        <input
          ref={ref}
          className="w-full h-12 rounded-lg border border-gray-300 px-4 text-sm text-gray-100 bg-transparent outline-none focus:border-2 focus:border-green-200"
          type={type}
          {...rest}
        />
      </fieldset>
    );
  },
);
