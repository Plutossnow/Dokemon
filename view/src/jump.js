// 中间跳转器
import axios from "axios";
import {service} from "./config";
import cookie from "react-cookies";

export default function Jump() {
    axios.get(service + 'role/?token=' + cookie.load('token')).then(
        (res) => {
            console.log(res)
            if (res.data.code === 0) {
                window.location.href = '/game'
            } else {
                window.location.href = '/create'
            }
        }
    )
}