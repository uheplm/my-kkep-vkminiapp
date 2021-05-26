import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home';
import UserData from './panels/UserData';
import FullRasp from './panels/FullRasp'

class AppComponent extends React.Component{
    constructor(props) {
        super();
    }
}