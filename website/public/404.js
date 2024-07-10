// https://vercel.com/guides/custom-404-page
module.exports = (req, res) => {
  res.status(404).json({ message: 'Not Found' });
};
