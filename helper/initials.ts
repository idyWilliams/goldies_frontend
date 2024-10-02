export const initials = (name: string) => {
  const value = name?.split(" ");
  let initials: string = "";
  value?.forEach((el) => {
    initials += el?.slice(0, 1);
  });

  return initials;
};
