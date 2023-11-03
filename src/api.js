import { io } from "socket.io-client";
// import { RSA, Crypt } from "hybrid-crypto-js";
// const rsa = new RSA();
// const crypt = new Crypt();
const sm2 = require('sm-crypto').sm2
const base85 = require('base85');
import { z2t, t2z } from 'zero-width-lib'
import { rand } from "fastjs-next"
const clientKey = sm2.generateKeyPairHex()
const host = require("./settings.json").others.serverHost
const port = require("./settings.json").others.serverPort

// const crypt.encrypt = (key, msg) => {
//     console.log("encrypt", JSON.parse(crypt.encrypt(key, msg)).cipher);
//     console.log("keys", key, api.serverKey);
//     return JSON.parse(crypt.encrypt(key, msg)).cipher;
// }
// const crypt.decrypt = (key, msg) => {
//     return JSON.parse(crypt.decrypt(key, msg)).message;
// }

const api = {
    connect() {
        return new Promise(finish => {
            console.log("client key", clientKey);
            const socket = io('http://' + host + ':' + port);
            this.socket = socket;
            socket.on('connect', () => {
                new Promise(resolve => {
                    socket.on("swapKey", (key) => {
                        console.log("Swap key from server success");
                        this.serverKey = key;
                        console.log("server key", this.serverKey);
                        socket.emit("swapKey", sm2.doEncrypt(clientKey.publicKey, key, true));
                        socket.on("update", msg => {
                            msg = this.solve(msg);
                            if (msg.type === "swap_OK") {
                                console.log("Swap key to server success");
                                resolve()
                                finish()
                            }
                        })
                    })
                    // when receive message ( not event )
                    socket.on("message", (msg) => {
                        msg = this.solve(msg);
                        console.log(msg);
                    })
                }).then()
            });
        })
    },
    post(url, data) {
        console.log("post", url, data);
        let socket = this.socket;
        return new Promise((resolve, reject) => {
            let _request_id = rand(1000000, 9999999);
            socket.emit("request", this.pack({
                url,
                data,
                _client_v: this._client_v,
                _request_id
            }))
            socket.on("request", msg => {
                msg = this.solve(msg);
                if (msg._request_id === _request_id) {
                    if (!msg.success) {
                        console.error(msg.error);
                        return reject(msg.error)
                    }
                    console.log(msg.data);
                    resolve(msg.data)
                }
            })
        })
    },
    // clientKey: await rsa.generateKeyPairAsync(1024),
    solve(msg) {
        msg = z2t(msg);
        // msg = base85.decode(msg)
        msg = Buffer.from(msg).toString('utf8');
        msg = sm2.doDecrypt(msg, clientKey.privateKey, true);
        try {
            msg = JSON.parse(msg);
        } catch (e) { }
        return msg;
    },
    pack(msg) {
        msg = JSON.stringify(msg);
        // msg = this.serverKey.encrypt(msg, 'base64');
        msg = sm2.doEncrypt(msg, this.serverKey, true);
        // msg = base85.encode(msg);
        msg = t2z(msg);
        try {
            msg = JSON.parse(msg);
        } catch (e) { }
        return msg;
    },
    _client_v: null,
    socket: null
}


export default api;
