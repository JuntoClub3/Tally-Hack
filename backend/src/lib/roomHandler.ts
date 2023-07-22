import { Socket } from "socket.io";
import { io, playerRooms, rooms } from "..";
import { shuffleList } from "./functions";
import { Player } from "./types";

export const createRoomHandler = (socket: Socket) => {
	socket.on("create room", (roomId: string, mode: "words" | "sentences" | "numbers") => {
		if (io.sockets.adapter.rooms.get(roomId)) {
			socket.emit("room already exist");
		} else {
			const toType = shuffleList(mode).join(" ");
			rooms[roomId] = {
				players: [],
				toType,
				inGame: false,
				winner: null,
			};

			socket.emit("words generated", rooms[roomId].toType);
			socket.emit("create room success", roomId);
		}
	});
};

export const joinRoomHander = (socket: Socket) => {
	socket.on("join room", ({ roomId, user }: { roomId: string; user: Player }) => {
		socket.emit("end game");
		const room = rooms[roomId];
		if (!room) {
			socket.emit("room invalid");
			return;
		} else if (rooms[roomId].inGame) {
			socket.emit("room in game");
			return;
		} else {
			rooms[roomId].players = [...rooms[roomId].players, user];
			playerRooms[socket.id] = [roomId];
		}

		socket.join(roomId);
		socket.emit("words generated", rooms[roomId].toType);
		io.in(roomId).emit("room update", rooms[roomId].players);
		io.in(roomId).emit("receive chat", { username: user.username, value: "joined", id: user.id, type: "notification" });
	});
};