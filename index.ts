import connectDB from "./src/database";
import connectSever from "./src/sever/app";

function start (){
    connectDB();
    connectSever.connectSever();
    connectSever.routerUse();
}
start();