type LoadedState = { [key: string]: boolean };

type SetLoadedType = React.Dispatch<React.SetStateAction<LoadedState>>;

export const handleImageLoad = (id: string, setLoaded: SetLoadedType) => {
  setLoaded((prev) => ({ ...prev, [id]: true }));
};
