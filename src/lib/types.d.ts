type Optional<T> = {
  [K in keyof T]?: T[K] | undefined | null;
};
