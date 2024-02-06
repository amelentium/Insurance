import { Server, ServerCredentials } from "@grpc/grpc-js";

const server = new Server();

const HOST = process.env.GRPS_HOST;
const PORT = Number(process.env.GRPS_PORT);

const address = `${HOST}:${PORT}`;

server.bindAsync(
  address,
  ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      throw error;
    }
    console.log("server is running at", address);
    server.start();
  }
);
