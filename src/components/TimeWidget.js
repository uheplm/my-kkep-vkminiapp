import {Banner, Text} from "@vkontakte/vkui";

const Styles = {

}

let getCurrentSecs = () => {
    let dt = new Date();
    let secs = dt.getSeconds() + (60 * (dt.getMinutes() + (60 * dt.getHours())));
    return secs;
}
const toHHMMHR = (secs) => {
    let sec_num = parseInt(secs, 10)
    let hours   = Math.floor(sec_num / 3600)
    let minutes = Math.floor(sec_num / 60) % 60
    let seconds = sec_num % 60

    return [hours > 0 ? hours + "ч. " : null, minutes + "мин. ",seconds + "сек."]
        .join("")
}
const TimeWidget = ({dayObject, mockTime}) => {
    if (dayObject) {
        if(mockTime){
            getCurrentSecs = () => {
                return mockTime;
            }
        }
        const DAY_FORMATTED = dayObject;
        DAY_FORMATTED.pairs.forEach((item, index, arr) => {
            if (item.isnull == "1") DAY_FORMATTED.pairs.splice(index, 1);
        })
        const SLOT_PAUSE = 1723;
        const SLOT_SUBJECT = 2757;
        const SLOT_BEFORE = 5349;
        const SLOT_AFTER = 1453;
        const SLOT_TIMING =
            [   // Временная карта обучения на будние дни
                {type: SLOT_SUBJECT, start: 31500, end: 36300, index: 0}, // 08:45 - 10:05 (1)
                {type: SLOT_SUBJECT, start: 37500, end: 42300, index: 1}, // 10:25 - 11:45 (2)
                {type: SLOT_SUBJECT, start: 43500, end: 48300, index: 2}, // 12:05 - 13:25 (3)
                {type: SLOT_SUBJECT, start: 48900, end: 53700, index: 3},  // 13:35 - 14:55 (4)
                {type: SLOT_SUBJECT, start: 54300, end: 59100, index: 4},  // 15:05 - 16:25 (5)
                {type: SLOT_SUBJECT, start: 59700, end: 64500, index: 5},  // 16:35 - 17:55 (6)
                {type: SLOT_PAUSE, start: 36301, end: 37499, next: 2}, // 10:05 - 10:25 (P)
                {type: SLOT_PAUSE, start: 42301, end: 43499, next: 2}, // 11:45 - 12:05 (P)
                {type: SLOT_PAUSE, start: 48301, end: 48899, next: 2}, // 13:25 - 13:35 (P)
                {type: SLOT_PAUSE, start: 53701, end: 54299, next: 2}, // 14:55 - 15:05 (P)
                {type: SLOT_PAUSE, start: 59101, end: 59699, next: 2}, // 16:25 - 16:35 (P)
            ]
            // ,
            // [   // TODO: Временная карта обучения на субботу
            //     {type: SLOT_SUBJECT, start: 31500, end: 36300},
            //     {type: SLOT_PAUSE, start: 36301, end: 37499},
            //     {type: SLOT_SUBJECT, start: 37500, end: 42300},
            //     {type: SLOT_PAUSE, start: 42301, end: 49499},
            //     {type: SLOT_SUBJECT, start: 43500, end: 48300},
            //     {type: SLOT_PAUSE, start: 48301, end: 48899},
            //     {type: SLOT_SUBJECT, start: 48900, end: 53700}
            // ]


        const getCurrentSlot = () => {
            let now = getCurrentSecs();
            const firstIndex = DAY_FORMATTED.pairs[0].p_num-1;
            const lastIndex = DAY_FORMATTED.pairs[DAY_FORMATTED.pairs.length-1].p_num-1
            let currentSlot = null;
            if (now < SLOT_TIMING[firstIndex].start) currentSlot = {type: SLOT_BEFORE}
            else if (now > SLOT_TIMING[lastIndex].end) currentSlot = {type: SLOT_AFTER}
            else SLOT_TIMING.forEach((slot, index, map) => {
                if (slot.start <= now & now <= slot.end) {
                    slot.progress = (now - slot.start) / (slot.end - slot.start);
                    currentSlot = slot;
                }
            })

            return currentSlot;
        }
        const getCurrentPair = () => {
            let pairs = DAY_FORMATTED.pairs;
            let now = getCurrentSecs();
            let slot = getCurrentSlot();
            let currentPair = null;
            console.log(getCurrentSlot())
            if (slot.type == SLOT_SUBJECT) {
                pairs.forEach((pair, index, arr) => {
                    if (pair.p_num == slot.index + 1) currentPair = pair;
                })
            }

            return currentPair;
        }

        const getSlotStrings = () => {
            let slot = getCurrentSlot();
            console.log(slot);
            let pair = getCurrentPair();
            const getHeader = (slot) => {
                switch (slot.type) {
                    case SLOT_PAUSE:
                        return "Перерыв";
                        break;
                    case SLOT_BEFORE:
                        return "Первая пара: " + DAY_FORMATTED.pairs[0].p_subj +
                            " в " + DAY_FORMATTED.pairs[0].p_time.split(" - ")[0];
                        break;
                    case SLOT_AFTER:
                        return "Занятия закончились"
                        break;
                }
            }
            const getSubheader = (slot) => {
                switch (slot.type) {
                    case SLOT_PAUSE:
                        return "Осталось " + ((slot.end - getCurrentSecs()) / 60).toFixed(0) + " мин.";
                        break;
                    case SLOT_BEFORE:
                        return "До начала " + toHHMMHR(SLOT_TIMING[DAY_FORMATTED.pairs[0].p_num - 1].start - getCurrentSecs());
                        break;
                    case SLOT_AFTER:
                        return "Приятного отдыха!"
                        break;
                    case SLOT_SUBJECT:
                        return "Осталось: " + toHHMMHR(slot.end - getCurrentSecs())
                }
            }
            return {
                type: slot.type,
                header: slot.type == SLOT_SUBJECT ? pair.p_subj : getHeader(slot),
                subheader: getSubheader(slot)
            }
        }

        const progressBar = () => {
            return getCurrentSlot().type == SLOT_SUBJECT | getCurrentSlot().type == SLOT_PAUSE ?
                "linear-gradient(90deg,rgba(0,0,0,.3),rgba(0,0,0,.3) "
                + getCurrentSlot().progress * 100 + "%,rgba(0,0,0,0),rgba(0,0,0,0) "
                + getCurrentSlot().progress * 100 + "%)" : null
        }

        const PAUSE_TITLE = "Перерыв";
        const NEXT_TITLE = "Далее: ";
        const REMAINING_TITLE = "Осталось: ";
        const background = (slot) => {
            switch (slot.type) {
                case SLOT_PAUSE:
                    return "#63b2c0";
                    break;
                case SLOT_SUBJECT:
                    return "#7763c0";
                    break;
                case SLOT_BEFORE:
                    return "#9263c0";
                    break;
                case SLOT_AFTER:
                    return "#63c0b2";
                    break;
            }
        }
        return (
            <Banner
                mode="image"
                header={getSlotStrings().header}
                id="current_p"
                subheader={<Text>{getSlotStrings().subheader + (mockTime ? " Поддельное время: " +toHHMMHR(mockTime) : "")}</Text>}
                background={
                    <div style={{
                        backgroundColor: background(getCurrentSlot()),
                        backgroundImage: progressBar(),
                    }}/>
                }
            />
        )
    }else{
        return <Banner
                mode="image"
                header="Выходной"
                id="current_p"
                subheader={<Text>Приятного отдыха!</Text>}
                background={
                    <div style={{
                        backgroundColor: "#63b2c0",
                    }}/>
                }
            />
    }
}

export default TimeWidget;


