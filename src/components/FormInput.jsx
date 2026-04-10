// src/components/FormInput.jsx

function FormInput({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder = "",
    error = "",
    required = false,
}) {
    return (
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "16px" }}>
            <label
                htmlFor={name}
                style={{ fontWeight: "bold", marginBottom: "6px", fontSize: "14px" }}
            >
                {label}
                {required && <span style={{ color: "#C0392B" }}> *</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    padding: "10px 14px",
                    border: error ? "2px solid #C0392B" : "1px solid #AED6F1",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none",
                }}
            />
            {error && (
                <span style={{ color: "#C0392B", fontSize: "12px", marginTop: "4px" }}>
                    {error}
                </span>
            )}
        </div>
    );
}

export default FormInput;
