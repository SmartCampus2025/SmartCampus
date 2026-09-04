// backend/ai/events/eventBus.js
// Core Event Bus: in-memory EventEmitter with optional Redis adapter (ioredis)

const EventEmitter = require('events');

let redisEnabled = false;
let pub = null;
let sub = null;

const DEFAULT_PREFIX = 'smartcampus:events:';

const bus = new EventEmitter();

// Try optional Redis adapter if REDIS_URL present
if (process.env.REDIS_URL) {
  try {
    const IORedis = require('ioredis');
    pub = new IORedis(process.env.REDIS_URL);
    sub = new IORedis(process.env.REDIS_URL);
    redisEnabled = true;

    sub.on('message', (channel, message) => {
      try {
        const { eventName, payload } = JSON.parse(message);
        // Emit locally too
        bus.emit(eventName, payload);
      } catch (e) {
        console.error('eventBus: redis message parse error', e.message);
      }
    });

    console.log('eventBus: Redis adapter enabled');
  } catch (e) {
    console.warn('eventBus: ioredis not installed or failed to init. Using in-memory only.');
    redisEnabled = false;
  }
}

/**
 * Subscribe to an event (handler will receive payload)
 * @param {string} eventName
 * @param {function} handler (payload) => {}
 */
function onEvent(eventName, handler) {
  bus.on(eventName, handler);
  // If redis is enabled, also subscribe channel once
  if (redisEnabled && sub) {
    sub.subscribe(DEFAULT_PREFIX + eventName).catch(() => {});
  }
}

/**
 * Emit event locally and via Redis (if enabled)
 * @param {string} eventName
 * @param {object} payload
 */
async function emitEvent(eventName, payload = {}) {
  try {
    // local emit
    bus.emit(eventName, payload);

    // publish to redis channel for other instances
    if (redisEnabled && pub) {
      const message = JSON.stringify({ eventName, payload });
      await pub.publish(DEFAULT_PREFIX + eventName, message);
    }
  } catch (e) {
    console.error('eventBus: emit error', e.message);
  }
}

/**
 * Remove handler
 */
function offEvent(eventName, handler) {
  bus.off(eventName, handler);
  // unsubscribing from Redis is left for later if needed
}

module.exports = { onEvent, emitEvent, offEvent, __internal__: { bus, redisEnabled } };
