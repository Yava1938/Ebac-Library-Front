import { useState, useEffect, useMemo } from "react";
import SearchSelect from "./SearchSelect";

const DynamicForm = ({ config, onSubmit, loading, initialValues = {} }) => {
  const [form, setForm] = useState(initialValues);

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  const getOptionsFromCache = (key) => {
    const cached = localStorage.getItem(key);
    return cached ? JSON.parse(cached) : [];
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = useMemo(() => {
    return config.fields.every((field) => {
      if (!field.required) return true;
      return form[field.name] !== undefined && form[field.name] !== "";
    });
  }, [form, config.fields]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit(form);
  };

  return (
    <form className="dynamic-form" onSubmit={handleSubmit}>
      {config.fields.map((field) => {
        if (field.type === "search-select") {
          const options = getOptionsFromCache(field.source);
          
          return (
            <SearchSelect
              key={field.name}
              label={field.label}
              value={form[field.name]}
              options={options}
              onChange={(id) => handleChange(field.name, id)}
            />
          );
        }

        return (
          <div className="form-group" key={field.name}>
            <label>{field.label}</label>
            <input
              type={field.type}
              required={field.required}
              value={form[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          </div>
        );
      })}

      <button
        type="submit"
        className="primary-btn full-width"
        disabled={!isValid || loading}
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default DynamicForm;