/// <reference types="astro/client" />

declare module '*.astro' {
  const component: (_props: any) => any;
  export default component;
}
