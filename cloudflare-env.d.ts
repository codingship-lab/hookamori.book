declare namespace Cloudflare {
  interface Env {
    ASSETS: Fetcher;
    NEXTJS_ENV: string;
    WORKER_SELF_REFERENCE: Fetcher;
  }
}

interface CloudflareEnv extends Cloudflare.Env {}

type StringifyValues<EnvType extends Record<string, unknown>> = {
  [Binding in keyof EnvType]: EnvType[Binding] extends string ? EnvType[Binding] : string;
};

declare namespace NodeJS {
  interface ProcessEnv
    extends StringifyValues<Pick<Cloudflare.Env, "NEXTJS_ENV">> {}
}
