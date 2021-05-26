/* eslint-disable */
import React, {useState} from 'react';
import PropTypes, {func} from 'prop-types';

import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Group,
	Cell,
	Avatar,
	Header,
	ContentCard,
	Counter,
	Chip, Spacing, Separator, Gradient, Title, Text, FixedLayout, Button, Div, FormItem, Banner, Link, Switch
} from '@vkontakte/vkui';
import {
	Icon12View, Icon16ViewOutline,
	Icon20Users3Outline,
	Icon24GearOutline,
	Icon28TouchIdOutline,
	Icon56UserBookOutline
} from "@vkontakte/icons";
import Paper from '../img/paper.png'
import AboutPhoto from '../img/about.jpg'
import Github from '../img/github.png'
function dropData(){
	window.localStorage.clear();
	document.location.reload();
}
const About = ({id, go}) => {
    return (
        <Panel id={id}>
            <PanelHeader
				left={<PanelHeaderBack onClick={go} data-to="userdata"/>}
			>
				О программе
			</PanelHeader>
			<Banner
                before={<Avatar size={50} src={Paper}/>}
                header="Это приложение — дипломный проект"
                subheader={<Text style={{fontSize: "10pt"}}>Если тебе тоже грозит курсач или диплом, а ты не
                    хочешь делать очередной интернет-магазин из известной субстанции и палок, то пиши нам!<br/>
                    У нас есть темы, которые не только станут твоим дипломом и курсовыми, но и принесут пользу
                    студентам и преподавателям, а ты сможешь добавить их в своё портфолио.<br/>
                    Мы, в свою очередь, поможем с разработкой и интеграцией 😉</Text>}

            />
			<Group>

				<Cell disabled
					before={<Avatar src={AboutPhoto} size={30}/>}
					after={<Chip removable={false}><Link href="https://vk.com/WheelChair_User" target="_blank">Сергеев Роман</Link></Chip>}
				>
					Разработчик приложения
				</Cell>
				<Cell disabled
					before={<Avatar src="https://sun2-9.userapi.com/s/v1/ig2/HFLbGlovd0K3qQXslVrNN8WxPBcV7_4BBHaMVimXtK9zAVC-JfSwNVFvxqSn-76R2C6G1OXhPNG08P07hgsntQuE.jpg?size=100x0&quality=96&crop=742,419,439,439&ava=1" size={30}/>}
					after={<Chip removable={false}><Link href="https://vk.com/Jargez" target="_blank">Павел Хориков</Link></Chip>}
				>
					Разработчик my.kkep.ru
				</Cell>
				<Cell disabled
					before={<Avatar src="https://sun2-12.userapi.com/s/v1/ig2/S_FMaRDbiQEfnisjDPuKqs0Ky-JwSg7g8FAxy2Sv5gfviYH_4wdPL7UBhhrBYRxYYUvzR46OF-qm3RhVIvLTNe8C.jpg?size=100x0&quality=96&crop=129,129,701,701&ava=1" size={30}/>}
					after={<Chip removable={false}>Евгений Сторчак</Chip>}
				>
					Руководитель ВКР
				</Cell>
				<Div>
					<Text weight="medium">Создано на ReactJS с использованием библиотек VKUI, VKICONS, а так же с божей помощью для ГПБОУ ККЭП.</Text>
				</Div>
				<Cell disabled
					before={<Avatar src={Github} size={30}/>}
					after={<Chip removable={false}><Link href="https://github.com/uheplm/my-kkep-vkminiapp" target="_blank">Перейти</Link></Chip>}
				>
					Репозиторий на GitHub
				</Cell>
			</Group>
        </Panel>
    )
}

export default About;