import { getUserMessage, messageSent } from "../controllers/messages.js"



const messageRoutes = (app) => {
    app.route('/message')
        .post(messageSent)

    app.route('/message/:username')
        .get(getUserMessage)
}
export default messageRoutes