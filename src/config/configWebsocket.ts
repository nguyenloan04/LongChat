export class ServerClient {
    private static instance: ServerClient
    private static BASE_URL = "wss://chat.longapp.site/chat/chat"
    private socket: WebSocket

    private constructor() {
        ServerClient.instance = new ServerClient()
        this.socket = new WebSocket(ServerClient.BASE_URL)
    }

    public static getInstance() {
        if (!ServerClient.instance) {
            new ServerClient()
        }
        return ServerClient.instance
    }

    public getSocket() {
        return this.socket
    }

    public connect(url: string) {
        if (url) this.socket = new WebSocket(url)

        this.socket.addEventListener("open", () => {
            //Temp log here
            console.log("Connect to server successfully")
        });

        this.socket.addEventListener('message', (event: MessageEvent) => {
            const data = event.data
            // console.log('Message from server: ', event.data);
            try {
                // const receivedData: WebSocketMessage = JSON.parse(event.data);
                // console.log('Parsed data:', receivedData.content);
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        });

        this.socket.addEventListener('close', (event: CloseEvent) => {
            console.log('Sever connection closed', event.code, event.reason);
        });

        this.socket.addEventListener('error', (error: Event) => {
            console.error('Server error: ', error);
        });
    }
}