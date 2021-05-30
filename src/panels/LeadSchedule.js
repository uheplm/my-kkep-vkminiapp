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
	Icon24Note, Icon24UserSquare, Icon28UserStarBadgeOutline
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


const LeadSchedule = ({go, id}) => {
	const [week, setWeek] = useState(0);
	const [groups, setGroups] = useState(null);
	const [schedule, setSchedule] = useState(null);
	async function fetchSchedule(e) {
			let map = [];
			let HTTP = `https://my.kkep.ru/api.php?token=${window.localStorage.getItem("auth_token")}&method=get_prep_rasp&teacher=${e.target.value}`;
			await fetch(HTTP).then((response) => {
					setWeek(0);
					return response.json()
				}).then((response) => {
					map[0] = response;
				})
			await fetch(HTTP + "&week=" + (map[0][0].week == "1" ? "2" : "1"))
				.then((response) => {
					return response.json();
				}).then((response) => {
					map[1] = response;
				})
		setSchedule(map);
		}

	useEffect(() => {
		async function fetchGroupList(){
			await fetch(`https://my.kkep.ru/api.php?token=${window.localStorage.getItem("auth_token")}&method=get_prep_list`)
				.then((response) => {
					return response.json()
				})
				.then((response) => {
					console.log(response)
					setGroups(response.map(lead => ({value: lead.uid, label: lead.teacher_name})))
				})
		}
		fetchGroupList();

	},[])

	return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>Преподаватели</PanelHeader>
			{groups && <FormItem top="Преподаватель:">
				<CustomSelect
				  placeholder="Не выбран"
				  options={groups}
				  style={{marginBottom: "10px"}}
				  onChange={fetchSchedule}
				  renderOption={({ option, ...restProps }) => (
					<CustomSelectOption {...restProps} before={<Icon28UserStarBadgeOutline/>}/>
				  )}
				/>
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
			}
			{schedule && schedule[week].map(day => <Day ignoreToday={week == 1} forceLeadMode={true} Day={day}/> )}
		</Panel>

	)
}
LeadSchedule.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	schedule: PropTypes.shape({
		current: PropTypes.array,
		next: PropTypes.array
	}),

};
export default LeadSchedule;