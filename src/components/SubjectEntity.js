/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {
    Badge,
    Card,
    Cell,
    Counter,
    RichCell,
    Separator,
    SimpleCell,
    Spacing,
    Text,
    Textarea,
    Title,
    Div,
    ModalRoot,
    ModalCard,
    Button, Header
} from '@vkontakte/vkui';
import {
    Icon12Clock,
    Icon16ClockOurline, Icon16InfoOutline, Icon16Replay,
    Icon16Smile,
    Icon20UserOutline,
    Icon20Users3Outline, Icon24ChevronRight, Icon24PenOutline,
    Icon24Switch, Icon28InfoOutline,
    Icon28SwitchOutline, Icon28UserStarBadgeOutline,
    Icon36Users
} from "@vkontakte/icons";
import {localStorage} from "@vkontakte/vkjs";

// Map for card headers
const colorMapHeader = {
	"1": "rgba(231,81,81,0.65)",
	"0": "rgba(148,220,100,0.64)"
}



const Subject = ({subject, prepMode, go, dindex, modal}) => {
    const listedView = window.localStorage.getItem("show_list") == 1;
    const useDots = listedView ? 100 : 25;
    let SubjectMap = {
        subjCounter: subject.p_num,
        subjName: (subject.p_subj || "Нет").substring(0, useDots),
        subjLead: subject.p_prep || "Нет",
        subjTime: subject.p_time || "Нет",
        subjRoom: "Аудитория: " + (subject.p_aud  || "Нет"),
        isChanged: subject.ischange == "1",
        subjectGroup: prepMode ? (subject.p_group) || "Нет" : null,
        noSubject: subject.isnull
    }
    const styleMap = {
        cardRoot: {
            marginRight: "15px",
            height: "200px",
            width: "80%"
        },
        header: {
            background: "var(--accent)",
            borderRadius: "10px 10px 0 0",
            color: "#ffffff",
            textShadow: "0 0 1px #000000"
        },
        subjNumberC: {
            background: "#e7a700",
            color: "#ffffff",
            textShadow: "none",
            textAlign: "center",
        },
        subjNumber: {
            background: "#fff",
            color: "#168efd",
            textShadow: "none",
            textAlign: "center",
        },
        headerTitle: {
            marginLeft: "10px"
        },
        listItem:{
            backgroundColor: "rgba(118,118,118,0.1)",
            borderRadius: "15px 15px 15px 15px",
            margin: "5px 15px 15px 15px",

        },
        penIc: {
            marginRight: "5px"
        },
        textarea: {
            margin: "15px"
        }
}
    const openMore = (e) => {
        console.log(go)
        subject['dindex'] = dindex;
        const subjstring = JSON.stringify(subject);
        sessionStorage.setItem('subjView', subjstring);
        modal(e);
    }
    const subjName        = SubjectMap.subjName
    const subjLead        = SubjectMap.subjLead;
    const subjTime        = SubjectMap.subjTime;
    const subjRoom        = SubjectMap.subjRoom;

    const subjCounter     = <Counter mode="primary" style={styleMap.subjNumber}>
                                <b>{SubjectMap.subjCounter}</b>
                            </Counter>;
    const subjCounterC    = <div style={{display: "flex"}}>
                                <Counter mode="primary" style={styleMap.subjNumberC}>
                                    <b>{SubjectMap.subjCounter}</b>
                                </Counter>
                            </div>;
    const changeIndicator = SubjectMap.isChanged ? <Icon24Switch style={{color: "rgba(255,0,0,0.5)", marginLeft: "5px"}} width={25} height={25}/> : null;
    const iconClock       = <Icon16ClockOurline  width={20} height={20}/>;
    const iconUser        = <Icon20UserOutline   width={20} height={20}/>;
    const iconRoom        = <Icon20Users3Outline width={20} height={20}/>;
    const iconGroup       = <Icon36Users         width={20} height={20}/>;
    subject['dindex'] = dindex;
    if(SubjectMap.noSubject == "1") return null;
    else if(!listedView){
        return (
            <Card key={"subject_" + SubjectMap.subjCounter} style={styleMap.cardRoot} >
                <SimpleCell disabled style={styleMap.header} indicator={SubjectMap.isChanged ? subjCounterC : subjCounter}>
                    <Title level="3" style={styleMap.headerTitle}>{subjName + (subjName.length >= useDots ? "..." : "")}</Title>
                </SimpleCell>
                <SimpleCell disabled before={iconClock}>
                    <Title level="3" weight="regular">{subjTime}</Title>
                </SimpleCell>

                {!prepMode ?
                    <SimpleCell disabled before={iconUser}>
                        <Title level="3" weight="regular">{subjLead}</Title>
                    </SimpleCell>
                    :
                    <SimpleCell disabled before={iconGroup}>
                        <Title level="3" weight="regular">{"Группа: " + SubjectMap.subjectGroup}</Title>
                    </SimpleCell>
                }

                <SimpleCell disabled before={iconRoom}>
                    <Title level="3" weight="regular">{subjRoom}</Title>
                </SimpleCell>
            </Card>
        )
    } else {
        return (
            <div>
                <SimpleCell style={styleMap.listItem} onClick={openMore} data-to="notebook" before={subjCounter} after={<span style={{display: "flex", flexDirection: "column"}}><Text style={{padding: "3px"}}>{subjTime.split(" - ")[0]}</Text><Text style={{padding: "3px"}}>{subjTime.split(" - ")[1]}</Text></span>} >
                    <span style={{marginLeft: "10px", fontWeight: "bold"}}>{subjName + (subjName.length >= useDots ? "..." : "")}</span><br/>
                    <span style={{margin: "10px"}}>{subjRoom}</span><br/>
                    {prepMode ? <span style={{margin: "10px"}}>Группа:  {SubjectMap.subjectGroup} </span> :
                    <span style={{margin: "10px"}}>{subjLead} </span>}
                </SimpleCell>
            </div>
        )
    }
}
const SubjectPlaceholder = () => {

    return <SimpleCell disabled before={<Icon16Smile width={20} height={20}/>}>Пусто</SimpleCell>

}

Subject.propTypes = {
	Subject: PropTypes.shape({
        p_num: PropTypes.string,
        p_subj: PropTypes.string,
        p_prep: PropTypes.string,
        p_time: PropTypes.string,
        p_aud: PropTypes.string,
        p_group: PropTypes.string,
        ischange: PropTypes.bool,
        isnull: PropTypes.string
    })
};
export {Subject, SubjectPlaceholder};
