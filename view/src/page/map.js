import React, {useState, useEffect} from "react";
import axios from "axios";
import {SERVICE, SERVICE_IMG} from "../config";
import cookie from "react-cookies";
// noinspection ES6CheckImport
import {useNavigate} from "react-router-dom";
import {Button} from "antd";

export default () => {
    const navigate = useNavigate()
    const [mmap, setMap] = useState({
        name: '', depiction: '', npc: '', npc_list: false, dokemon_list: false
    })
    const [task, setTask] = useState({})

    async function init() {
        let role_res = (await axios.get(SERVICE + 'role/?token=' + cookie.load('token'))).data
        let map_res = (await axios.get(SERVICE + 'json/map?mid=' + role_res.role['map'])).data
        let task_res = (await axios.get(SERVICE + 'json/task?tid=' + role_res.role['task'])).data
        setMap({...map_res})
        setTask({...task_res})
    }

    useEffect(() => {
        init().then(r => (r))
    }, [])

    return (<div>
        <h1 className={'mainTop'}>{mmap.name}</h1>
        <p>{mmap.depiction}</p>
        <h2>这里有:</h2>
        <div>{mmap.npc_list ? mmap.npc_list.map((item, index) => (
                <span key={index} onClick={() => {
                    navigate('/game/npc/' + item.id)
                }} className={'link'}>{item.id === task['npc'] ? <img style={{height: '25px', margin: '2px'}} alt={'!'}
                                                                      src={SERVICE_IMG + 'ui/!.png'}/> : ""}{item.name}</span>)) :
            '加载中'}</div>
        <div>
            {mmap.dokemon_list ? mmap.dokemon_list.map((item, index) => (
                    <span key={index} onClick={() => {
                        console.log(item)
                    }} className={'link'} style={{color: '#32327a'}}><img style={{height: '25px', margin: '2px'}} alt={'!'}
                                                                          src={SERVICE_IMG + 'pokemon/' + item.id + '.gif'}/>{item.name}( lv.{item['lv']} )</span>)) :
                '加载中'}
        </div>
        <div style={{marginTop: '20px', backgroundColor: 'salmon', padding: '12px', borderRadius: '0 0 100px 100px'}}>
            <div>
                <Button>↑ 星辰森林</Button>
            </div>
            <div><Button>← 道路101</Button><Button>→ 道路102</Button></div>
            <div><Button>↓ 道路103</Button></div>
        </div>

    </div>)
}