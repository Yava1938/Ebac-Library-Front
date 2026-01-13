import { useState, useEffect } from "react";

const SearchSelect = ({ label, value, onChange, options }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);

  useEffect(() => {
    if (!value || !options.length) return;

    const selected = options.find(
      (o) => Number(o.id) === Number(value)
    );

    if (selected) setQuery(selected.nombre);
  }, [value, options]);

  const filtered = options.filter((opt) =>
    opt.nombre.toLowerCase().includes(query.toLowerCase())
  );

  const selectOption = (opt) => {
    onChange(opt.id);
    setQuery(opt.nombre);
    setOpen(false);
    setHighlighted(-1);
  };

  return (
    <div className="form-group">
      <label>{label}</label>

      <div
        className="search-select"
        tabIndex={0}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlighted(-1);
          }}
        />

        {open && (
          <ul className="dropdown">
            {filtered.map((opt, index) => (
              <li
                key={opt.id}
                className={index === highlighted ? "active" : ""}
                onMouseEnter={() => setHighlighted(index)}
                onClick={() => selectOption(opt)}
              >
                {opt.nombre}
              </li>
            ))}

            {filtered.length === 0 && (
              <li className="empty">Sin resultados</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchSelect;