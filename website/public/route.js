// https://vercel.com/guides/custom-404-page
export function GET(req, res) {
  return res.status(404).json({ message: 'Not Found' });
};
export const config = {
  runtime: 'nodejs',
};
