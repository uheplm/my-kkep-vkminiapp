/* eslint-disable */
import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {View, ScreenSpinner, AdaptivityProvider, AppRoot, Button, ModalCard, ModalRoot} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home';
import UserData from './panels/UserData';
import FullRasp from './panels/FullRasp'
import InitialLaunch from "./panels/InitialLaunch";
import StudentsSchedule from "./panels/StudentSchedule";
import {Icon56MoneyTransferOutline} from "@vkontakte/icons";
import * as PropTypes from "prop-types";
import Failed from "./panels/FailedDialog";
import About from "./panels/About";

function setData(key, value){
	window.localStorage.setItem(key,value);
}

const App = () => {
	const localUser = window.localStorage.getItem("login");
	const failed = window.localStorage.getItem("failed");
	const [activePanel, setActivePanel] = useState(localUser ? 'home' : failed ? 'failed' : 'init');
	const [fetchedUser, setUser] = useState(null);
	const [schedule, setSchedule] = useState(null);
	const [modal, setModal] = useState(null);
	useEffect(() => {
		let scheduleMap = {
			current: null,
			next: null
		}

		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const TestData = false;
			let formData = new FormData();
			formData.append('url', window.location.href);

			if (!localUser) {
				await fetch("https://test.my.kkep.ru/api.php?method=vk_miniapp_login", {
					method: "POST",
					body: formData
				})
					.then((response) => {
						return response.json()
					})
					.then((kUser) => {
						console.log(kUser)
						if (kUser.status == "ok") {
							setData("login", "1");
							setData("auth_token", kUser.ses_token);
							setData("group_id", kUser.user.group.group_num);
							setData("group_name", kUser.user.group.name);
							setData("access_group", !TestData ? kUser.user.access_group : "4");
							setData("access_name", kUser.user.access_name)
							setData("user_id", !TestData ? kUser.user.uid : "87")
							setData("show_list", "1")

						}else{
							setData("failed","1")
						}
					}).finally(() => {
							if(!(window.localStorage.getItem("failed") === "1")) fetchSchedule();
							else {setActivePanel('failed'); setSchedule(scheduleMap); }
						}
					)
			}else{
				fetchSchedule();
			}
		}
		async function fetchSchedule() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			let HTTP = `https://my.kkep.ru/api.php?token=${window.localStorage.getItem("auth_token")}&method=get_stud_rasp&group=${window.localStorage.getItem("group_id")}`;
			let leadHTTP = `https://my.kkep.ru/api.php?token=${window.localStorage.getItem("auth_token")}&method=get_prep_rasp&teacher=${window.localStorage.getItem("user_id")}`;
			let useHTTP = window.localStorage.getItem("access_group") === "4" ? leadHTTP : HTTP;
			await fetch(useHTTP).then((response) => {
					return response.json()
				})
				.then((response) => {
					scheduleMap.current = response;
					fetch(useHTTP + "&week=" + (scheduleMap.current[0].week == "1" ? "2" : "1"))
						.then((response) => {
							return response.json();
						})
						.then((response) => {
							scheduleMap.next = response;
						})
				})
				.finally(() => {
				  	console.log("Fetched Data: Schedule")
				  	setSchedule(scheduleMap);
					setUser(user);
				})
		}
		fetchData();
	},[]);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};


	return <AdaptivityProvider>
		<AppRoot>
			<View activePanel={activePanel} popout={schedule ? null : <ScreenSpinner size="large"/>}>
				<Home id='home' fetchedUser={fetchedUser} schedule={schedule} go={go}/>
				<UserData id='userdata' fetchedUser={fetchedUser} go={go}/>
				<FullRasp id='fullrasp' schedule={schedule} go={go}/>
				<StudentsSchedule id='students' go={go}/>
				<InitialLaunch id='init' fetchedUser={fetchedUser} go={go}/>
				<Failed id="failed" go={go}/>
				<About id="about" go={go}/>
			</View>
		</AppRoot>
	</AdaptivityProvider>

}

export default App;
