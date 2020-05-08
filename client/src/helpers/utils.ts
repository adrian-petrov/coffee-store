export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: number;

  const debounced = (...args: any[]) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => void;
};
