export const FORMS_CONFIG = {
  books: {
    title: "Agregar libro",
    endpoint: "/books",
    fields: [
      {
        name: "nombre",
        label: "Nombre del libro",
        type: "text",
        required: true,
      },
      {
        name: "anio",
        label: "Año",
        type: "number",
        required: true,
      },
      {
        name: "authorId",
        label: "Autor",
        type: "search-select", 
        source: "authors",     
        optionLabel: "nombre",
        optionValue: "id",
        required: true,
      },
    ],
  },

  authors: {
    title: "Agregar autor",
    endpoint: "/autores",
    fields: [
      {
        name: "nombre",
        label: "Nombre",
        type: "text",
        required: true,
      },
    ],
  },

  users: {
    title: "Agregar usuario",
    endpoint: "/users",
    fields: [
      {
        name: "nombre",
        label: "Nombre",
        type: "text",
        required: true,
      },
    ],
  },
};