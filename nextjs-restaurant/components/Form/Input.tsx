import classNames from "classnames";

interface Props {
    type: string;
    field: string;
    label: string;
    required?: boolean;
    oldValue?: string;
    errors?: unknown;
    handleOnChange?: (inputValue: string, inputName: string) => void;
}

const FormInput = ({
    type,
    field,
    label,
    required,
    errors,
    oldValue,
    handleOnChange,
}: Props): JSX.Element => {
    return (
        <div className="mb-4">
            <label htmlFor={field} className="form-label">
                {label}
                {required && "*"}
            </label>
            <input
                type={type}
                id={field}
                name={field}
                className={classNames("form-control", {
                    "is-invalid": errors[field],
                })}
                required={required}
                value={oldValue}
                onChange={(event) => handleOnChange(event.target.value, field)}
            />
            {errors[field] && (
                <div className="invalid-feedback">{errors[field]}</div>
            )}
            <style jsx>{`
                .invalid-feedback {
                    display: block !important;
                }
            `}</style>
        </div>
    );
};

export default FormInput;
