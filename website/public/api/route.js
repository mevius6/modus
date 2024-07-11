// https://vercel.com/guides/custom-404-page
export function GET(request) {
  return new Response().status(404).json({ message: 'Not Found' });
};
export const config = {
  runtime: 'nodejs',
};
