interface Props {
    type: string;
    field: string;
    label: string;
}

const FormInput = ({ type, field, label }: Props): JSX.Element => {
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
            />
        </div>
    );
};

export default FormInput;
