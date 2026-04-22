import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { handlers } from './handlers';

/**
 * Configura el servidor MSW que intercepta todas las peticiones HTTP
 * durante la ejecución de las pruebas.
 */
const server = setupServer(...handlers);

/**
 * Inicializa el servidor MSW antes de ejecutar las pruebas.
 */
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

/**
 * Limpia los handlers entre pruebas para evitar interferencia.
 */
afterEach(() => server.resetHandlers());

/**
 * Detiene el servidor MSW después de todas las pruebas.
 */
afterAll(() => server.close());

export { server };
