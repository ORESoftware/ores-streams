'use strict';

const CODECS = Object.freeze(new Set(['json', 'messagepack', 'cbor', 'protobuf', 'raw']));
const FRAMINGS = Object.freeze(new Set(['ndjson', 'json-seq', 'tcp-length-delimited', 'websocket-message']));
const MAX_ENCODED_BYTES = 16 * 1024 * 1024;
const MAX_DECODED_BYTES = 64 * 1024 * 1024;

function assertPositiveBoundedInteger(value, max, name) {
  if (!Number.isSafeInteger(value) || value < 1 || value > max) {
    throw new TypeError(`${name} must be a positive safe integer <= ${max}`);
  }
}

function admitStreamPayloadPolicy(policy) {
  if (!policy || typeof policy !== 'object' || Array.isArray(policy)) {
    throw new TypeError('stream payload policy must be an object');
  }
  const keys = Object.keys(policy).sort();
  const expected = [
    'allow_renegotiation',
    'codec',
    'framing',
    'max_decoded_bytes',
    'max_encoded_bytes',
    'preserve_opaque_bytes',
  ];
  if (keys.length !== expected.length || keys.some((key, index) => key !== expected[index])) {
    throw new TypeError('stream payload policy contains missing or unknown fields');
  }
  if (!CODECS.has(policy.codec)) throw new TypeError('unsupported stream codec');
  if (!FRAMINGS.has(policy.framing)) throw new TypeError('unsupported stream framing');
  if (typeof policy.preserve_opaque_bytes !== 'boolean') throw new TypeError('preserve_opaque_bytes must be boolean');
  if (typeof policy.allow_renegotiation !== 'boolean') throw new TypeError('allow_renegotiation must be boolean');
  assertPositiveBoundedInteger(policy.max_encoded_bytes, MAX_ENCODED_BYTES, 'max_encoded_bytes');
  assertPositiveBoundedInteger(policy.max_decoded_bytes, MAX_DECODED_BYTES, 'max_decoded_bytes');
  if ((policy.framing === 'ndjson' || policy.framing === 'json-seq') && policy.codec !== 'json') {
    throw new TypeError('JSON record framing requires the json codec');
  }
  if ((policy.codec === 'protobuf' || policy.codec === 'raw') && !policy.preserve_opaque_bytes) {
    throw new TypeError('protobuf/raw streams must preserve opaque bytes');
  }
  return Object.freeze({...policy});
}

module.exports = Object.freeze({
  CODECS,
  FRAMINGS,
  MAX_ENCODED_BYTES,
  MAX_DECODED_BYTES,
  admitStreamPayloadPolicy,
});
