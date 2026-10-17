import { FormInputLabel, Group, Input } from "./form-input.styles.jsx";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input
        id={otherProps.id || otherProps.name + "-" + label.replace(/\s/g, "")}
        {...otherProps}
      />
      {label && (
        <FormInputLabel
          htmlFor={
            otherProps.id || otherProps.name + "-" + label.replace(/\s/g, "")
          }
          shrink={otherProps.value.length}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
