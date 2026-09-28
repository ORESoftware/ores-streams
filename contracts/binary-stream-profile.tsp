import "@typespec/json-schema";
using TypeSpec.JsonSchema;

namespace Ores.Streams.Binary;

enum PayloadCodec {
  json,
  messagepack,
  cbor,
  protobuf,
  raw,
}

enum StreamFraming {
  single,
  length_delimited,
  websocket_binary,
  ndjson,
  json_seq,
}

model BinaryStreamProfileV1 {
  schema: "ores.streams.binary-profile/v1";
  codec: PayloadCodec;
  framing: StreamFraming;
  streaming: boolean;
  @minValue(1)
  @maxValue(16777216)
  max_encoded_bytes: uint32;
  @minValue(1)
  @maxValue(67108864)
  max_decoded_bytes: uint32;
  fixed_codec: boolean;
}
