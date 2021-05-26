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
	Icon24GearOutline, Icon28InfoOutline,
	Icon28TouchIdOutline,
	Icon56UserBookOutline
} from "@vkontakte/icons";
import Paper from '../img/paper.png'
function dropData(){
	window.localStorage.clear();
	document.location.reload();
}

function useListed(){
	if (window.localStorage.getItem("show_list") == 1) {
		window.localStorage.setItem("show_list", "0");
	}
	else{
		window.localStorage.setItem("show_list", "1");
	}
}
const UserData = ({ id, go, fetchedUser }) => {
	let listedView = window.localStorage.getItem("show_list") == 1;

	return (
		<Panel id={id}>
			<PanelHeader
				left={<PanelHeaderBack onClick={go} data-to="home"/>}
			>
				Настройки
			</PanelHeader>
			<Group>
				<Banner
					before={<Avatar size={50} src={fetchedUser.photo_200}/>}
					header={<Title level="2">{fetchedUser.first_name} {fetchedUser.last_name}</Title>}
				/>
				<Group mode="plain">
					<Header>Информация о пользователе:</Header>
					<Cell disabled
						before={<Icon20Users3Outline width={30} height={30}/>}
						after={<Chip removable={false}>{window.localStorage.getItem("group_name")}</Chip>}
					>
						Учебная группа
					</Cell>
					<Cell disabled
						before={<Icon56UserBookOutline width={30} height={30}/>}
						after={<Chip removable={false}>{window.localStorage.getItem("access_name")}</Chip>}
					>
						Группа доступа
					</Cell>
					<Cell disabled
						before={<Icon28TouchIdOutline width={30} height={30}/>}
						after={<Chip removable={false}>{window.localStorage.getItem("user_id")}</Chip>}
					>
						Внутренний идентификатор
					</Cell>
					<Header>Настройки:</Header>
					<Cell
						disabled
						before={<Icon16ViewOutline width={30} height={30}/>}
						after={<Switch defaultChecked={!listedView} onChange={useListed}/>}
					>
						Отображение в виде карточек
					</Cell>
					<Header>Информация:</Header>
					<Cell
						before={<Icon28InfoOutline width={30} height={30}/>}
						onClick={go}
						data-to="about"
					>
						О программе
					</Cell>
					<FixedLayout filled vertical="bottom">

						<FormItem top="Если что-то не так, попробуйте:">
							<Button stretched size="l" mode="primary" onClick={dropData} data-to="clearData">Сбросить
								данные</Button>
						</FormItem>

					</FixedLayout>
				</Group>
			</Group>
		</Panel>
	)
};

UserData.propTypes = {
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
};

export default UserData;
