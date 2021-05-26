/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {Badge, Card, CardScroll, Div, Gallery, SimpleCell, Text, Title} from "@vkontakte/vkui";

import {Subject, SubjectPlaceholder} from "../components/SubjectEntity"

const styleMap = {
    title: {
        marginBottom: "5px"
    },
    counterBadge: {
        marginRight: "8px",
        fontSize: "13pt"
    },
    dayTitle: {
        textTransform: "capitalize",
        marginLeft: "10px"
    },
    subjectsRoot: {
        height: "100%",
        paddingBottom: "10px"
    },
    subjectsRootPh: {
        height: "100%",
    },
    subjectsRootList: {
        height: "100%"
    }
}

const Day = ({Day, DayName, ignoreToday}) => {
    const isLeadMode = Day.hasOwnProperty("prep_uid");
    const listedView = window.localStorage.getItem("show_list") == 1;
    const DayMap = {
        dayIndex: Day.day_of_week,
        dayName: Day.day_name,
        subjectList: Day.pairs,
    };
    function notNull(){
        let pairCounter = 0;
        for(let item in DayMap.subjectList){
            let subject = DayMap.subjectList[item];
            if(subject.isnull == "0"){
                pairCounter += 1;
            }
        }
        return pairCounter;
    }
    const todayIndicator = DayMap.dayIndex == new Date().getDay() & !ignoreToday ? <Badge mode="prominent"/> : null;
    const counterBadge   = <span style={styleMap.counterBadge}>Пары: {notNull()}</span>;
    if(!listedView) {
        return (
            <div>
                <SimpleCell disabled before={todayIndicator} style={styleMap.title} after={counterBadge}>
                    <Title level="2"
                           style={styleMap.dayTitle}>{DayName == undefined ? DayMap.dayName : DayName + ": " + DayMap.dayName}</Title>
                </SimpleCell>
                {(DayMap.subjectList.length > 0) ? <CardScroll size="m" style={styleMap.subjectsRoot}>
                    {DayMap.subjectList.map((subject) => <Subject prepMode={isLeadMode} subject={subject}/>)} :

                </CardScroll> :
                    <Div>
                        <Card style={styleMap.subjectsRootList}><SubjectPlaceholder/></Card>
                    </Div>
                }
            </div>
        );
    } else {
        return (
            <div>
                <SimpleCell disabled before={todayIndicator} style={styleMap.title} after={counterBadge}>
                    <Title level="2"
                           style={styleMap.dayTitle}>{DayName == undefined ? DayMap.dayName : DayName + ": " + DayMap.dayName}</Title>
                </SimpleCell>
                <Div>
                    <Card style={styleMap.subjectsRootList}>
                        {(DayMap.subjectList.length > 0) ?
                            DayMap.subjectList.map((subject) => <Subject prepMode={isLeadMode} subject={subject}/>) :
                            <SubjectPlaceholder/>
                        }
                    </Card>
                </Div>
            </div>
        )
    }
}
const DayPlaceholder = ({dayName}) => {
    return (
        <div>
            <SimpleCell disabled style={styleMap.title} after={<span style={styleMap.counterBadge}>Пары: 0</span>}>
                <Title level="1" style={styleMap.dayTitle}>{dayName}</Title>
            </SimpleCell>
            <Div>
                <Card style={styleMap.subjectsRootPh}>
                    <SubjectPlaceholder/>
                </Card>
            </Div>
        </div>
    )
}

Day.propTypes = {
    Day: PropTypes.shape({
        day_of_week: PropTypes.number,
        day_name: PropTypes.string,
        pairs: PropTypes.array
    })
}
export {Day, DayPlaceholder};