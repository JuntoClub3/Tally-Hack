import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { PlayerState, RoomState} from "./lib/types";
import { createRoomHandler, joinRoomHander } from "./lib/roomHandler";
import { endGameHander, startGameHander } from "./lib/gameHandler";

const port = process.env.PORT || 8080;	
const app = express();

// CORS is a security feature implemented by web browsers to prevent web pages from making requests to a different domain than the one that served the web page.
// used for middleware and allowing all requests from diff. origins
app.use(cors);


// CREATING A SERVER
const server = http.createServer(app);
//creating websocket instance
export const io = new Server(server, {
	cors: {
		origin: [
			"http://localhost:3000",
		],
		methods: ["GET", "POST"],
	},
});

export const playerRooms: PlayerState = {};

// rooms will consist of key value pair, key being room id, pair being users inside that room and their corresponding data
export const rooms: RoomState = {};


io.on("connection", (socket) => {
	
	socket.join("public");
	const sockets = Array.from(io.sockets.sockets).map((socket) => socket[0]);
	io.to("public").emit("online users", sockets.length);   //raises specified event

	// send online users to client, after user raises request
	socket.on("get online users", () => {
		const sockets = Array.from(io.sockets.sockets).map((socket) => socket[0]);
		io.to("public").emit("online users", sockets.length);
	});

	// game handlers
	startGameHander(socket);
	endGameHander(socket);

	// room handlers
	joinRoomHander(socket);
	createRoomHandler(socket);

});

server.listen(port, () => {
	console.log(`Listening to server on port ${port}`);
});
