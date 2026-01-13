class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
    return () => this.off(event, fn);
  }

  off(event, fn) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((f) => f !== fn);
  }

  emit(event, data) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach((fn) => fn(data));
  }
}

export const events = new EventEmitter();