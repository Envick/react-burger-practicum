import {Middleware} from "redux";
import {getCookie} from "../../utils/utils";

export const socketMiddleware = (wsUrl: string, wsActions: any): Middleware => {
    return (store) => {
        let socket: WebSocket | null = null;

        return next => (action) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            const accessToken = getCookie('accessToken')
            if (type === wsInit && accessToken) {
                socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    dispatch({ type: onMessage, payload: restParsedData });
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

                if (type === wsSendMessage) {
                    const message = payload;
                    message.token = accessToken
                    socket.send(JSON.stringify(message));        }
            }

            next(action);
        };
    };
};