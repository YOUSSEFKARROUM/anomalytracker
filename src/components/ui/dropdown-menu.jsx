import * as React from "react";
import { Menu } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

export function DropdownMenu({ children }) {
  return <Menu as="div" className="relative inline-block text-left">{children}</Menu>;
}

export function DropdownMenuTrigger({ asChild = false, children }) {
  // asChild permet d'utiliser un bouton custom
  if (asChild) {
    return React.cloneElement(children, {
      onClick: (e) => {
        if (children.props.onClick) children.props.onClick(e);
      },
      'data-headlessui-menu-button': true,
      ref: undefined,
      // HeadlessUI gère le ref automatiquement
    });
  }
  return (
    <Menu.Button className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
      {children}
      <ChevronDown className="ml-2 h-4 w-4" />
    </Menu.Button>
  );
}

export function DropdownMenuContent({ children, align = "end", className = "", ...props }) {
  return (
    <Menu.Items
      className={`absolute z-10 mt-2 min-w-[8rem] rounded-md bg-popover border border-border shadow-lg focus:outline-none ${align === "end" ? "right-0" : "left-0"} ${className}`}
      {...props}
    >
      {children}
    </Menu.Items>
  );
}

export function DropdownMenuItem({ children, className = "", ...props }) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`w-full text-left px-4 py-2 text-sm ${active ? "bg-accent text-accent-foreground" : "text-foreground"} ${className}`}
          {...props}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
} 