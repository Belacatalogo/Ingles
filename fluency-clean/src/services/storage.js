const PREFIX = 'fluency.clean.';

function safeJsonParse(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function key(name) {
  return `${PREFIX}${name}`;
}

export const storage = {
  get(name, fallback = null) {
    try {
      return safeJsonParse(window.localStorage.getItem(key(name)), fallback);
    } catch {
      return fallback;
    }
  },

  set(name, value) {
    try {
      window.localStorage.setItem(key(name), JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn('[Fluency storage] failed to save', name, error);
      return false;
    }
  },

  remove(name) {
    try {
      window.localStorage.removeItem(key(name));
      return true;
    } catch {
      return false;
    }
  },

  getText(name, fallback = '') {
    try {
      return window.localStorage.getItem(key(name)) ?? fallback;
    } catch {
      return fallback;
    }
  },

  setText(name, value) {
    try {
      window.localStorage.setItem(key(name), String(value ?? ''));
      return true;
    } catch (error) {
      console.warn('[Fluency storage] failed to save text', name, error);
      return false;
    }
  },
};

export const storageKeys = {
  userProfile: 'user.profile',
  settings: 'settings',
  lessonDraft: 'lesson.draft',
  lessonKeys: 'lesson.keys',
  diagnostics: 'diagnostics.logs',
};
