import connectDB from "./src/database";
import connectSever from "./src/sever/app";

function start (){
    connectDB();
    connectSever.connectSever();
    connectSever.routerUse();
}
start();
//xửa lý cho dữ liệu chạy rồi mới cho sever chạy
//callback with commit
//cho app sẽ chạy và cofig tại đó
//todo swapter