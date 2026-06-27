export function canApply(user) {
  const limits = {
    free: 1,
    bronze: 3,
    silver: 5,
    gold: Infinity,
  };

  const limit = limits[user.plan];

  return user.applicationsUsed < limit;
}