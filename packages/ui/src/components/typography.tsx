import * as React from "react";
import { cn, tv } from "tailwind-variants";

const styles = {
  heading: tv({
    base: "tracking-tight",
    variants: {
      size: {
        xl: "text-4xl font-bold",
        l: "text-3xl font-semibold",
        m: "text-2xl font-semibold",
        s: "text-xl font-medium",
        xs: "text-lg font-medium",
      },
    },
  }),

  paragraph: tv({
    base: "leading-7 text-muted-foreground",
    variants: {
      size: {
        l: "text-lg",
        m: "text-base",
        s: "text-sm",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }),

  label: tv({
    base: "font-medium",
    variants: {
      size: {
        m: "text-sm",
        s: "text-xs",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }),

  link: tv({
    base: "text-primary underline-offset-4 hover:underline cursor-pointer",
    variants: {
      size: {
        m: "text-base",
        s: "text-sm",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }),
};

function createComponent<T extends keyof React.JSX.IntrinsicElements>(
  tag: T,
  className: string,
  displayName: string,
) {
  type Props = React.JSX.IntrinsicElements[T];

  const Comp = React.forwardRef<unknown, Props>(
    ({ className: cnProp, ...props }, ref) => {
      const Component = tag as React.ElementType;

      return (
        <Component ref={ref} className={cn(className, cnProp)} {...props} />
      );
    },
  );

  Comp.displayName = displayName;

  return Comp as React.ForwardRefExoticComponent<
    Props & React.RefAttributes<unknown>
  >;
}

export const Typography = {
  Heading: {
    XL: createComponent(
      "h1",
      styles.heading({ size: "xl" }),
      "Typography.Heading.XL",
    ),
    L: createComponent(
      "h2",
      styles.heading({ size: "l" }),
      "Typography.Heading.L",
    ),
    M: createComponent(
      "h3",
      styles.heading({ size: "m" }),
      "Typography.Heading.M",
    ),
    S: createComponent(
      "h4",
      styles.heading({ size: "s" }),
      "Typography.Heading.S",
    ),
    XS: createComponent(
      "h5",
      styles.heading({ size: "xs" }),
      "Typography.Heading.XS",
    ),
  },

  Paragraph: {
    L: createComponent(
      "p",
      styles.paragraph({ size: "l" }),
      "Typography.Paragraph.L",
    ),
    M: createComponent(
      "p",
      styles.paragraph({ size: "m" }),
      "Typography.Paragraph.M",
    ),
    S: createComponent(
      "p",
      styles.paragraph({ size: "s" }),
      "Typography.Paragraph.S",
    ),
  },

  Label: {
    M: createComponent(
      "label",
      styles.label({ size: "m" }),
      "Typography.Label.M",
    ),
    S: createComponent(
      "label",
      styles.label({ size: "s" }),
      "Typography.Label.S",
    ),
  },

  Link: {
    M: createComponent("a", styles.link({ size: "m" }), "Typography.Link.M"),
    S: createComponent("a", styles.link({ size: "s" }), "Typography.Link.S"),
  },
};
