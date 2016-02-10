﻿import { session } from "../lib/session";

// Passes socket object and event arguments to handler
// Also sets current session object to socket.session
function call(file: string, socket: SocketIO.Socket, args: IArguments) {
    session.get(socket.id, (session) => {
        socket.session = session;

        require(file).apply(
            null,
            [socket].concat(Array.prototype.slice.call(args))
        );
    });
}

export = (socket: SocketIO.Socket) => {
        
    /* Note Element Events */
    socket.on("get note elements"   , function () { call("./notes/get", socket, arguments); });
    socket.on("update note element" , function () { call("./notes/update", socket, arguments); });
    socket.on("delete note element" , function () { call("./notes/delete", socket, arguments); });
    socket.on("create note element" , function () { call("./notes/create", socket, arguments); });
        
    /* Non-Note Document Events */
    socket.on("get document content"    , function () { call("./documents/get", socket, arguments); });
    socket.on("update document content" , function () { call("./documents/update", socket, arguments); });
    socket.on("set document syntax"     , function () { call("./documents/syntax", socket, arguments); });

    /* Explorer Events */
    socket.on("get objects in folder" , function () { call("./explorer/get", socket, arguments); });
    socket.on("create object"         , function () { call("./explorer/create", socket, arguments); });
    socket.on("move object to folder" , function () { call("./explorer/move", socket, arguments); });
    socket.on("delete object"         , function () { call("./explorer/delete", socket, arguments); });
    socket.on("find objects"          , function () { call("./explorer/find", socket, arguments); });
    socket.on("rename object"         , function () { call("./explorer/rename", socket, arguments); });
    socket.on("close document"        , (doc: number) => socket.leave(''+doc));

    /* Document Contributor Management Events */
    socket.on("add user to document"      , function () { call("./contributors/add", socket, arguments); });
    socket.on("remove user from document" , function () { call("./contributors/remove", socket, arguments); });
    socket.on("set user permissions"      , function () { call("./contributors/permissions", socket, arguments); });

    /* User Events */
    socket.on("get user info"    , function () { call("./user/get", socket, arguments); });
    socket.on("login user"       , function () { call("./user/login", socket, arguments); });
    socket.on("update user info" , function () { call("./user/update", socket, arguments); });

    /* Shortcut Events */
    socket.on("create shortcut"  , function () { call("./shortcuts/create", socket, arguments); });
    socket.on("delete shortcut"  , function () { call("./shortcuts/delete", socket, arguments); });

    socket.on("disconnect", () => session.destroy(socket.id));

}