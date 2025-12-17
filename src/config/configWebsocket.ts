import type { WsReceiveMessage, WsReceiveMsgPayloadMap } from "@/constants/WebSocketMessageReceive"
import type { WsSendMessage, WsSendMsgPayloadMap } from "@/constants/WebsocketMessageSend";
import type { WebSocketEvent } from "@/constants/WebSoketMessage"

type WsCallback<K extends keyof WsReceiveMsgPayloadMap> = (
    data: WsReceiveMessage<K>
) => void;

export class WebsocketInstance {
    private static instance: WebsocketInstance
    private static BASE_URL = "wss://chat.longapp.site/chat/chat"
    private socket: WebSocket | null = null
    private subscriber: Map<string, Function[]> = new Map()

    private constructor() {
        WebsocketInstance.instance = new WebsocketInstance()
        this.socket = new WebSocket(WebsocketInstance.BASE_URL)
    }

    public static getInstance() {
        if (!WebsocketInstance.instance) {
            new WebsocketInstance()
        }
        return WebsocketInstance.instance
    }

    public connect(url: string = WebsocketInstance.BASE_URL) {
        this.socket = new WebSocket(url)

        this.socket.onopen = () => {
            //Temp msg
            console.log("Connected to server successfully!")
        }

        this.socket.onmessage = (event: MessageEvent) => {
            try {
                const response = JSON.parse(event.data)
                const messageEvent = response.event as WebSocketEvent
                this.emit(messageEvent, response)
            }
            catch (error) {
                //Msg here
            }
        }

        this.socket.onclose = (event: CloseEvent) => {
            console.log("Connection closed", event.code, event.reason)
            // Temp here
            if (event.code === 1006) {
                // setTimeout(() => this.connect(), 3000)
            }
        }

        this.socket.onerror = (error: Event) => {
            console.log("Server error", error)
        }
    }

    public send<K extends WebSocketEvent>(
        event: K,
        data: WsSendMsgPayloadMap[K]
    ) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            const message: WsSendMessage<K> = {
                action: "onchat",
                data: { event, data }
            }
            this.socket.send(JSON.stringify(message))
        }
        else {
            //Can't send msg
            console.log("Cant send msg")
        }
    }

    //Impl pub/sub
    public subscribe<K extends WebSocketEvent>(
        event: K,
        callback: WsCallback<K>
    ) {
        if (!this.subscriber.has(event)) {
            this.subscriber.set(event, [])
        }
        this.subscriber.get(event)?.push(callback)

        return () => this.unsubscribe(event, callback)
    }

    private unsubscribe<K extends WebSocketEvent>(
        event: K,
        callback: WsCallback<K>
    ) {
        const listener = this.subscriber.get(event)
        if (listener) {
            this.subscriber.set(event, listener.filter(cb => cb !== callback))
        }
    }

    //Send data to subscribers
    private emit<K extends WebSocketEvent>(
        event: K,
        data: WsReceiveMessage<K>
    ) {
        const listener = this.subscriber.get(event)
        if (listener) {
            listener.forEach(cb => cb(data))
        }
    }
}