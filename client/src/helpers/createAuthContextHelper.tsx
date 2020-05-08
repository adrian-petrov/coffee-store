import React from 'react';
/**
 * A helper to create a Context and Provider with no upfront default value, and
 * without having to check for undefined all the time.
 */
export function createCtx<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;

  const defaultUpdate: UpdateType = () => defaultValue;

  const ctx = React.createContext({
    authState: defaultValue,
    updateAuthState: defaultUpdate,
  });

  function Provider(props: React.PropsWithChildren<{}>) {
    const [authState, updateAuthState] = React.useState(defaultValue);
    return <ctx.Provider value={{ authState, updateAuthState }} {...props} />;
  }
  return [ctx, Provider] as const;
  // alternatively, [typeof ctx, typeof Provider]
}
