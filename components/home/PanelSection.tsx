"use client";

import { usePanel } from "@/lib/PanelContext";
import React, { cloneElement, ReactElement } from "react";

interface PanelSectionProps {
  children: ReactElement;
  index: number;
}

export default function PanelSection({ children, index }: PanelSectionProps) {
  const { activeIndex } = usePanel();
  const isActive = activeIndex === index;

  // Clone the child component and pass the isActive prop
  // We cast children to any to bypass TS check since we know our sections accept it (or will ignore it)
  return cloneElement(children as React.ReactElement<any>, { isActive });
}
