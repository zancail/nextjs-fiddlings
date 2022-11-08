interface Props {
    type: string;
    field: string;
    label: string;
    handleOnChange?: unknown;
}

const FormInput = ({
    type,
    field,
    label,
    handleOnChange,
}: Props): JSX.Element => {
    return (
        <div>
            <label htmlFor={field} className="form-label">
                {label}
            </label>
            <input
                type={type}
                id={field}
                name={field}
                className="form-control"
                onChange={(event) => handleOnChange(event.target.value, field)}
            />
        </div>
    );
};

export default FormInput;
