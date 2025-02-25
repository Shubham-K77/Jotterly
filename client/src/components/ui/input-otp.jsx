/* eslint-disable react/prop-types */
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function InputOTP({ className, containerClassName, ...props }) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

function InputOTPSlot({ index, className, ...props }) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "border-zinc-400 data-[active=true]:border-zinc-750 data-[active=true]:ring-green-500 data-[active=true]:animate-pulse data-[active=true]:ring-4 data-[active=true]:text-[1.25rem] data-[active=true]:font-semibold data-[active=true]:aria-invalid:ring-red-500/20 aria-invalid:border-red-500 data-[active=true]:aria-invalid:border-red-500 relative flex h-12 w-12 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 dark:border-zinc-800 dark:data-[active=true]:border-zinc-300 dark:data-[active=true]:ring-zinc-300/50 dark:data-[active=true]:aria-invalid:ring-red-900/20 dark:dark:data-[active=true]:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900 dark:data-[active=true]:aria-invalid:border-red-900",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-zinc-950 h-4 w-px duration-1000 dark:bg-zinc-50" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
