export const requireAdmin = (req, res, next) => {
  console.log("isAdmin:", req.session?.isAdmin);

  if (req.session && req.session.isAdmin === true) {
    return next();
  }

  return res.status(401).json({
    message: "Unauthorized"
  });
};
