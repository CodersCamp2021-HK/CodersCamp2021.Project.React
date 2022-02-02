/** @param {{number: number}} props

 */

export function getLocalStorage() {
  const getDataFromLocalStorage = localStorage.getItem('levels');
  return JSON.parse(getDataFromLocalStorage) ?? { 1: 'unlocked' };
}

export function checkLevelState({ levelNumber }) {
  const localStorageData = getLocalStorage();
  localStorage.setItem('levels', JSON.stringify(localStorageData));
  if (localStorageData[levelNumber] != null) {
    return localStorageData[levelNumber];
  }
  return 'locked';
}

export function unlockedLevel({ levelNumber }) {
  const localStorageData = getLocalStorage();
  localStorageData[levelNumber] = 'unlocked';
  localStorage.setItem('levels', JSON.stringify(localStorageData));
}
