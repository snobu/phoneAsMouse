package com.example.a_gabade.androidmouseclick;

import java.net.URISyntaxException;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

/**
 * Created by a-gabade on 9/22/2015.
 */
public class SocketIoHandler {

    private Socket socket;

    public SocketIoHandler() {
        System.out.println("init socket io");

        try {
            socket = IO.socket("http://localhost");
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        socket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {

           @Override
           public void call(Object... args) {
               socket.emit("foo", "hi");
               socket.disconnect();
           }

       }).on("event", new Emitter.Listener() {

           @Override
           public void call(Object... args) {}

       }).on(Socket.EVENT_DISCONNECT, new Emitter.Listener() {

           @Override
           public void call(Object... args) {}

       });
       socket.connect();
   }
}
