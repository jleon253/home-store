import { http, HttpResponse } from 'msw';
import endpointData from './endpoint-example.json';

/**
 * Handlers para Mock Service Worker.
 * Intercepta peticiones HTTP durante las pruebas unitarias.
 */
export const handlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_CATEGORY_ENDPOINT}`,
    () => {
      return HttpResponse.json(endpointData);
    }
  ),
];

/**
 * Handlers de error para simular respuestas fallidas.
 * Utilizados en pruebas específicas de manejo de errores.
 */
export const errorHandlers = {
  /**
   * Simula una respuesta 404 Not Found del API.
   */
  notFound: http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_CATEGORY_ENDPOINT}`,
    () => {
      return HttpResponse.json({ error: 'Not Found' }, { status: 404 });
    }
  ),

  /**
   * Simula una respuesta 500 Internal Server Error del API.
   */
  serverError: http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_CATEGORY_ENDPOINT}`,
    () => {
      return HttpResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  ),

  /**
   * Simula un timeout (sin respuesta).
   */
  networkError: http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_CATEGORY_ENDPOINT}`,
    () => {
      return HttpResponse.error();
    }
  ),
};
