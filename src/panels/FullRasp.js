/* eslint-disable */
import {React, useState} from 'react';
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
	PanelHeaderBack, CustomSelectOption, CustomSelect
} from '@vkontakte/vkui';
import {
	Icon12Clock, Icon16Cancel, Icon16CancelCircleOutline,
	Icon16ClockOurline,
	Icon16InfoOutline, Icon20User,
	Icon20UserCircleFillBlue, Icon20UserCircleOutline, Icon20UserOutline, Icon20Users3Outline, Icon24Back,
	Icon24Note, Icon24UserSquare
} from "@vkontakte/icons";
import {Day} from "../components/DayEntity";

const colorMapCard = {
	1: "#f6ceb3",
	0: "#bbe598"
}
const colorMapHeader = {
	1: "rgba(231,81,81,0.65)",
	0: "rgba(148,220,100,0.64)"
}
const scheduleMap = [
	null, null
]

const FullRasp = ({go, id, schedule}) => {
	let map = [schedule.current, schedule.next]
	const [week, setWeek] = useState(0);

	return (

		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>Расписание</PanelHeader>
			<Div>

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

			</Div>

			{map[week].map((day) => <Day ignoreToday={week == 1} Day={day}/>)}
		</Panel>

	)
}
FullRasp.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	schedule: PropTypes.shape({
		current: PropTypes.array,
		next: PropTypes.array
	}),

};
export default FullRasp;