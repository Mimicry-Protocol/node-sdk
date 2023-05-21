export const sum = (a: number, b: number) => {
  if (__DEV__) {
    console.log('bloop bloop');
  }

  return a + b;
};
