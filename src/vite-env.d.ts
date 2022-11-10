/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_BASIC_URL: string
  readonly VITE_APP_RESOURCE_URL: string
  readonly VITE_APP_MAP_SECRET: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
