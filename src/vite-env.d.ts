/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CONTACT_PHONE?: string;
  readonly VITE_ADDRESS?: string;
  readonly VITE_BUSINESS_HOURS?: string;
  readonly VITE_MAP_EMBED_URL?: string;
  readonly VITE_INSTAGRAM_URL?: string;
  readonly VITE_FACEBOOK_URL?: string;
  readonly VITE_TIKTOK_URL?: string;
  readonly VITE_PINTEREST_URL?: string;
  readonly VITE_ALUQIS_URL?: string;
  readonly VITE_DEMO_MODE?: string;
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
