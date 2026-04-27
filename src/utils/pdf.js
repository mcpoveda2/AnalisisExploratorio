import { jsPDF } from 'jspdf';

export const exportEvaluationToPdf = ({ evaluation, threshold }) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Reporte de evaluación - Gran Escala', 14, 20);

  doc.setFontSize(11);
  doc.text(`Fecha: ${new Date(evaluation.createdAt).toLocaleString()}`, 14, 30);
  doc.text(`Resultado: ${evaluation.resultLabel}`, 14, 38);
  doc.text(`Puntaje: ${evaluation.score.toFixed(1)} (umbral: ${threshold})`, 14, 46);

  doc.text('Calificación directa seleccionada:', 14, 58);
  const directText =
    evaluation.directSelections.length > 0
      ? evaluation.directSelections.join(', ')
      : 'Ninguna opción directa seleccionada';

  const splitDirect = doc.splitTextToSize(directText, 180);
  doc.text(splitDirect, 14, 66);

  const questionStartY = 66 + splitDirect.length * 6 + 8;
  doc.text('Respuestas por puntaje:', 14, questionStartY);

  let currentY = questionStartY + 8;
  evaluation.answersSummary.forEach((item) => {
    const line = `- ${item.question}: ${item.optionLabel} (${item.points} pts)`;
    const splitLine = doc.splitTextToSize(line, 180);
    doc.text(splitLine, 14, currentY);
    currentY += splitLine.length * 6;
  });

  doc.save(`evaluacion-gran-escala-${evaluation.id}.pdf`);
};
