// Configuración base (versión 1) para evaluación de gran escala.
export const defaultDirectQualificationOptions = [
  'Datos de salud',
  'Perfilamiento automatizado',
  'Videovigilancia',
  'Datos biométricos o geolocalización',
  'Datos de menores',
  'Información financiera',
  'Transferencias sistemáticas',
  'Telecomunicaciones',
  'Instituciones educativas',
];

export const defaultScoringQuestions = [
  {
    id: 'titulares',
    label: 'Número de titulares',
    options: [
      { label: '<10k', points: 1 },
      { label: '10k–100k', points: 2 },
      { label: '>100k', points: 4 },
    ],
  },
  {
    id: 'volumen',
    label: 'Volumen de datos',
    options: [
      { label: 'hasta 10', points: 0.5 },
      { label: '11–30', points: 1 },
      { label: '31–100', points: 2 },
      { label: '>100', points: 3 },
    ],
  },
  {
    id: 'categoria',
    label: 'Categoría de datos',
    options: [
      { label: 'básicos', points: 0.5 },
      { label: '1 categoría especial', points: 2 },
      { label: 'múltiples', points: 3 },
    ],
  },
  {
    id: 'frecuencia',
    label: 'Frecuencia',
    options: [
      { label: 'puntual', points: 0.5 },
      { label: 'periódica', points: 1 },
      { label: 'continua', points: 2 },
    ],
  },
  {
    id: 'permanencia',
    label: 'Permanencia',
    options: [
      { label: 'ocasional', points: 0.5 },
      { label: 'temporal', points: 1 },
      { label: 'prolongada', points: 2 },
    ],
  },
  {
    id: 'alcance',
    label: 'Alcance',
    options: [
      { label: 'local', points: 1 },
      { label: 'nacional', points: 2 },
      { label: 'internacional', points: 3 },
    ],
  },
];

export const SCORE_THRESHOLD = 6;

export const defaultAdminConfig = {
  directOptions: defaultDirectQualificationOptions,
  scoringQuestions: defaultScoringQuestions,
};
