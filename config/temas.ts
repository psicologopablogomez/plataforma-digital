// Chequeos con semáforo de cada tema ("Temas que trabajamos"). Los textos están en
// content/es.json y en.json (clave "temas"). Aquí solo van las reglas del semáforo.

import type { EspecialidadId } from "./profesionales";

// Número de frases marcadas (de 6) desde el cual cambia el color.
export const UMBRAL_AMARILLO = 2;
export const UMBRAL_ROJO = 4;

// Frases (posición, empezando en 0) que, si se marcan, ponen el semáforo en rojo y
// muestran la ayuda en crisis: las que hablan de no querer vivir o de hacerse daño.
export const frasesCriticas: Partial<Record<EspecialidadId, number[]>> = {
  depresion: [5],
  duelo: [5],
  sentido: [5],
};

export type Color = "verde" | "amarillo" | "rojo";
