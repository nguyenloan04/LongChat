import type { WsReceiveMessage, WsReceiveMsgPayloadMap } from "@/socket/types/WebSocketMessageReceive"
import type { WsSendMessage, WsSendMsgPayloadMap } from "@/socket/types/WebsocketMessageSend";
import type { WebSocketEvent } from "@/socket/types/WebSoketMessage"

/**
 * Handle WebSocket response
 * @param data Message data received from a WebSocket event
 */
type WsCallback<K extends keyof WsReceiveMsgPayloadMap> = (
    data: WsReceiveMessage<K>
) => void;

export class WebsocketInstance {
    private static instance: WebsocketInstance
    private static BASE_URL = "wss://chat.longapp.site/chat/chat"
    private socket: WebSocket | null = null
    private subscriber: Map<string, Function[]> = new Map()

    public onInitConnection?: () => void
    public onConnectionLost?: (code: number) => void
    public onServerError?: () => void

    private constructor() {
        this.socket = new WebSocket(WebsocketInstance.BASE_URL)
        this.connect()
    }

    public static getInstance() {
        if (!WebsocketInstance.instance) {
            WebsocketInstance.instance = new WebsocketInstance()
        }
        return WebsocketInstance.instance
    }

    public connect(url: string = WebsocketInstance.BASE_URL) {
        this.socket = new WebSocket(url)
        this.socket.onopen = () => {
            //Temp msg
            console.log("Connected to server successfully!")
            
            if (this.onInitConnection) {
                this.onInitConnection()
            }
        }

        this.socket.onmessage = (event: MessageEvent) => {
            try {
                console.log(event.data)
                const response = JSON.parse(event.data)
                const messageEvent = response.event as WebSocketEvent
                this.emit(messageEvent, response)
            }
            catch (error) {
                //Msg here
                console.log(error)
            }
        }

        this.socket.onclose = (event: CloseEvent) => {
            console.log("Connection closed", event.code, event.reason)
            //Let middleware handle
            if (this.onConnectionLost) {
                this.onConnectionLost(event.code)
            }
        }

        this.socket.onerror = (error: Event) => {
            console.log("Server error", error)
            if (this.onServerError) {
                this.onServerError()
            }
        }
    }

    public send<K extends WebSocketEvent>(
        event: K,
        data: WsSendMsgPayloadMap[K]
    ) {
        console.log(this.socket)
        console.log(this.socket?.readyState)
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
    /**
     * Subscribe an event from a component or from a middleware
     * @param event - Event subcribed from subscriber
     * @param callback - A callback to handle message response from `event`
     * @returns A function to unsubscribe current event
     * @see `unsubscribe()` for return function
     * @see `WsCallback` for response handler
     */
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

    /**
     * Unsubscribe an event from subscriber
     * @param event - Event subscriber want to unsubscribed
     * @param callback - Callback definied when call `subscribe()` function
     */
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

    get getSocket() {
        return this.socket
    }
}