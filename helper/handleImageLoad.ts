export type LoadedState = { [key: string]: boolean };

export type SetLoadedType = React.Dispatch<React.SetStateAction<LoadedState>>;

export const handleImagesLoad = (
  isloaded: LoadedState,
  setIsLoaded: SetLoadedType,
) => {
  for (const id in isloaded) {
    setIsLoaded((prev) => {
      if (!prev[id]) {
        return { ...prev, [id]: true };
      }
      return prev;
    });
  }
};

export const handleImageLoad = (id: string, setIsLoaded: SetLoadedType) => {
  setIsLoaded((prev) => ({ ...prev, [id]: true }));
};
