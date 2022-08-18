// import {
//     getMessagesDB,
//     getMessagesByMailDB
// } from '../services/index.js'
// import {io} from '../../server.js'
// import {addMessage} from '../socket/function.socket.js'
// export const getMessages=async(req,res)=>{
//     try {
//         const mensajes = await getMessagesDB();
//         io.sockets.emit('mensajes', mensajes);
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const getMessagesByMail=async(req,res)=>{
//     try {
//         const user=req.session.users
//         const resp = await getMessagesByMailDB(user)
//     } catch (error) {
        
//     }
// }
// export const postMessage = async (req,res)=>{
//     try {
        
//         socket.on('nuevo-msj', (data) => {
//             addMessage(data);
//         });
//         const dbResp = await addMessageDB(msj);
//         await getMessages();
//     } catch (error) {
//         console.log(error);
//     }
// }