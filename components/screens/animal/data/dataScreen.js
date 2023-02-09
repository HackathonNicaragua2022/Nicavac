import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import firebase from '../../../../database/firebase';
import moment from "moment/moment";

const DataScreen = (props) => {

    const initialAnimal = {
        animalId: '',
        animalCode: '',
        animalName: '',
        animalGenerer: '',
        animalRace: '',
        animalBirth: '',
        animalWeight: '',
        animalLactationCycle: '',
        animalMainActivity: '',
        animalSideline: '',
        animalDescription: '',
        animalCattle: '',
        animalCastrate: '',
    };

    const [loading, setLoading] = useState(true)

    const [animal, setAnimal] = useState(initialAnimal)
    const [date, setDate] = useState(new Date);

    const selectDate = (value, animalLactationCycle) => {
        setDate({ ...animal, [animalLactationCycle]: value });
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
        });
    };

    const showDatePicker = () => {
        showMode('date');
    };

    const getAnimalById = async (animalId) => {
        const dbRef = firebase.db.collection('animals').doc(animalId)
        const doc = await dbRef.get();
        const animal = doc.data();
        setAnimal({
            ...animal,
            animalId: doc.id
        })
        setLoading(false)
    }

    function dateFormat() {
        const date = animal.animalBirth
        if (date != null) {
            const timestamp = date.toString()
            const milliseconds = timestamp.substring(18, 28) + timestamp.substring(42, 45)
            const dateFormatl = new Date(parseInt(milliseconds))
            const age = moment(dateFormatl).format('DD/MM/YYYY')
            return (age)
        }
    }

    function monthFormat() {
        const date = animal.animalBirth
        if (date != null) {
            const timestamp = date.toString()
            const milliseconds = timestamp.substring(18, 28) + timestamp.substring(42, 45)
            const dateFormatl = new Date(parseInt(milliseconds))
            const now = moment();
            const months = now.diff(dateFormatl, 'months');
            return (months)
        }
    }

    const newLactationCycle = async () => {
        const dbRef = firebase.db.collection('animals').doc(animal.animalId);
        await dbRef.set({
            animalCode: animal.animalCode,
            animalName: animal.animalName,
            animalGenerer: animal.animalGenerer,
            animalRace: animal.animalRace,
            animalBirth: animal.animalBirth,
            animalWeight: animal.animalWeight,
            animalLactationCycle: animal.animalLactationCycle,
            animalMainActivity: animal.animalMainActivity,
            animalSideline: animal.animalSideline,
            animalCattle: animal.animalCattle,
            animalDescription: animal.animalDescription,
            animalCastrate: animal.animalCastrate,
        })
    }

    function dayFormat() {
        const str = animal.animalLactationCycle;
        const date = new Date(str);
        const timestamp = date.getTime();
        const dateFormat1 = new Date(parseInt(timestamp));
        const now = moment();
        const days = now.diff(dateFormat1, 'months');
        return (days)
    }

    useEffect(() => {
        getAnimalById(props.route.params.animalId)
    }, []);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' color='#9e9e9e' />
            </View>
        )
    }

    function minWeight() {
        if ((animal.animalRace === 'Jersey') && (animal.animalGenerer === 'H')) {
            if (monthFormat() === 0) { return (20) }
            else if (monthFormat() === 1) { return (26) }
            else if (monthFormat() === 2) { return (43) }
            else if (monthFormat() === 3) { return (77) }
            else if (monthFormat() === 4) { return (94) }
            else if (monthFormat() === 5) { return (111) }
            else if (monthFormat() === 6) { return (128) }
            else if (monthFormat() === 7) { return (145) }
            else if (monthFormat() === 8) { return (162) }
            else if (monthFormat() === 9) { return (170) }
            else if (monthFormat() === 10) { return (179) }
            else if (monthFormat() === 11) { return (187) }
            else if (monthFormat() === 12) { return (196) }
            else if (monthFormat() === 13) { return (204) }
            else if (monthFormat() === 14) { return (213) }
            else if (monthFormat() === 15) { return (221) }
            else if (monthFormat() === 16) { return (230) }
            else if (monthFormat() === 17) { return (230) }
            else if (monthFormat() === 18) { return (230) }
            else if (monthFormat() === 19) { return (230) }
            else if (monthFormat() === 20) { return (230) }
            else if (monthFormat() === 21) { return (230) }
            else if (monthFormat() === 22) { return (238) }
            else if (monthFormat() === 23) { return (238) }
            else if (monthFormat() === 24) { return (238) }
            else if (monthFormat() === 25) { return (238) }
            else if (monthFormat() === 26) { return (238) }
            else if (monthFormat() === 27) { return (238) }
            else if (monthFormat() === 28) { return (238) }
            else if (monthFormat() === 29) { return (247) }
            else if (monthFormat() === 30) { return (247) }
            else if (monthFormat() === 31) { return (255) }
            else if (monthFormat() === 32) { return (255) }
            else if (monthFormat() === 33) { return (255) }
            else if (monthFormat() === 34) { return (264) }
            else if (monthFormat() === 35) { return (264) }
            else if (monthFormat() === 36) { return (264) }
            else if (monthFormat() === 37) { return (264) }
            else if (monthFormat() === 38) { return (272) }
            else if (monthFormat() === 39) { return (272) }
            else if (monthFormat() === 40) { return (272) }
            else if (monthFormat() === 41) { return (281) }
            else if (monthFormat() === 42) { return (281) }
            else if (monthFormat() === 43) { return (289) }
            else if (monthFormat() === 44) { return (289) }
            else if (monthFormat() === 45) { return (298) }
            else if (monthFormat() === 46) { return (298) }
            else if (monthFormat() === 47) { return (298) }
            else if (monthFormat() > 47) { return (298) }
        } else if ((animal.animalRace === 'Holstein') && (animal.animalGenerer === 'H')) {
            if (monthFormat() === 0) { return (29) }
            else if (monthFormat() === 1) { return (49) }
            else if (monthFormat() === 2) { return (60) }
            else if (monthFormat() === 3) { return (76) }
            else if (monthFormat() === 4) { return (92) }
            else if (monthFormat() === 5) { return (109) }
            else if (monthFormat() === 6) { return (126) }
            else if (monthFormat() === 7) { return (143) }
            else if (monthFormat() === 8) { return (160) }
            else if (monthFormat() === 9) { return (168) }
            else if (monthFormat() === 10) { return (176) }
            else if (monthFormat() === 11) { return (185) }
            else if (monthFormat() === 12) { return (193) }
            else if (monthFormat() === 13) { return (202) }
            else if (monthFormat() === 14) { return (210) }
            else if (monthFormat() === 15) { return (218) }
            else if (monthFormat() === 16) { return (227) }
            else if (monthFormat() === 17) { return (252) }
            else if (monthFormat() === 18) { return (294) }
            else if (monthFormat() === 19) { return (336) }
            else if (monthFormat() === 20) { return (361) }
            else if (monthFormat() === 21) { return (386) }
            else if (monthFormat() === 22) { return (420) }
            else if (monthFormat() === 23) { return (437) }
            else if (monthFormat() === 24) { return (437) }
            else if (monthFormat() === 25) { return (445) }
            else if (monthFormat() === 26) { return (445) }
            else if (monthFormat() === 27) { return (454) }
            else if (monthFormat() === 28) { return (454) }
            else if (monthFormat() === 29) { return (462) }
            else if (monthFormat() === 30) { return (462) }
            else if (monthFormat() === 31) { return (462) }
            else if (monthFormat() === 32) { return (470) }
            else if (monthFormat() === 33) { return (470) }
            else if (monthFormat() === 34) { return (479) }
            else if (monthFormat() === 35) { return (479) }
            else if (monthFormat() === 36) { return (487) }
            else if (monthFormat() === 37) { return (496) }
            else if (monthFormat() === 38) { return (504) }
            else if (monthFormat() === 39) { return (504) }
            else if (monthFormat() === 40) { return (504) }
            else if (monthFormat() === 41) { return (504) }
            else if (monthFormat() === 42) { return (504) }
            else if (monthFormat() === 43) { return (504) }
            else if (monthFormat() === 44) { return (504) }
            else if (monthFormat() === 45) { return (504) }
            else if (monthFormat() === 46) { return (504) }
            else if (monthFormat() === 47) { return (504) }
            else if (monthFormat() > 47) { return (504) }
        } else if ((animal.animalRace === 'Angus') && (animal.animalGenerer === 'H')) {
            if (monthFormat() === 0) { return (24) }
            else if (monthFormat() === 1) { return (46) }
            else if (monthFormat() === 2) { return (58) }
            else if (monthFormat() === 3) { return (80) }
            else if (monthFormat() === 4) { return (112) }
            else if (monthFormat() === 5) { return (128) }
            else if (monthFormat() === 6) { return (136) }
            else if (monthFormat() === 7) { return (144) }
            else if (monthFormat() === 8) { return (152) }
            else if (monthFormat() === 9) { return (160) }
            else if (monthFormat() === 10) { return (168) }
            else if (monthFormat() === 11) { return (176) }
            else if (monthFormat() === 12) { return (184) }
            else if (monthFormat() === 13) { return (192) }
            else if (monthFormat() === 14) { return (200) }
            else if (monthFormat() === 15) { return (240) }
            else if (monthFormat() === 16) { return (256) }
            else if (monthFormat() === 17) { return (280) }
            else if (monthFormat() === 18) { return (296) }
            else if (monthFormat() === 19) { return (304) }
            else if (monthFormat() === 20) { return (312) }
            else if (monthFormat() === 21) { return (320) }
            else if (monthFormat() === 22) { return (320) }
            else if (monthFormat() === 23) { return (320) }
            else if (monthFormat() === 24) { return (328) }
            else if (monthFormat() === 25) { return (336) }
            else if (monthFormat() === 26) { return (336) }
            else if (monthFormat() === 27) { return (344) }
            else if (monthFormat() === 28) { return (344) }
            else if (monthFormat() === 29) { return (352) }
            else if (monthFormat() === 30) { return (352) }
            else if (monthFormat() === 31) { return (352) }
            else if (monthFormat() === 32) { return (360) }
            else if (monthFormat() === 33) { return (360) }
            else if (monthFormat() === 34) { return (360) }
            else if (monthFormat() === 35) { return (368) }
            else if (monthFormat() === 36) { return (368) }
            else if (monthFormat() === 37) { return (368) }
            else if (monthFormat() === 38) { return (376) }
            else if (monthFormat() === 39) { return (376) }
            else if (monthFormat() === 40) { return (376) }
            else if (monthFormat() === 41) { return (376) }
            else if (monthFormat() === 42) { return (384) }
            else if (monthFormat() === 43) { return (384) }
            else if (monthFormat() === 44) { return (384) }
            else if (monthFormat() === 45) { return (392) }
            else if (monthFormat() === 46) { return (392) }
            else if (monthFormat() === 47) { return (392) }
            else if (monthFormat() > 47) { return (400) }
        }
    }

    function maxWeight() {
        if ((animal.animalRace === 'Jersey') && (animal.animalGenerer === 'H')) {
            if (monthFormat() === 0) { return (31) }
            else if (monthFormat() === 1) { return (39) }
            else if (monthFormat() === 2) { return (65) }
            else if (monthFormat() === 3) { return (116) }
            else if (monthFormat() === 4) { return (142) }
            else if (monthFormat() === 5) { return (168) }
            else if (monthFormat() === 6) { return (194) }
            else if (monthFormat() === 7) { return (219) }
            else if (monthFormat() === 8) { return (145) }
            else if (monthFormat() === 9) { return (258) }
            else if (monthFormat() === 10) { return (271) }
            else if (monthFormat() === 11) { return (284) }
            else if (monthFormat() === 12) { return (297) }
            else if (monthFormat() === 13) { return (310) }
            else if (monthFormat() === 14) { return (323) }
            else if (monthFormat() === 15) { return (335) }
            else if (monthFormat() === 16) { return (348) }
            else if (monthFormat() === 17) { return (348) }
            else if (monthFormat() === 18) { return (348) }
            else if (monthFormat() === 19) { return (348) }
            else if (monthFormat() === 20) { return (348) }
            else if (monthFormat() === 21) { return (348) }
            else if (monthFormat() === 22) { return (361) }
            else if (monthFormat() === 23) { return (361) }
            else if (monthFormat() === 24) { return (361) }
            else if (monthFormat() === 25) { return (361) }
            else if (monthFormat() === 26) { return (361) }
            else if (monthFormat() === 27) { return (361) }
            else if (monthFormat() === 28) { return (361) }
            else if (monthFormat() === 29) { return (374) }
            else if (monthFormat() === 30) { return (374) }
            else if (monthFormat() === 31) { return (387) }
            else if (monthFormat() === 32) { return (387) }
            else if (monthFormat() === 33) { return (387) }
            else if (monthFormat() === 34) { return (400) }
            else if (monthFormat() === 35) { return (400) }
            else if (monthFormat() === 36) { return (400) }
            else if (monthFormat() === 37) { return (400) }
            else if (monthFormat() === 38) { return (413) }
            else if (monthFormat() === 39) { return (413) }
            else if (monthFormat() === 40) { return (413) }
            else if (monthFormat() === 41) { return (426) }
            else if (monthFormat() === 42) { return (426) }
            else if (monthFormat() === 43) { return (439) }
            else if (monthFormat() === 44) { return (439) }
            else if (monthFormat() === 45) { return (452) }
            else if (monthFormat() === 46) { return (452) }
            else if (monthFormat() === 47) { return (452) }
            else if (monthFormat() > 47) { return (452) }
        } else if ((animal.animalRace === 'Holstein') && (animal.animalGenerer === 'H')) {
            if (monthFormat() === 0) { return (43) }
            else if (monthFormat() === 1) { return (73) }
            else if (monthFormat() === 2) { return (90) }
            else if (monthFormat() === 3) { return (113) }
            else if (monthFormat() === 4) { return (138) }
            else if (monthFormat() === 5) { return (163) }
            else if (monthFormat() === 6) { return (188) }
            else if (monthFormat() === 7) { return (213) }
            else if (monthFormat() === 8) { return (238) }
            else if (monthFormat() === 9) { return (250) }
            else if (monthFormat() === 10) { return (263) }
            else if (monthFormat() === 11) { return (275) }
            else if (monthFormat() === 12) { return (288) }
            else if (monthFormat() === 13) { return (300) }
            else if (monthFormat() === 14) { return (313) }
            else if (monthFormat() === 15) { return (325) }
            else if (monthFormat() === 16) { return (338) }
            else if (monthFormat() === 17) { return (375) }
            else if (monthFormat() === 18) { return (438) }
            else if (monthFormat() === 19) { return (500) }
            else if (monthFormat() === 20) { return (538) }
            else if (monthFormat() === 21) { return (575) }
            else if (monthFormat() === 22) { return (625) }
            else if (monthFormat() === 23) { return (650) }
            else if (monthFormat() === 24) { return (650) }
            else if (monthFormat() === 25) { return (663) }
            else if (monthFormat() === 26) { return (663) }
            else if (monthFormat() === 27) { return (675) }
            else if (monthFormat() === 28) { return (675) }
            else if (monthFormat() === 29) { return (688) }
            else if (monthFormat() === 30) { return (688) }
            else if (monthFormat() === 31) { return (688) }
            else if (monthFormat() === 32) { return (700) }
            else if (monthFormat() === 33) { return (700) }
            else if (monthFormat() === 34) { return (713) }
            else if (monthFormat() === 35) { return (713) }
            else if (monthFormat() === 36) { return (725) }
            else if (monthFormat() === 37) { return (738) }
            else if (monthFormat() === 38) { return (750) }
            else if (monthFormat() === 39) { return (750) }
            else if (monthFormat() === 40) { return (750) }
            else if (monthFormat() === 41) { return (750) }
            else if (monthFormat() === 42) { return (750) }
            else if (monthFormat() === 43) { return (750) }
            else if (monthFormat() === 44) { return (750) }
            else if (monthFormat() === 45) { return (750) }
            else if (monthFormat() === 46) { return (750) }
            else if (monthFormat() === 47) { return (750) }
            else if (monthFormat() > 47) { return (750) }
        } else if ((animal.animalRace === 'Angus') && (animal.animalGenerer === 'H')) {
            if (monthFormat() === 0) { return (36) }
            else if (monthFormat() === 1) { return (70) }
            else if (monthFormat() === 2) { return (86) }
            else if (monthFormat() === 3) { return (120) }
            else if (monthFormat() === 4) { return (168) }
            else if (monthFormat() === 5) { return (192) }
            else if (monthFormat() === 6) { return (204) }
            else if (monthFormat() === 7) { return (216) }
            else if (monthFormat() === 8) { return (228) }
            else if (monthFormat() === 9) { return (240) }
            else if (monthFormat() === 10) { return (240) }
            else if (monthFormat() === 11) { return (252) }
            else if (monthFormat() === 12) { return (264) }
            else if (monthFormat() === 13) { return (276) }
            else if (monthFormat() === 14) { return (288) }
            else if (monthFormat() === 15) { return (300) }
            else if (monthFormat() === 16) { return (360) }
            else if (monthFormat() === 17) { return (384) }
            else if (monthFormat() === 18) { return (420) }
            else if (monthFormat() === 19) { return (444) }
            else if (monthFormat() === 20) { return (456) }
            else if (monthFormat() === 21) { return (468) }
            else if (monthFormat() === 22) { return (480) }
            else if (monthFormat() === 23) { return (480) }
            else if (monthFormat() === 24) { return (480) }
            else if (monthFormat() === 25) { return (492) }
            else if (monthFormat() === 26) { return (504) }
            else if (monthFormat() === 27) { return (504) }
            else if (monthFormat() === 28) { return (516) }
            else if (monthFormat() === 29) { return (516) }
            else if (monthFormat() === 30) { return (528) }
            else if (monthFormat() === 31) { return (528) }
            else if (monthFormat() === 32) { return (528) }
            else if (monthFormat() === 33) { return (540) }
            else if (monthFormat() === 34) { return (540) }
            else if (monthFormat() === 35) { return (540) }
            else if (monthFormat() === 36) { return (552) }
            else if (monthFormat() === 37) { return (552) }
            else if (monthFormat() === 38) { return (552) }
            else if (monthFormat() === 39) { return (564) }
            else if (monthFormat() === 40) { return (564) }
            else if (monthFormat() === 41) { return (564) }
            else if (monthFormat() === 42) { return (564) }
            else if (monthFormat() === 43) { return (576) }
            else if (monthFormat() === 44) { return (576) }
            else if (monthFormat() === 45) { return (576) }
            else if (monthFormat() === 46) { return (588) }
            else if (monthFormat() === 47) { return (588) }
            else if (monthFormat() > 47) { return (600) }
        }
    }

    function idealWeight() {
        if ((animal.animalRace === 'Jersey') && (animal.animalGenerer === 'H')) {
            if (monthFormat() === 0) { return (24) }
            else if (monthFormat() === 1) { return (30) }
            else if (monthFormat() === 2) { return (50) }
            else if (monthFormat() === 3) { return (90) }
            else if (monthFormat() === 4) { return (110) }
            else if (monthFormat() === 5) { return (130) }
            else if (monthFormat() === 6) { return (150) }
            else if (monthFormat() === 7) { return (170) }
            else if (monthFormat() === 8) { return (190) }
            else if (monthFormat() === 9) { return (200) }
            else if (monthFormat() === 10) { return (210) }
            else if (monthFormat() === 11) { return (220) }
            else if (monthFormat() === 12) { return (230) }
            else if (monthFormat() === 13) { return (240) }
            else if (monthFormat() === 14) { return (250) }
            else if (monthFormat() === 15) { return (260) }
            else if (monthFormat() === 16) { return (270) }
            else if (monthFormat() === 17) { return (270) }
            else if (monthFormat() === 18) { return (270) }
            else if (monthFormat() === 19) { return (270) }
            else if (monthFormat() === 20) { return (270) }
            else if (monthFormat() === 21) { return (270) }
            else if (monthFormat() === 22) { return (280) }
            else if (monthFormat() === 23) { return (280) }
            else if (monthFormat() === 24) { return (280) }
            else if (monthFormat() === 25) { return (280) }
            else if (monthFormat() === 26) { return (280) }
            else if (monthFormat() === 27) { return (280) }
            else if (monthFormat() === 28) { return (280) }
            else if (monthFormat() === 29) { return (290) }
            else if (monthFormat() === 30) { return (290) }
            else if (monthFormat() === 31) { return (300) }
            else if (monthFormat() === 32) { return (300) }
            else if (monthFormat() === 33) { return (300) }
            else if (monthFormat() === 34) { return (310) }
            else if (monthFormat() === 35) { return (310) }
            else if (monthFormat() === 36) { return (310) }
            else if (monthFormat() === 37) { return (310) }
            else if (monthFormat() === 38) { return (320) }
            else if (monthFormat() === 39) { return (320) }
            else if (monthFormat() === 40) { return (320) }
            else if (monthFormat() === 41) { return (330) }
            else if (monthFormat() === 42) { return (330) }
            else if (monthFormat() === 43) { return (340) }
            else if (monthFormat() === 44) { return (340) }
            else if (monthFormat() === 45) { return (350) }
            else if (monthFormat() === 46) { return (350) }
            else if (monthFormat() === 47) { return (350) }
            else if (monthFormat() > 47) { return (350) }
        } else if ((animal.animalRace === 'Holstein') && (animal.animalGenerer === 'H')) {
            if (monthFormat() === 0) { return (34) }
            else if (monthFormat() === 1) { return (58) }
            else if (monthFormat() === 2) { return (72) }
            else if (monthFormat() === 3) { return (90) }
            else if (monthFormat() === 4) { return (110) }
            else if (monthFormat() === 5) { return (130) }
            else if (monthFormat() === 6) { return (150) }
            else if (monthFormat() === 7) { return (170) }
            else if (monthFormat() === 8) { return (190) }
            else if (monthFormat() === 9) { return (200) }
            else if (monthFormat() === 10) { return (210) }
            else if (monthFormat() === 11) { return (220) }
            else if (monthFormat() === 12) { return (230) }
            else if (monthFormat() === 13) { return (240) }
            else if (monthFormat() === 14) { return (250) }
            else if (monthFormat() === 15) { return (260) }
            else if (monthFormat() === 16) { return (270) }
            else if (monthFormat() === 17) { return (300) }
            else if (monthFormat() === 18) { return (350) }
            else if (monthFormat() === 19) { return (400) }
            else if (monthFormat() === 20) { return (430) }
            else if (monthFormat() === 21) { return (460) }
            else if (monthFormat() === 22) { return (500) }
            else if (monthFormat() === 23) { return (520) }
            else if (monthFormat() === 24) { return (520) }
            else if (monthFormat() === 25) { return (530) }
            else if (monthFormat() === 26) { return (530) }
            else if (monthFormat() === 27) { return (540) }
            else if (monthFormat() === 28) { return (540) }
            else if (monthFormat() === 29) { return (550) }
            else if (monthFormat() === 30) { return (550) }
            else if (monthFormat() === 31) { return (550) }
            else if (monthFormat() === 32) { return (560) }
            else if (monthFormat() === 33) { return (560) }
            else if (monthFormat() === 34) { return (570) }
            else if (monthFormat() === 35) { return (570) }
            else if (monthFormat() === 36) { return (580) }
            else if (monthFormat() === 37) { return (590) }
            else if (monthFormat() === 38) { return (600) }
            else if (monthFormat() === 39) { return (600) }
            else if (monthFormat() === 40) { return (600) }
            else if (monthFormat() === 41) { return (600) }
            else if (monthFormat() === 42) { return (600) }
            else if (monthFormat() === 43) { return (600) }
            else if (monthFormat() === 44) { return (600) }
            else if (monthFormat() === 45) { return (600) }
            else if (monthFormat() === 46) { return (600) }
            else if (monthFormat() === 47) { return (600) }
            else if (monthFormat() > 47) { return (600) }
        } else if ((animal.animalRace === 'Angus') && (animal.animalGenerer === 'H')) {
            if (monthFormat() === 0) { return (30) }
            else if (monthFormat() === 1) { return (58) }
            else if (monthFormat() === 2) { return (72) }
            else if (monthFormat() === 3) { return (100) }
            else if (monthFormat() === 4) { return (140) }
            else if (monthFormat() === 5) { return (160) }
            else if (monthFormat() === 6) { return (170) }
            else if (monthFormat() === 7) { return (180) }
            else if (monthFormat() === 8) { return (190) }
            else if (monthFormat() === 9) { return (200) }
            else if (monthFormat() === 10) { return (210) }
            else if (monthFormat() === 11) { return (220) }
            else if (monthFormat() === 12) { return (230) }
            else if (monthFormat() === 13) { return (240) }
            else if (monthFormat() === 14) { return (250) }
            else if (monthFormat() === 15) { return (300) }
            else if (monthFormat() === 16) { return (320) }
            else if (monthFormat() === 17) { return (350) }
            else if (monthFormat() === 18) { return (370) }
            else if (monthFormat() === 19) { return (380) }
            else if (monthFormat() === 20) { return (390) }
            else if (monthFormat() === 21) { return (400) }
            else if (monthFormat() === 22) { return (400) }
            else if (monthFormat() === 23) { return (400) }
            else if (monthFormat() === 24) { return (410) }
            else if (monthFormat() === 25) { return (420) }
            else if (monthFormat() === 26) { return (420) }
            else if (monthFormat() === 27) { return (430) }
            else if (monthFormat() === 28) { return (430) }
            else if (monthFormat() === 29) { return (440) }
            else if (monthFormat() === 30) { return (440) }
            else if (monthFormat() === 31) { return (450) }
            else if (monthFormat() === 32) { return (450) }
            else if (monthFormat() === 33) { return (450) }
            else if (monthFormat() === 34) { return (460) }
            else if (monthFormat() === 35) { return (460) }
            else if (monthFormat() === 36) { return (460) }
            else if (monthFormat() === 37) { return (470) }
            else if (monthFormat() === 38) { return (470) }
            else if (monthFormat() === 39) { return (470) }
            else if (monthFormat() === 40) { return (470) }
            else if (monthFormat() === 41) { return (480) }
            else if (monthFormat() === 42) { return (480) }
            else if (monthFormat() === 43) { return (480) }
            else if (monthFormat() === 44) { return (490) }
            else if (monthFormat() === 45) { return (490) }
            else if (monthFormat() === 46) { return (500) }
            else if (monthFormat() === 47) { return (500) }
            else if (monthFormat() > 47) { return (500) }
        }
    }

    function lactationCycle() {
        if (animal.animalRace === 'Jersey') {
            if (dayFormat() === 0) { return (30) }
            else if (dayFormat() === 1) { return (40) }
            else if (dayFormat() === 2) { return (38) }
            else if (dayFormat() === 3) { return (37) }
            else if (dayFormat() === 4) { return (36) }
            else if (dayFormat() === 5) { return (35) }
            else if (dayFormat() === 6) { return (34) }
            else if (dayFormat() === 7) { return (32) }
            else if (dayFormat() === 8) { return (30) }
            else if (dayFormat() === 9) { return (25) }
            else if (dayFormat() > 9) { return (10) }
        } else if (animal.animalRace === 'Holstein') {
            if (dayFormat() === 0) { return (15) }
            else if (dayFormat() === 1) { return (23) }
            else if (dayFormat() === 2) { return (24) }
            else if (dayFormat() === 3) { return (23) }
            else if (dayFormat() === 4) { return (21) }
            else if (dayFormat() === 5) { return (20) }
            else if (dayFormat() === 6) { return (20) }
            else if (dayFormat() === 7) { return (19) }
            else if (dayFormat() === 8) { return (18) }
            else if (dayFormat() === 9) { return (17) }
            else if (dayFormat() > 9) { return (12) }
        } else if (animal.animalRace === 'Angus') {
            if (dayFormat() === 0) { return (22) }
            else if (dayFormat() === 1) { return (30) }
            else if (dayFormat() === 2) { return (45) }
            else if (dayFormat() === 3) { return (40) }
            else if (dayFormat() === 4) { return (35) }
            else if (dayFormat() === 5) { return (30) }
            else if (dayFormat() === 6) { return (25) }
            else if (dayFormat() === 7) { return (20) }
            else if (dayFormat() === 8) { return (15) }
            else if (dayFormat() === 9) { return (10) }
            else if (dayFormat() > 9) { return (5) }
        }
    }

    function calculateState() {
        if (animal.animalWeight < minWeight()) {
            const state = minWeight() - animal.animalWeight
            return (
                <View style={{ alignSelf: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'red' }}>¡Animal con desnutrición!</Text>
                    <Text style={{ fontSize: 18 }}>Está {state}kg por debajo del límite</Text>
                </View>
            )
        } else if ((animal.animalWeight > (minWeight() - 1)) && (animal.animalWeight < idealWeight())) {
            const state = idealWeight() - animal.animalWeight
            return (
                <View>
                    <Text style={{ fontSize: 18, color: 'orange' }}>¡Animal con bajopeso!</Text>
                    <Text style={{ fontSize: 18 }}>Está {state}kg por debajo del mínimo</Text>
                    <Text style={{ fontSize: 18 }}>esperado</Text>
                </View>
            )
        } else if ((animal.animalWeight > (idealWeight() - 1)) && (animal.animalWeight < (maxWeight() + 1))) {
            return (
                <View>
                    <Text style={{ fontSize: 18, color: 'green' }}>Animal en buen estado</Text>
                </View>
            )
        } else if (animal.animalWeight > maxWeight()) {
            const state = animal.animalWeight - maxWeight()
            return (
                <View>
                    <Text style={{ fontSize: 18, color: 'orange' }}>¡Animal con sobrepeso!</Text>
                    <Text style={{ fontSize: 18 }}>Está {state}kg por encima del máximo</Text>
                    <Text style={{ fontSize: 18 }}>esperado</Text>
                </View>
            )
        }
    }

    function rendimientoCarne() {
        const rendC = animal.animalWeight * 0.58;
        return (rendC)
    }

    function rendHuesoGrasa() {
        const rendHG = animal.animalWeight * 0.27;
        return (rendHG)
    }

    function rendimientoViceras() {
        const rendV = animal.animalWeight * 0.15;
        return (rendV)
    }

    function headDetails() {
        if (monthFormat() < 24) {
            return (
                <View >
                    <Avatar size={40}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/4478/4478312.png',
                        }}
                    />
                </View>
            )
        } else if ((monthFormat() > 23) && (monthFormat() < 49) && ((animal.animalCastrate === 'No') || (animal.animalCastrate === '--'))) {
            return (
                <View >
                    <Avatar size={40}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/1660/1660788.png',
                        }}
                    />
                </View>
            )
        } else if (((monthFormat() < 23) && (monthFormat() < 49)) && (animal.animalGenerer === 'M') && (animal.animalCastrate === 'Sí')) {
            return (
                <View >
                    <Avatar size={40}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/2298/2298414.png',
                        }}
                    />
                </View>
            )
        } else if ((monthFormat() > 48) && (animal.animalGenerer === 'M') && (animal.animalCastrate === 'Sí')) {
            return (
                <View >
                    <Avatar size={40}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/3570/3570832.png',
                        }}
                    />
                </View>
            )
        } else if ((monthFormat() > 48) && (animal.animalGenerer === 'M') && (animal.animalCastrate === 'No')) {
            return (
                <View >
                    <Avatar size={40}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/3819/3819472.png',
                        }}
                    />
                </View>
            )
        } else if ((monthFormat() > 48) && (animal.animalGenerer === 'H')) {
            return (
                <View >
                    <Avatar size={40}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/2395/2395765.png',
                        }}
                    />
                </View>
            )
        }
    }

    return (
        <ScrollView style={{ backgroundColor: '#ffffff' }}>
            <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View>{headDetails()}</View>
                <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{animal.animalName}</Text>
                    <View style={styles.iconos}>
                        <Avatar size={18}
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/748/748150.png',
                            }
                            }
                        />
                        <Text style={{ fontSize: 18 }}> Código: {animal.animalCode}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.views}>

                <View style={styles.iconos}>
                    <Avatar size={20}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/747/747310.png',
                        }
                        }
                    />
                    <View>
                        <Text style={{ fontSize: 18 }}> Fecha de Nacimiento: {dateFormat()}</Text>
                    </View>
                </View>

                <View style={styles.iconos}>
                    <Avatar size={20}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/8/8201.png',
                        }
                        }
                    />
                    <View>
                        <Text style={{ fontSize: 18 }}> Raza {animal.animalRace} hembra con {monthFormat()} meses</Text>
                    </View>
                </View>
            </View>

            <Text style={{ alignSelf: 'center', fontSize: 18 }}>Estado de nutrición</Text>

            <View style={styles.views}>
                <View style={styles.iconos}>
                    <Avatar size={20}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/5974/5974759.png',
                        }
                        }
                    />
                    <View>
                        <Text style={{ fontSize: 18 }}> Peso ideal entre {idealWeight()}kg y {maxWeight()}kg</Text>
                    </View>
                </View>

                <View style={styles.iconos}>
                    <Avatar size={20}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/5974/5974693.png',
                        }
                        }
                    />
                    <View>
                        <Text style={{ fontSize: 18 }}> Límite de desnutrición: {minWeight()}kg</Text>
                    </View>
                </View>

                <View style={styles.iconos}>
                    <View>
                        <Text style={{ fontSize: 20, textDecorationLine: 'underline' }}> Peso actual: {animal.animalWeight}kg </Text>
                    </View>
                </View>

                <Text style={{ fontSize: 18 }}>Estado del animal:</Text>
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 10 }}>
                    <Text>{calculateState()}</Text>
                </View>
            </View>

            <Text style={{ alignSelf: 'center', fontSize: 18 }}>Producción de leche</Text>

            <View style={{ padding: 10, backgroundColor: '#d9d9d9', width: 375, alignSelf: 'center', borderRadius: 10 }}>
                <Text style={{ fontSize: 18 }}>Último parto</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 300, marginRight: 15 }}>
                        <TouchableOpacity onPress={showDatePicker} title='Último parto'>
                            <View style={{ justifyContent: 'center', backgroundColor: '#bfbfbf', height: 45 }}>
                                <Text style={{ fontSize: 16, marginLeft: 6 }}>{date.toLocaleDateString()}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => newLactationCycle()}>
                            <View>
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={require('../../../src/save.png')}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{ fontSize: 18 }} onChangeText={(value) => selectDate(value, 'animalLactationCycle')}
                    value={animal.animalLactationCycle = date}>Último parto: {date.toLocaleDateString()}
                </Text>
                <Text style={{ fontSize: 18 }}>Mes de lactancia: {dayFormat()}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18 }}>Producción de leche: </Text>
                    <Text style={{ fontSize: 18, color: 'green' }}>{lactationCycle()}kg/día</Text>
                </View>

            </View>

            <Text style={{ alignSelf: 'center', fontSize: 18 }}>Rendimiento de res</Text>

            <View style={styles.views}>
                <Text style={{ fontSize: 18 }}>Peso vivo: {animal.animalWeight}kg</Text>
                <View style={{ borderWidth: 1, borderRadius: 10, alignItems: 'center', padding: 10 }}>
                    <Text style={{ fontSize: 18 }}>Rendimiento de carne (58%)</Text>
                    <Text style={{ fontSize: 18, color: 'green' }}>{rendimientoCarne()}kg</Text>
                    <Text style={{ fontSize: 18 }}>Deshuese y desgrasado (27%)</Text>
                    <Text style={{ fontSize: 18, color: 'green' }}>{rendHuesoGrasa()}kg</Text>
                    <Text style={{ fontSize: 18 }}>Víceras (15%)</Text>
                    <Text style={{ fontSize: 18, color: 'green' }}>{rendimientoViceras()}kg</Text>
                </View>

            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ alignSelf: 'center' }}>Nota: el cálculo mostrado en pantalla es solo un aproximado a la situación real de su animal.</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    iconos: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    views: {
        padding: 20,
        backgroundColor: "#d9d9d9",
        width: 375,
        borderRadius: 10,
        alignSelf: "center",
        alignItems: 'center',
    }
})

export default DataScreen;