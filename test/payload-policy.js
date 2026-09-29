'use strict';

const assert = require('node:assert/strict');
const { admitStreamPayloadPolicy } = require('../lib/payload-policy');

const base = {
  codec: 'messagepack',
  framing: 'tcp-length-delimited',
  max_encoded_bytes: 1024,
  max_decoded_bytes: 4096,
  preserve_opaque_bytes: false,
  allow_renegotiation: false,
};

assert.equal(admitStreamPayloadPolicy(base).codec, 'messagepack');
assert.throws(() => admitStreamPayloadPolicy({...base, codec: 'msgpack'}), /unsupported stream codec/);
assert.throws(() => admitStreamPayloadPolicy({...base, framing: 'ndjson'}), /JSON record framing/);
assert.throws(() => admitStreamPayloadPolicy({...base, codec: 'protobuf'}), /preserve opaque bytes/);
assert.equal(admitStreamPayloadPolicy({...base, codec: 'protobuf', preserve_opaque_bytes: true}).codec, 'protobuf');
assert.throws(() => admitStreamPayloadPolicy({...base, max_encoded_bytes: 0}), /max_encoded_bytes/);
assert.throws(() => admitStreamPayloadPolicy({...base, extra: true}), /missing or unknown fields/);
console.log('stream payload policy admission passed');
