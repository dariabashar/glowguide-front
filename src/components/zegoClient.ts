import { ZegoExpressEngine } from "zego-express-engine-webrtc";

const appID = 2118420159;
const serverSecret = "ea3d58632a4c1dde48fd8ece3380dcea";
const userID = "user_" + Date.now();
const userName = "";

const zg = new ZegoExpressEngine(appID, serverSecret);

export async function initZego() {
    const token = await fetchTokenFromZego(serverSecret);
    await zg.loginRoom("room1", token, {userID, userName});
    return zg;
}

async function fetchTokenFromZego(serverSecret: string) {
  // TODO: Реализовать реальный запрос к backend для получения токена
  return serverSecret;
}