import { deflate, inflate } from 'fflate'

/**
 * Encode/decode app state to/from the URL hash.
 *
 * Pipeline:
 *   encode: JSON.stringify → fflate.deflate → base64url → window.location.hash
 *   decode: window.location.hash → base64url → fflate.inflate → JSON.parse
 */

/** base64url encode (URL-safe, no padding) */
function toBase64Url(bytes) {
  const binary = Array.from(bytes, b => String.fromCharCode(b)).join('')
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

/** base64url decode */
function fromBase64Url(str) {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '=='.slice((str.length + 3) % 4 || 4)
  const binary = atob(padded)
  return Uint8Array.from(binary, c => c.charCodeAt(0))
}

/**
 * Encode a state object into a URL-safe hash string.
 * @param {object} state
 * @returns {Promise<string>} hash string (without leading #)
 */
export function encodeState(state) {
  return new Promise((resolve, reject) => {
    const json = JSON.stringify(state)
    const bytes = new TextEncoder().encode(json)
    deflate(bytes, { level: 6 }, (err, compressed) => {
      if (err) return reject(err)
      resolve(toBase64Url(compressed))
    })
  })
}

/**
 * Decode a hash string back to a state object.
 * @param {string} hash - the hash value (with or without leading #)
 * @returns {Promise<object|null>}
 */
export function decodeState(hash) {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash
  if (!raw) return Promise.resolve(null)
  return new Promise((resolve) => {
    try {
      const compressed = fromBase64Url(raw)
      inflate(compressed, (err, decompressed) => {
        if (err) return resolve(null)
        try {
          const json = new TextDecoder().decode(decompressed)
          resolve(JSON.parse(json))
        } catch {
          resolve(null)
        }
      })
    } catch {
      resolve(null)
    }
  })
}

/**
 * Write encoded state to window.location.hash (replaces history entry).
 * @param {object} state
 */
export async function pushStateToHash(state) {
  const encoded = await encodeState(state)
  history.replaceState(null, '', '#' + encoded)
}

/**
 * Read and decode state from the current window.location.hash.
 * @returns {Promise<object|null>}
 */
export function readStateFromHash() {
  return decodeState(window.location.hash)
}
