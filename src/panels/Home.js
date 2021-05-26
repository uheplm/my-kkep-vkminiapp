import {React, useState} from 'react';
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
	HorizontalScroll, HorizontalCell, CardScroll, Epic, Tabbar, TabbarItem, PanelHeaderButton
} from '@vkontakte/vkui';
import {
	Icon12Clock,
	Icon16ClockOurline,
	Icon16InfoOutline,
	Icon20User,
	Icon20UserCircleFillBlue,
	Icon20UserCircleOutline,
	Icon20UserOutline,
	Icon20Users3Outline,
	Icon24List,
	Icon24Note,
	Icon24UserSquare,
	Icon28ClipOutline,
	Icon28InfoOutline,
	Icon28MessageOutline,
	Icon28NewsfeedOutline,
	Icon28ServicesOutline,
	Icon28Settings,
	Icon28SettingsOutline,
	Icon28UserCircleOutline,
	Icon28UserStarBadgeOutline,
	Icon36Users3Outline
} from "@vkontakte/icons";

import {Day, DayPlaceholder} from "../components/DayEntity";
import {IconSettingsContext} from "@vkontakte/icons/dist/IconSettings";

const sign = window.location.search.split("sign=")[1]

const Home = ({ id, go, fetchedUser, schedule }) => {

	console.log(schedule);
	if (schedule) {
		const todayIndex = new Date().getDay();
		const isLead = window.localStorage.getItem("access_group") == "4" | window.localStorage.getItem("access_group") == "1";
		const currentSchedule = schedule.current;
		const nextSchedule = schedule.next;
		return (
			<Panel id={id}>
				<PanelHeader left={fetchedUser && <PanelHeaderButton onClick={go} data-to="userdata"><Icon28SettingsOutline/></PanelHeaderButton>}>Мой ККЭП</PanelHeader>
				<br/>
				<CardScroll>
					{isLead ? <Button before={<Icon36Users3Outline/>} size="l" stretched onClick={go} data-to="students" style={{marginRight: "10px"}}>Расписание студентов</Button> : null}
					<Button before={<Icon24List/>} size="l" stretched onClick={go} data-to="fullrasp">Полное расписание</Button>
					{isLead ? <Button before={<Icon28UserStarBadgeOutline/>} size="l" stretched onClick={go} data-to="leads" style={{marginLeft: "10px"}}>Расписание преподавателей</Button> : null}
				</CardScroll>
				<br/>
				{todayIndex == 0 ? null : <Day ignoreToday={true} DayName="Сегодня" Day={currentSchedule[todayIndex-1]}/>}
				{todayIndex == 6 ? null : (todayIndex == 0 ? <Day DayName="Завтра" Day={nextSchedule[todayIndex]}/> : <Day DayName="Завтра" Day={currentSchedule[todayIndex]}/>)}

			</Panel>
		)
	}
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
