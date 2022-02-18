import {React, useEffect, useState} from 'react';
import PropTypes, {shape} from 'prop-types';
import {
	Panel,
	PanelHeader,
	Header,
	Button,
	Group,
	Cell,
	Div,
	Avatar,
	CellButton,
	Title,
	ContentCard,
	SimpleCell,
	List,
	Gallery,
	Text,
	Banner,
	Counter,
	Card,
	Caption,
	Subhead,
	Badge,
	FormItem,
	SliderSwitch,
	FormLayoutGroup,
	Radio,
	Tabs,
	TabsItem,
	Gradient,
	HorizontalScroll,
	HorizontalCell,
	CardScroll,
	Epic,
	Tabbar,
	TabbarItem,
	PanelHeaderButton,
	Separator,
	ModalCard,
	ModalRoot, Textarea, Tooltip, Snackbar
} from '@vkontakte/vkui';
import {
	Icon12Clock, Icon16ChevronLeft,
	Icon16ClockOurline, Icon16Done,
	Icon16InfoOutline,
	Icon20User,
	Icon20UserCircleFillBlue,
	Icon20UserCircleOutline,
	Icon20UserOutline,
	Icon20Users3Outline, Icon24ChevronRight,
	Icon24List,
	Icon24Note,
	Icon24UserSquare,
	Icon28ClipOutline,
	Icon28InfoOutline,
	Icon28MessageOutline,
	Icon28NewsfeedOutline,
	Icon28ServicesOutline,
	Icon28Settings,
	Icon28SettingsOutline, Icon28User,
	Icon28UserCircleOutline,
	Icon28UserStarBadgeOutline,
	Icon36Users3Outline
} from "@vkontakte/icons";

import {Day, DayPlaceholder} from "../components/DayEntity";
import {IconSettingsContext} from "@vkontakte/icons/dist/IconSettings";

import ListIcon from "../img/list.svg";
import TimeWidget from "../components/TimeWidget";
const sign = window.location.search.split("sign=")[1]


const styles = {
	button: {
		borderRadius: "15px"
	},

}



const Home = ({ id, go, modal,fetchedUser, schedule, notifications }) => {
	const [time, setTime] = useState(30900);
	useEffect(() => {
	  const interval = setInterval(() => setTime(time + 1), 1000);
	  return () => {
		clearInterval(interval);
	  };
	}, [time]);

	if (schedule) {
		const todayIndex = new Date().getDay();
		const isLead = window.localStorage.getItem("access_group") == "4" | window.localStorage.getItem("access_group") == "1";
		const currentSchedule = schedule.current;
		const nextSchedule = schedule.next;

		return (
			<Panel id={id}>
				<PanelHeader>Мой ККЭП</PanelHeader>


				<div style={{paddingBottom: "50px"}}>
					<TimeWidget dayObject={currentSchedule[todayIndex - 1]}/>

					{localStorage.getItem("fl_notify") == "true" ?
						<Snackbar
							id="fl_banner"
							onClose={() => {document.getElementById("fl_banner").style.display = 'none'; localStorage.setItem("fl_notify", "false")}}
							before={<Avatar size={24} style={{ background: '#63C0B2FF' }}><Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
						  >
							Ваша группа определена автоматически
						  </Snackbar>
					: null}
					{localStorage.getItem("upd_notify") == "true" ? <Banner
						mode="image"
						header="Встречайте новый функционал!"
						id="upd_banner_1"
						subheader={<span>Новый виджет, подсказывающий важную информацию о текущем событии.<br/>
							Напомнит к какой паре, покажет время до конца перерыва, а так же сколько еще осталось!<br/>
							Заметки стали чуточку удобнее!
						</span>}
						background={<div
							style={{
								backgroundColor: '#b263c0',
								backgroundPosition: '100% 150%',
								backgroundSize: 100,
								backgroundRepeat: 'no-repeat',
								backgroundImage: "url(https://vk.com/sticker/1-12669-128)"
							}}
						/>}
						actions={<Button onClick={(e)=>{document.getElementById("upd_banner_1").style.display = 'none'; localStorage.setItem("upd_notify", "false")}} mode="overlay_primary">Отлично!</Button>}
					/> : null}

					<SimpleCell onClick={go} data-to="fullrasp" after={<Icon24ChevronRight width={24} height={24} />} style={{marginBottom: "10px"}}>
						<Title level="1" >Всё расписание</Title>
					</SimpleCell>

					{(todayIndex == 0 ? null : <Day go={go} modal={modal} ignoreToday={true} DayName="Сегодня" Day={currentSchedule[todayIndex-1]}/>)}
					{(todayIndex == 6 ? null : (todayIndex == 0 ? <Day modal={modal} go={go} DayName="Завтра" Day={nextSchedule[todayIndex]}/> : <Day go={go} modal={modal} DayName="Завтра" Day={currentSchedule[todayIndex]}/>))}

				</div>


				<Epic id="nav">
				  <Tabbar>
					<TabbarItem
					  onClick={go}
					  data-to="students"
					  text="Группы"
					><Icon36Users3Outline width={28} height={28}/></TabbarItem>
					<TabbarItem
					  onClick={go}
					  data-to="leads"
					  text="Преподаватели"
					><Icon28UserStarBadgeOutline width={28} height={28}/></TabbarItem>
					<TabbarItem
					  onClick={go}
					  data-to="userdata"
					  text="Профиль"
					><Icon28User width={28} height={28}/></TabbarItem>
				  </Tabbar>
				</Epic>





			</Panel>
		)}

	else return (
		<Panel id={id}>
			<PanelHeader left={fetchedUser && <Avatar size={36} src={fetchedUser.photo_200} onClick={go} data-to="userdata"/>}>Мой ККЭП</PanelHeader>

			<Div style={{display: "flex"}}>
				<Button before={<Icon24List/>} size="l" stretched disabled onClick={go} data-to="fullrasp">Все расписание</Button>
			</Div>

			<DayPlaceholder dayName="Сегодня"/>
			<DayPlaceholder dayName="Завтра"/>

		</Panel>
	)
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
	schedule: PropTypes.shape()
};

export default Home;
