declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    JWT_SECRET?: string;
    CORS_ORIGIN?: string;
    MONGODB_URI?: string;
    MONGODB_DB_NAME?: string;
  }
}
