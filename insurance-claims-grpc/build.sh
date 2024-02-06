grpc_tools_node_protoc \
  --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
  --js_out=import_style=commonjs,binary:./generated \
  --grpc_out=./generated \
  --ts_out=./generated \
  -I=src/ src/**/*.proto
