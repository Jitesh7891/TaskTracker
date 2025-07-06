export function load(key, defaultValue = null) {
  const item = sessionStorage.getItem(`taskTracker_${key}`);
  return item ? JSON.parse(item) : defaultValue;
}

export function save(key, value) {
  sessionStorage.setItem(`taskTracker_${key}`, JSON.stringify(value));
}

export function clearAll() {
  sessionStorage.clear();
}
