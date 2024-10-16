type SetPageType = React.Dispatch<React.SetStateAction<number>>;

export const handleNext = (
  currentPage: number,
  totalPages: number,
  setPage: SetPageType,
) => {
  if (currentPage === totalPages) return;

  setPage((prev: number) => prev + 1);
  window.scroll(0, 0);
};
export const handlePrev = (currentPage: number, setPage: SetPageType) => {
  if (currentPage === 1) return;
  setPage((prev: number) => prev - 1);
  window.scroll(0, 0);
};

export const handlePaginateClick = (
  index: number,
  currentPage: number,
  setPage: SetPageType,
) => {
  if (currentPage === index + 1) return;

  setPage(index + 1);
  window.scroll(0, 0);
};
