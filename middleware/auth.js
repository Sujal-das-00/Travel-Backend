export const requireAdmin = (req, res, next) => {
  if (req.session?.isAdmin) return next();
  return res.status(401).json({ message: "Unauthorized" });
};
