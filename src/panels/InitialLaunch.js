import {React, useEffect, useState} from 'react';
import PropTypes, {shape} from 'prop-types';
import logo from '../img/student_emoji.png';
import pattern from '../img/pattern.svg';
import {
    Avatar,
    Gradient,
    Panel,
    Text,
    Title,
    Div,
    PanelHeader,
    Group,
    Header,
    Chip,
    Cell,
    Button, FixedLayout, FormItem
} from "@vkontakte/vkui";
import {Icon20Users3Outline, Icon24GearOutline} from "@vkontakte/icons";

function createUser(map){
    window.localStorage.setItem("login_success", "1");
}

const InitialLaunch = ({id, fetchedUser, go, useModal}) => {

    if(fetchedUser)return (
        <Panel id={id}>
            <PanelHeader>{`Здравствуйте, ${fetchedUser.first_name}!`}</PanelHeader>
            <Group style={{display: "flex", margin: '0' ,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'}}>
                <Div>
                    <Div>
                        <img src={logo} style={{
                            width: "160px",
                            height: "160px"
                        }}/>

                    </Div>
                    <Title level="1" weight="bold" style={{ marginBottom: 16 }}>
                        Добро пожаловать в приложение Мой ККЭП!
                    </Title>


                </Div>
                <Group mode="plain">
                    <Header>Подтвердите данные:</Header>
                    {!(window.localStorage.getItem("access_group") == "4") ? <Cell
                        before={<Icon20Users3Outline width={30} height={30}/>}
                        after={<Chip removable={false}>{window.localStorage.getItem("group_name")}</Chip>}
                    >
                        Учебная группа
                    </Cell> : null}
                    <Cell
                        before={<Icon24GearOutline width={30} height={30}/>}
                        after={<Chip removable={false}>{window.localStorage.getItem("access_name")}</Chip>}
                    >
                        Группа доступа
                    </Cell>

                </Group>
                <FixedLayout vertical="bottom">
                    <Div><Button stretched size="l" mode="primary" onClick={go} data-to="home">Всё хорошо</Button></Div>
                </FixedLayout>


            </Group>
        </Panel>
    )
    else return (
        <Panel id={id}></Panel>
    )
}

export default InitialLaunch
