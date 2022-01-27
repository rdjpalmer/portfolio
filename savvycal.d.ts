// Type definitions for SavvyCal embed

declare namespace SavvyCal {
  interface InlineOptions {
    link: string;
    selector: string;
    email?: string;
    displayName?: string;
    metadata?: Object;
    theme?: "os";
  }
}

declare interface SavvyCal {
  (method: "init"): unknown;
  (method: "inline", inlineOptions: SavvyCal.InlineOptions): unknown;
  q?: unknown[];
}

declare interface Window {
  SavvyCal: SavvyCal;
}
