// src/components/ui/label.tsx
import React from "react";

import { ReactNode, LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export function Label({ children, ...props }: LabelProps) {
  return <label {...props}>{children}</label>;
}
