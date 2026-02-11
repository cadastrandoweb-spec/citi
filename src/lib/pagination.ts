export function paginate<T>(items: T[], page: number, perPage: number) {
  const safePerPage = Math.max(1, perPage);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / safePerPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * safePerPage;
  const end = start + safePerPage;

  return {
    page: safePage,
    perPage: safePerPage,
    total,
    totalPages,
    items: items.slice(start, end),
  };
}
