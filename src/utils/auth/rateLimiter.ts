interface RateLimit {
  attempts: number;
  timestamp: number;
}

const RATE_LIMIT_KEY = 'auth_rate_limit';
const MAX_ATTEMPTS = 5;
const TIMEOUT_MINUTES = 15;

export const rateLimiter = {
  check(): boolean {
    try {
      const stored = localStorage.getItem(RATE_LIMIT_KEY);
      if (!stored) return true;

      const limit: RateLimit = JSON.parse(stored);
      const now = Date.now();
      
      // Reset if timeout has passed
      if (now - limit.timestamp > TIMEOUT_MINUTES * 60 * 1000) {
        this.reset();
        return true;
      }

      return limit.attempts < MAX_ATTEMPTS;
    } catch {
      return true;
    }
  },

  increment() {
    try {
      const stored = localStorage.getItem(RATE_LIMIT_KEY);
      const now = Date.now();
      const limit: RateLimit = stored ? JSON.parse(stored) : { attempts: 0, timestamp: now };
      
      limit.attempts++;
      limit.timestamp = now;
      
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(limit));
    } catch (error) {
      console.error('Rate limiter error:', error);
    }
  },

  reset() {
    localStorage.removeItem(RATE_LIMIT_KEY);
  },

  getTimeRemaining(): number {
    try {
      const stored = localStorage.getItem(RATE_LIMIT_KEY);
      if (!stored) return 0;

      const limit: RateLimit = JSON.parse(stored);
      const timeElapsed = (Date.now() - limit.timestamp) / 1000;
      const timeRemaining = (TIMEOUT_MINUTES * 60) - timeElapsed;
      
      return Math.max(0, Math.ceil(timeRemaining));
    } catch {
      return 0;
    }
  }
};