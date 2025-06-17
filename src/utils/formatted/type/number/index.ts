export const TypeToNumber = (
  event: React.ChangeEvent<HTMLInputElement>,
  setValue: (field: string, value: string, options?: any) => void,
  field: string,
) => {
  const value = event.target.value;
  const numericValue = value.replace(/\D/g, "");
  setValue(field, numericValue, { shouldValidate: true });
};
