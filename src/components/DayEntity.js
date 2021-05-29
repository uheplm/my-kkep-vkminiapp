/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {Badge, Card, CardScroll, Div, Gallery, Separator, SimpleCell, Text, Title} from "@vkontakte/vkui";

import {Subject, SubjectPlaceholder} from "../components/SubjectEntity"

const styleMap = {
    title: {
        marginBottom: "0px"
    },
    counterBadge: {
        marginRight: "8px",
        fontSize: "12pt"
    },
    dayTitle: {
        textTransform: "capitalize",
        marginLeft: "0px"
    },
    subjectsRoot: {
        height: "100%",
        paddingBottom: "0px",
        marginBottom: "10px",
    },
    subjectsRootPh: {
        height: "100%",
        marginLeft: "15px",
        marginRight: "15px",
    },
    subjectsRootList: {
        height: "100%",
        marginBottom: "15px",
        marginLeft: "15px",
        marginRight: "15px",
    }
}

const Day = ({Day, DayName, ignoreToday, forceLeadMode}) => {
    const isLeadMode = Day.hasOwnProperty("prep_uid") | forceLeadMode;
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
    const todayIndicator = DayMap.dayIndex == new Date().getDay() & !ignoreToday ? <Badge style={{marginRight:"10px", background: "#00ff0d"}}/> : null;
    const counterBadge   = <span style={styleMap.counterBadge}>Пары: {notNull()}</span>;
    if(!listedView) {
        return (
            <div>
                <SimpleCell disabled before={todayIndicator} style={styleMap.title} after={counterBadge}>
                    <Title level="2" weight="semibold"
                           style={styleMap.dayTitle}>{DayName == undefined ? DayMap.dayName : DayName + ": " + DayMap.dayName}</Title>
                </SimpleCell>
                {(notNull() > 0) ?
                    <CardScroll size="m" style={styleMap.subjectsRoot}>
                        {DayMap.subjectList.map((subject) => <Subject prepMode={isLeadMode} subject={subject}/>)}
                    </CardScroll>
                    :
                    <Div>
                        <Card style={styleMap.subjectsRootList}><SubjectPlaceholder/></Card>
                    </Div>
                }
            </div>
        );
    } else {
        return (
            <div>
                <Card style={styleMap.subjectsRootList} mode="shadow">
                    <SimpleCell disabled before={todayIndicator} style={styleMap.title} after={counterBadge}>
                        <Title level="2" weight="semibold"
                               style={styleMap.dayTitle}>{DayName == undefined ? DayMap.dayName : DayName + ": " + DayMap.dayName}</Title>
                    </SimpleCell>
                    <Separator/>
                    {(notNull() > 0) ?
                        DayMap.subjectList.map((subject) => <Subject prepMode={isLeadMode} subject={subject}/>) :
                        <SubjectPlaceholder/>
                    }
                </Card>

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

            <Card style={styleMap.subjectsRootPh}>
                <SubjectPlaceholder/>
            </Card>

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