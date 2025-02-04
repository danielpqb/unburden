"use client";

import { useInputErrorMessages } from "@/hooks/useInputErrorMessages";
import { useParentController } from "@/hooks/useParentController";
import { useReactHookForm } from "@/hooks/useReactHookForm";
import { TInputSelectProps } from "@/types/Input";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Label } from "../common/Label";
import { ErrorMessages } from "../common/ErrorMessages";

export function InputSelect({
  reactHookForm: { name, control } = {},
  label,
  className,
  value,
  defaultValue,
  errorMessage: errorFunc,
  onChange,
  items,
  disabled,
}: TInputSelectProps) {
  // Controller do react-hook-form para receber o valor do input no onSubmit
  const { field } = useReactHookForm({ name, control });

  // Mensagens de erro retornadas pela função errorMessage
  const { handleErrorMessages, errorMessageArray } = useInputErrorMessages({
    errorFunc: errorFunc,
  });

  // Mounta o <select> depois de montar todos os componentes
  // Necessário porque o <select> não reconhece os filhos do tipo <option> antes que todos os componentes montem
  // Outra solução seria colocar a propriedade 'selected' na <option>, mas o React fica mostrando um warning pedindo para usar um 'defaultValue' no <select>
  const [remountSelect, setRemountSelect] = useState(0);
  useEffect(() => {
    setRemountSelect(remountSelect + 1);
  }, []);

  // Função que atualiza o valor recebido no formulário, atualiza o valor exibido ao usuário,
  // e executa o evento onChange
  function updateValue(value: string) {
    field.onChange(value || "");
    onChange && onChange(value, value);
    handleErrorMessages(value || "");
  }

  // Atualiza o valor do campo toda vez que o value ou defaultValue mudam
  useParentController({ value, defaultValue, updateValue });

  return (
    <div
      className={twMerge(
        "w-full",
        className?.container,
        disabled && "input-disabled"
      )}
    >
      <Label className={className?.label}>{label}</Label>

      {remountSelect && (
        <select
          defaultValue={defaultValue || "DEFAULT"}
          value={value}
          onChange={(e) => {
            field.onChange(e.target.value);
          }}
          name={name}
          className={twMerge(
            "input-base",
            !!field.value && defaultValue !== field.value && "input-modified",
            errorMessageArray && "input-error",
            className?.select
          )}
        >
          {!defaultValue && (
            <option
              value="DEFAULT"
              disabled
              hidden
            >
              Selecione aqui
            </option>
          )}
          {items.map((item, idx) => {
            return (
              <option
                key={idx}
                value={item.value}
              >
                {item.label}
              </option>
            );
          })}
        </select>
      )}

      <ErrorMessages
        errorMessageArray={errorMessageArray}
        className={className?.errors || {}}
      />
    </div>
  );
}
