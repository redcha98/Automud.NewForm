export const Step3Data = [
  {
    id: 1,
    name: "Anno",
    options: [
      ...Array.from(
        { length: new Date().getFullYear() - 2000 + 1 },
        (v, k) => ({
          value: k + 2000,
          label: k + 2000,
        })
      ),
    ],
  },
  {
    id: 2,
    name: "Marca",
    options: [],
  },
  {
    id: 3,
    name: "Modello",
    options: [],
  },
  {
    id: 4,
    name: "Cilindrata",
    options: [
      { value: 1000, label: "1.0" },
      { value: 1500, label: "1.5" },
      { value: 2000, label: "2.0" },
      { value: 3000, label: "3.0" },
    ],
  },
  {
    id: 5,
    name: "Alimentazione",
    options: [
      { value: 10, label: "Benzina" },
      { value: 15, label: "Benzina Ibrida" },
      { value: 20, label: "Diesel" },
      { value: 25, label: "Diesel Ibrida" },
      { value: 30, label: "Elettrica" },
      { value: 35, label: "GPL" },
      { value: 40, label: "Metano" },
      { value: 45, label: "Etanolo" },
    ],
  },
  {
    id: 6,
    name: "Cambio",
    options: [
      { value: 10, label: "Manuale" },
      { value: 20, label: "Automatico" },
    ],
  },
];
