import {React, useEffect, useState} from 'react';
import PropTypes, {shape} from 'prop-types';
import logo from '../img/logo.png';
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
import sad_emoji from "../img/sad_rjuman2.png";
function dropData(){
	window.localStorage.clear();
	document.location.reload();

}
const Failed = ({id, go}) => {
    const goWrap = () => {
        window.localStorage.clear();
	    document.location.reload();
    }
    return <Panel id={id}>
        <PanelHeader>Ошибка доступа :(</PanelHeader>
        <Div style={{display: "flex", margin: '0' ,
			paddingTop: '50px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'}}>
            <img width={200} height={200} src={sad_emoji}/>
        </Div>
        <Group>
            <Div>
                <Title level="2">Мы не смогли определить вашу учебную группу :(</Title>
                <br/>
                <Text>Чтобы это исправить, обратитесь к старосте для добавления вас в список вашей группы, а затем нажмите кнопку ниже. Если вы преподаватель, обратитесь к <a href="https://vk.com/wheelchair_user">администратору</a></Text>
            </Div>
        </Group>
        <FixedLayout filled vertical="bottom">
            <FormItem top="Если вы уже это сделали:">
                <Button stretched size="l" mode="primary" onClick={goWrap}>Повторить</Button>
            </FormItem>
        </FixedLayout>
    </Panel>
}
export default Failed;
