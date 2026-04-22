declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_API_CATEGORY_ENDPOINT: string;
    NEXT_PUBLIC_DEFAULT_CACHE_TIME: string;
    NEXT_PUBLIC_ENABLE_MOCKS: 'true' | 'false';
  }
}