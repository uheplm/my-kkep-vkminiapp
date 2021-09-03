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
	HorizontalScroll, HorizontalCell, CardScroll, Epic, Tabbar, TabbarItem, PanelHeaderButton, Separator
} from '@vkontakte/vkui';
import {
	Icon12Clock, Icon16ChevronLeft,
	Icon16ClockOurline,
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
const sign = window.location.search.split("sign=")[1]

const styles = {
	button: {
		borderRadius: "15px"
	}
}

const Home = ({ id, go, fetchedUser, schedule }) => {

	console.log(schedule);
	if (schedule) {
		const todayIndex = new Date().getDay();
		const isLead = window.localStorage.getItem("access_group") == "4" | window.localStorage.getItem("access_group") == "1";
		const currentSchedule = schedule.current;
		const nextSchedule = schedule.next;
		return (
			<Panel id={id}>
				<PanelHeader>Мой ККЭП</PanelHeader>
				<div style={{paddingBottom: "50px"}}>
				{localStorage.getItem('fl_notify') == "1" ?<Banner
				mode="image"
				header={window.localStorage.getItem("has_group") == "0" ? "Ваша роль определена автоматически" : "Ваша группа определена автоматически"}
				id="fl_banner"
				subheader={!(window.localStorage.getItem("has_group") == "0") ?
					<Text>Учебная группа: {window.localStorage.getItem("group_name")}</Text> : <Text>Группа пользователей: {window.localStorage.getItem("access_name")}</Text>}
				background={<div
					style={{
					  	backgroundColor: '#65c063',
					  	backgroundPosition: '100% 32px',
					  	backgroundSize: 100,
						backgroundImage: "url(https://vk.com/sticker/1-163-128)",
					  	backgroundRepeat: 'no-repeat',
					}}
				/>}
        		actions={<Button onClick={()=>{localStorage.setItem('fl_notify', "0"); document.getElementById("fl_banner").remove()}} mode="overlay_primary">Справедливо</Button>}
      			/> : null}
				{localStorage.getItem('upd_notify') == "1" ?<Banner
				mode="image"
				header="Встречайте новый функционал!"
				id="upd_banner"
				subheader={<span>Теперь вы можете нажать на карточку пары чтобы посмотреть подробности и оставить заметки.<br/>Скоро появится функция синхронизации заметок по всей группе.</span>}
				background={<div
					style={{
					  	backgroundColor: '#63b2c0',
					  	backgroundPosition: '100% 150%',
					  	backgroundSize: 100,
						backgroundRepeat: 'no-repeat',
						backgroundImage: "url(https://vk.com/sticker/1-13233-128)"
					}}
				/>}
        		actions={<Button onClick={()=>{localStorage.setItem('upd_notify', "0"); document.getElementById("upd_banner").remove()}} mode="overlay_primary">Отлично!</Button>}
      			/> : null}
				{/*<Div style={{display: "flex"}}>*/}
				{/*	<Button style={styles.button} size="l" stretched before={<Icon36Users3Outline/>} style={{marginRight: "10px"}} onClick={go} data-to="students">Группы</Button>*/}
				{/*	<Button style={styles.button} size="l" stretched before={<Icon28UserStarBadgeOutline/>} style={{marginRight: "0px"}} onClick={go} data-to="leads">Преподаватели</Button>*/}
				{/*</Div>*/}

				<SimpleCell onClick={go} data-to="fullrasp" after={<Icon24ChevronRight width={24} height={24} />} style={{marginBottom: "10px"}}>
                    <Title level="1" >Всё расписание</Title>
                </SimpleCell>

				{(todayIndex == 0 ? null : <Day go={go} ignoreToday={true} DayName="Сегодня" Day={currentSchedule[todayIndex-1]}/>)}
				{(todayIndex == 6 ? null : (todayIndex == 0 ? <Day go={go} DayName="Завтра" Day={nextSchedule[todayIndex]}/> : <Day go={go} DayName="Завтра" Day={currentSchedule[todayIndex]}/>))}
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
