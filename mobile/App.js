import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import ApiKeys from "./ApiKeys"
import * as firebase from "firebase"

import React from 'react';

import Routes from './src/routes';


export default function App() {

  if (!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig);}
  return (
    <Routes />
  );
}

