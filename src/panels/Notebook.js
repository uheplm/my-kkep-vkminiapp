/* eslint-disable */
import {React, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
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
	Select,
	PanelHeaderBack, CustomSelectOption, CustomSelect, Switch, Textarea, Separator, Checkbox
} from '@vkontakte/vkui';
import {
	Icon12Clock,
	Icon16Cancel,
	Icon16CancelCircleOutline,
	Icon16ClockOurline,
	Icon16InfoOutline, Icon16Replay, Icon20PictureOutline,
	Icon20User,
	Icon20UserCircleFillBlue,
	Icon20UserCircleOutline,
	Icon20UserOutline,
	Icon20Users3Outline, Icon24ArrowRightOutline,
	Icon24Back,
	Icon24ClockOutline,
	Icon24Note,
	Icon24UserSquare,
	Icon28InfoOutline,
	Icon28MailOutline,
	Icon28PhoneOutline, Icon28User
} from "@vkontakte/icons";
import {Day, DayPlaceholder} from "../components/DayEntity";

const colorMapCard = {
	1: "#f6ceb3",
	0: "#bbe598"
}
const colorMapHeader = {
	1: "rgba(231,81,81,0.65)",
	0: "rgba(148,220,100,0.64)"
}
const styleMap = {
	card: {
		backgroundImage: "url(https://vk.com/sticker/1-5314-128)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "110% 0"
	},
	flex: {
		display: "flex",
		margin: '0' ,
		flexDirection: 'row',
		alignItems: 'left',
		justifyContent: 'space-evenly',
		textAlign: 'center'
	}
}

const Notebook = ({id, go}) => {
	const subject = JSON.parse(sessionStorage.getItem("subjView"));

	const saveForm = () => {
		let text = document.getElementById("notebook_input");
		let id = subject.dindex + subject.p_num + subject.p_prep + subject.p_aud;
		localStorage.setItem(id, text.value);
	}
	return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>Предмет</PanelHeader>

				<Group mode="plain" header={<Header>Информация о предмете</Header>}>
				<Div>
					<Card>
					<div>
						<SimpleCell before={<Icon28InfoOutline/>}>{subject.p_subj}</SimpleCell>
						<SimpleCell before={<Icon24ClockOutline width={28} height={28}/>}>Время: {subject.p_time}</SimpleCell>
					</div>
					<div>
						<SimpleCell before={<Icon24ArrowRightOutline width={28} height={28}/>}>Аудитория: {subject.p_aud}</SimpleCell>
						<SimpleCell before={<Icon28User width={28} height={28}/>}>Преподаватель: {subject.p_prep}</SimpleCell>
					</div>


					{subject.ischange ? <SimpleCell before={<Icon16Replay width={28} height={28}/>}>Замена</SimpleCell> : ""}
					<FormItem top="Заметки">
						<Textarea id="notebook_input" onInput={saveForm} defaultValue={localStorage.getItem(subject.dindex + subject.p_num + subject.p_prep + subject.p_aud)} placeholder="Домашнее задание, напоминания и так далее. Скоро будет добавлена поддержка облачных заметок, которые будут видны для всей группы">
						</Textarea>
						<Checkbox disabled before={<Icon28InfoOutline/>}>Синхронизировать с группой (скоро)</Checkbox>
					{/*<Button onClick={saveForm} stretched style={{height: "40px"}}>Сохранить</Button>*/}
        			</FormItem>
					</Card>
				</Div>
				</Group>

		</Panel>

	)
}
Notebook.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	schedule: PropTypes.shape({
		current: PropTypes.array,
		next: PropTypes.array
	}),

};
export default Notebook;
