export function getLocalStorage() {
  if (localStorage.getItem('levels') === null) {
    localStorage.setItem('levels', JSON.stringify({ 1: 'unlocked' }));
  }
  return JSON.parse(localStorage.getItem('levels') || '{}');
}

/**
 * @param {{levelNumber: number}} props
 * @return {'locked' | 'unlocked'}
 */

export function checkLevelState({ levelNumber }) {
  const localStorageData = getLocalStorage();
  if (localStorageData[levelNumber] != null) {
    return localStorageData[levelNumber];
  }
  return 'locked';
}
/**
 * @param {{levelNumber: number}} props
 */
export function unlockedLevel({ levelNumber }) {
  const localStorageData = getLocalStorage();
  localStorageData[levelNumber] = 'unlocked';
  localStorage.setItem('levels', JSON.stringify(localStorageData));
}
