// src/lib/analytics.ts
export const track = (event: string, params: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;
  (window as any).gtag?.('event', event, params);
};

export const trackRedditLead = () => {
  if (typeof window === 'undefined') return;
  (window as any).rdt?.('track', 'Lead');
};

export const getUtmParams = () => {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(params.entries());
};