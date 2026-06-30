import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";

export function PrimaryButton(props: ButtonProps) {
  return <Button variant="primary" {...props} />;
}
