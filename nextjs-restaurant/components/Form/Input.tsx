const FormInput = ({ type, field }) => {
    return (
        <div>
            <input type={type} id={field} name={field} />
        </div>
    );
};

export default FormInput;
