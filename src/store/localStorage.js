export const loadState = () => {
  try {
    const serializedSate = localStorage.getItem('state');
    if (serializedSate === null) {
      return undefined;
    }
    return JSON.parse(serializedSate);
  } catch (err) {
    console.log(`${err}`);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedSate = JSON.stringify(state);
    localStorage.setItem('state', serializedSate);
  } catch (err) {
    console.log(`${err}`)
  }
};