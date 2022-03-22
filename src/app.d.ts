declare module '@primer/octicons'

declare interface ImportMetaEnv {
  readonly TODO_SUPABASE_KEY: string
  readonly TODO_SUPABASE_URL: string
  readonly TODO_GH_CLIENT_ID: string
  readonly TODO_GH_CLIENT_SECRET: string
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
