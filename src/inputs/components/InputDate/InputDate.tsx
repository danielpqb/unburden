"use client";

import { useInputErrorMessages } from "@/inputs/hooks/useInputErrorMessages";
import { useParentController } from "@/inputs/hooks/useParentController";
import { useReactHookForm } from "@/inputs/hooks/useReactHookForm";
import { TInputDateProps } from "@/inputs/types/Input";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Label } from "../common/Label";
import { ErrorMessages } from "../common/ErrorMessages";

export function InputDate({
  reactHookForm: { name, control } = {},
  label,
  className,
  defaultValue = "",
  errorMessage: errorFunc,
  onChange,
  disabled,
  value,
}: TInputDateProps) {
  // Valor exibido no formato correto (yyyy-mm-dd)
  const [currentValue, setCurrentValue] = useState("");

  // Controller do react-hook-form para receber o valor do input no onSubmit
  const { field } = useReactHookForm({ name, control });

  // Mensagens de erro retornadas pela função errorMessage
  const { handleErrorMessages, errorMessageArray } = useInputErrorMessages({
    errorFunc: errorFunc,
  });

  // Atualiza todos os valores e dispara os eventos necessários
  function updateValue(value: string) {
    field.onChange(value);
    setCurrentValue(value.split("T")[0]);
    onChange && onChange(value);
    handleErrorMessages(value);
  }

  // Atualiza o valor do campo toda vez que o value ou defaultValue mudam
  useParentController({ value, defaultValue, updateValue });

  return (
    <div
      className={twMerge(
        "flex flex-col w-full",
        className?.container,
        disabled && "input-disabled"
      )}
    >
      <Label className={className?.label}>{label}</Label>

      <input
        className={twMerge(
          "input-base !py-[7px]",
          !!currentValue &&
            defaultValue.split("T")[0] !== currentValue &&
            "input-modified",
          errorMessageArray && "input-error",
          className?.input
        )}
        type="date"
        onChange={(e) => {
          const value = e.target.value;
          const date = new Date(value);
          const isoDate = isNaN(date.getTime()) ? "" : date.toISOString();
          updateValue(isoDate);
        }}
        value={currentValue}
      />

      <ErrorMessages
        errorMessageArray={errorMessageArray}
        className={className?.errors || {}}
      />
    </div>
  );
}
