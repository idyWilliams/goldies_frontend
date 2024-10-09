export const captalizedName = (name: string) => {
  const value = name
    ?.split(" ")
    ?.map((el) => el?.slice(0, 1)?.toUpperCase() + el?.slice(1))
    ?.join(" ");

  return value;
};
