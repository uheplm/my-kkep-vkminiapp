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
	PanelHeaderBack, CustomSelectOption, CustomSelect, Switch
} from '@vkontakte/vkui';
import {
	Icon12Clock, Icon16Cancel, Icon16CancelCircleOutline,
	Icon16ClockOurline,
	Icon16InfoOutline, Icon20User,
	Icon20UserCircleFillBlue, Icon20UserCircleOutline, Icon20UserOutline, Icon20Users3Outline, Icon24Back,
	Icon24Note, Icon24UserSquare
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


const StudentsSchedule = ({go, id}) => {
	const [week, setWeek] = useState(0);
	const [groups, setGroups] = useState(null);
	const [schedule, setSchedule] = useState(null);
	async function fetchSchedule(e) {
			let map = [];
			let HTTP = `https://my.kkep.ru/api.php?token=${window.localStorage.getItem("auth_token")}&method=get_stud_rasp&group=${e.target.value}`;
			await fetch(HTTP).then((response) => {
					setWeek(0);
					return response.json()
				})
				.then((response) => {
					map[0] = response;
					fetch(HTTP + "&week=" + (map[0][0].week == "1" ? "2" : "1"))
						.then((response) => {
							return response.json();
						})
						.then((response) => {
							map[1] = response;
						}).finally(() => {
							return true;
					})
				})
				.finally(() => {
				  	console.log("Fetched Data: Schedule")
				  	setSchedule(map);
					console.log(map)
				})
		}

	useEffect(() => {
		async function fetchGroupList(){
			await fetch(`https://my.kkep.ru/api.php?token=${window.localStorage.getItem("auth_token")}&method=get_group_list`)
				.then((response) => {
					return response.json()
				})
				.then((response) => {
					console.log(response)
					setGroups(response.map(group => ({value: group.group_num, label: group.group_name})))
				})
		}
		fetchGroupList();

	},[])

	return (

		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>Расписание студентов</PanelHeader>
			{groups && <FormItem top="Группа:">
				<CustomSelect
				  placeholder="Не выбран"
				  options={groups}
				  onChange={fetchSchedule}

				  renderOption={({ option, ...restProps }) => (
					<CustomSelectOption {...restProps} before={<Icon20Users3Outline/>}/>
				  )}
				/>
				</FormItem>
			}

			<FormItem top="Неделя:">
				<CustomSelect onChange={e => {setWeek(e.target.value)}} value={week} options={[
						{
							label: 'Текущая неделя',
							value: 0,
						},
						{
							label: 'Следующая неделя',
							value: 1,
						},
					]}
					renderOption={({ option, ...restProps }) => (
					<CustomSelectOption {...restProps}/>
				  )}
				/>
			</FormItem>

			{schedule && schedule[week].map(day => <Day ignoreToday={week == 1} Day={day}/> )}
		</Panel>

	)
}
StudentsSchedule.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	schedule: PropTypes.shape({
		current: PropTypes.array,
		next: PropTypes.array
	}),

};
export default StudentsSchedule;