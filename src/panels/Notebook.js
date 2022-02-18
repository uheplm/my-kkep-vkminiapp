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
	PanelHeaderBack, CustomSelectOption, CustomSelect, Switch, Textarea, Separator, Checkbox, ModalPage, ModalPageHeader
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

const Notebook = ({id, close, user}) => {
	const subject = JSON.parse(sessionStorage.getItem("subjView"));

	const saveForm = () => {
		let text = document.getElementById("notebook_input");
		let id = subject.dindex + subject.p_num + subject.p_prep + subject.p_aud;
		let data = {
			avatar: user.photo_200,
			name: user.first_name + " " + user.last_name,
			text: text.value
		}
		localStorage.setItem(id, JSON.stringify(data));
	}
	const loadData = () => {
		let data = localStorage.getItem(subject.dindex + subject.p_num + subject.p_prep + subject.p_aud)
		if(!data){
			let blank = {
				avatar: user.photo_200,
				name: user.first_name + " " + user.last_name,
				text: ""
			}
			localStorage.setItem(subject.dindex + subject.p_num + subject.p_prep + subject.p_aud, JSON.stringify(blank))
			return JSON.parse(localStorage.getItem(subject.dindex + subject.p_num + subject.p_prep + subject.p_aud))
		}else{
			return JSON.parse(localStorage.getItem(subject.dindex + subject.p_num + subject.p_prep + subject.p_aud))
		}
	}
	return (
		<ModalPage id={id} onClose={close} dynamicContentHeight>
			<ModalPageHeader left={<PanelHeaderBack onClick={close}/>}>{subject.p_subj}</ModalPageHeader>

				<Div>
				<Textarea id="notebook_input" onInput={saveForm} defaultValue={loadData().text} placeholder="Домашнее задание, напоминания и так далее. Скоро будет добавлена поддержка облачных заметок, которые будут видны для всей группы">
				</Textarea>
				<SimpleCell disabled before={<Avatar size={24} src={loadData().avatar}/>}>Последнее изменение от: <b>{loadData().name}</b></SimpleCell>
				</Div>



		</ModalPage>

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
