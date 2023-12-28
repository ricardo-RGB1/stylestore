import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Button component: a button element with a few extra features than shadcn's
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} [props.className] - The CSS class name for the button.
 * @param {ReactNode} props.children - The content of the button.
 * @param {boolean} [props.disabled] - Whether the button is disabled.
 * @param {string} [props.type='button'] - The type of the button.
 * @param {React.Ref<HTMLButtonElement>} ref - The ref to attach to the button element.
 * @returns {JSX.Element} The rendered button element.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        className={cn(
        `
            w-auto
            rounded-full
          bg-black
            border-transparent
            px-5
            py-3
            disabled:cursor-not-allowed
            disabled:opacity-50
            text-white
            font-semibold
            hover:opacity-75
            transition
          `,
          className // This is the className prop passed to the component
        )}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
