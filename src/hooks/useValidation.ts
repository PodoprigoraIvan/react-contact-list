import { useState, useMemo } from "react";

export type ValidationType = "name" | "phone";

export const useValidation = (
  validationType: ValidationType,
  initialValue = ""
): [string, (value: string) => void, string, boolean] => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>(" ");
  const validationResult = useMemo(() => {
    if (value != "") {
      switch (validationType) {
        case "name":
          if (value.length < 3) {
            setError("Name must contain at least 3 letters");
            return false;
          }
          if (!/^[a-zA-Z]*$/.test(value)) {
            setError("Name must contain only latin letters");
            return false;
          }
          setError("");
          return true;
        case "phone":
          if (!/^(?:\+|\d)\d{4,}$/.test(value)) {
            setError("Invalid phone number");
            return false;
          }
          setError("");
          return true;
      }
    } else {
      setError("");
      return true;
    }
  }, [value]);

  return [value, setValue, error, validationResult];
};
