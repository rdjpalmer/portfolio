export {};

declare global {
  interface Window {
    fathom: {
      trackGoal: (id: string, cents: number) => void;
      trackDynamicGoal: (id: string, cents: number) => void;
    };
  }
}
