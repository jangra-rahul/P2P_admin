// import Link from "next/link";
// import { ButtonHTMLAttributes, ReactNode, AnchorHTMLAttributes } from "react";

// type BaseProps = {
//   children: ReactNode;
//   left?: boolean;
//   className?: string;
//   transparent?: boolean;
//   main?: boolean;
// };



// type ButtonProps = BaseProps & {
//   url?: never;
//   onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
//   blank?: never;
// } & ButtonHTMLAttributes<HTMLButtonElement>;

// type LinkProps = BaseProps & {
//   url?: string;
//   onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
//   blank?: "_blank" | "_self" | "_parent" | "_top";
// } & Omit<LinkProps, "href" | "onClick">;

// type CtaButtonProps = ButtonProps | LinkProps;

// const CtaButton = ({
//   children,
//   left,
//   onClick,
//   className = "",
//   transparent,
//   url,
//   blank,
//   main,
//   ...rest
// }: CtaButtonProps) => {
//   const baseClasses = `${className} ${
//     left ? "ml-0 text-left" : "mx-auto text-center flex justify-center"
//   } ${
//     main
//       ? "text-sm md:text-base py-2 px-4 bg-[#ECE8F2] text-[#4B5563] hover:opacity-85 w-auto"
//       : "text-white bg-purple py-3 lg:py-4 w-full text-base hover:bg-purple-light"
//   } font-normal cursor-pointer leading-100 rounded-[10px] duration-300`;

//   if (url) {
//     const linkProps = rest as LinkProps;
//     return (
//       <Link
//         {...linkProps}
//         onClick={onClick}
//         href={url}
//         target={blank}
//         className={baseClasses}
//       >
//         {children}
//       </Link>
//     );
//   }

//   const buttonProps = rest as ButtonProps;
//   return (
//     <button {...buttonProps} onClick={onClick} className={baseClasses}>
//       {children}
//     </button>
//   );
// };

// export default CtaButton;



import Link from "next/link";
import {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

type BaseProps = {
  children: ReactNode;
  left?: boolean;
  className?: string;
  transparent?: boolean;
  main?: boolean;
};

type ButtonProps = BaseProps & {
  url?: undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type AnchorProps = BaseProps & {
  url: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  blank?: "_blank" | "_self" | "_parent" | "_top";
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type CtaButtonProps = ButtonProps | AnchorProps;

const CtaButton = (props: CtaButtonProps) => {
  const {
    children,
    left,
    className = "",
    transparent,
    main,
  } = props;

  const baseClasses = `${className} ${
    left ? "ml-0 text-left" : "mx-auto text-center flex justify-center"
  } ${
    main
      ? "text-sm md:text-base py-2 px-4 bg-[#ECE8F2] text-[#4B5563] hover:opacity-85 w-auto"
      : "text-white bg-purple py-3 lg:py-4 w-full text-base hover:bg-purple-light"
  } font-normal cursor-pointer leading-100 rounded-[10px] duration-300`;

  if ('url' in props && props.url) {
    // Handle link case
    const { url, onClick, blank, ...rest } = props as AnchorProps;

    return (
      <Link href={url} legacyBehavior passHref>
        <a
          {...rest}
          onClick={onClick}
          target={blank}
          className={baseClasses}
          rel={blank === "_blank" ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      </Link>
    );
  }

  // Handle button case
  const { onClick, ...rest } = props as ButtonProps;

  return (
    <button
      {...rest}
      onClick={onClick}
      className={baseClasses}
      type="button"
    >
      {children}
    </button>
  );
};

export default CtaButton;
