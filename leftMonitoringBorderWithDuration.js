import React from 'react';
import RNSimpleNativeGeofencing from "react-native-simple-native-geofencing";
module.exports = async (taskData) => {
    //taskData.remainingTime
    console.log(taskData);
    // do stuff
    RNSimpleNativeGeofencing.testNotify();
};