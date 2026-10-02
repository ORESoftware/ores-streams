# Stream codec and framing contract

Tracking: #5.

Streaming mode and representation codec are independent axes. A negotiated stream fixes its codec for the stream lifetime unless an explicit renegotiation protocol is selected.

Supported representation classes include MessagePack, CBOR, Protobuf, raw bytes, and JSON. JSON-only framing such as NDJSON or JSON-seq is valid only when JSON is the selected codec. TCP may use explicit length-delimited records; WebSocket binary messages retain binary records rather than forcing JSON text.

Encoded and decompressed byte ceilings apply before semantic dispatch. Backpressure, cancellation, ordering, and stream lifetime semantics are preserved across codecs. Equivalent semantic DTOs must normalize to the same application meaning after representation decode; representation features outside the authored TypeSpec/JSON Schema domain do not create new semantics.
