// sound audio file path
var sound = new Audio("https://2u039f-a.akamaihd.net/downloads/ringtones/files/mp3/melody-alarm-clock-52449.mp3");
sound.loop = true;

var h2 = document.getElementById('clock');
document.getElementById('clearButton').disabled = true;

// display current time by the second
var currentTime = setInterval(function () {
    var date = new Date();

    var hours = (12 - (date.getHours()));
    // var hours = date.getHours();

    var minutes = date.getMinutes();

    var seconds = date.getSeconds();

    var ampm = (date.getHours()) < 12 ? 'AM' : 'PM';


    //convert military time to standard time

    if (hours < 0) {
        hours = hours * -1;
    } else if (hours == 00) {
        hours = 12;
    } else {
        hours = hours;
    }

    h2.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + "" + ampm;

}, 1000);


// functions to get hour, min, secs, am or pm, add zero, set alarm time and sound, clear alarm
function addZero(time) {

    return (time < 10) ? "0" + time : time;

}

function hoursMenu() {

    var select = document.getElementById('hrs');
    var hrs = 12

    for (i = 1; i <= hrs; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);

    }
}

// call the hours function
hoursMenu();

function minMenu() {

    var select = document.getElementById('mins');
    var min = 59;

    for (i = 0; i <= min; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
}

// call the minutes function
minMenu();

function secMenu() {

    var select = document.getElementById('secs');
    var sec = 59;

    for (i = 0; i <= sec; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
}

// call the second function
secMenu();

// function to set the alarm clock
function alarmSet() {

    var hr = document.getElementById('hrs');

    var min = document.getElementById('mins');

    var sec = document.getElementById('secs');

    var ap = document.getElementById('ampm');


    var selectedHour = hr.options[hr.selectedIndex].value;
    var selectedMin = min.options[min.selectedIndex].value;
    var selectedSec = sec.options[sec.selectedIndex].value;
    var selectedAP = ap.options[ap.selectedIndex].value;

    var alarmTime = addZero(selectedHour) + ":" + addZero(selectedMin) + ":" + addZero(selectedSec) + selectedAP;
    console.log('alarmTime:' + alarmTime);

    document.getElementById('hrs').disabled = true;
    document.getElementById('mins').disabled = true;
    document.getElementById('secs').disabled = true;
    document.getElementById('ampm').disabled = true;
    document.getElementById('clearButton').disabled = false;
    document.getElementById('setButton').disabled = true;

    // to show alert box on successfull alarm set
    document.getElementById('message').innerText = 'Alarm Set Successfylly.';

    // alert('Alarm Set Successfylly...');

    var toast = document.getElementById('toast');
    toast.classList.remove('hidden');
    setTimeout(()=>{
        toast.classList.add('hidden');
    },3000)

    //when alarm time is equal to currenttime then play a sound
    var h2 = document.getElementById('clock');

    /*function to calcutate the current time 
    then compare it to the alarmtime and play a sound when they are equal
    */
    setInterval(function () {

        var date = new Date();

        var hours = (12 - (date.getHours()));
        // var hours = date.getHours();

        var minutes = date.getMinutes();

        var seconds = date.getSeconds();

        var ampm = (date.getHours()) < 12 ? 'AM' : 'PM';


        //convert military time to standard time

        if (hours < 0) {
            hours = hours * -1;
        } else if (hours == 00) {
            hours = 12;
        } else {
            hours = hours;
        }
        
        var currentTime = h2.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + "" + ampm;


        if (alarmTime == currentTime) {
            var alarmIcon = document.getElementById('alarm-icon');
            alarmIcon.classList.add('alarm-play')
            sound.play();
        }

    }, 1000);

}

// function to clear the alarm clock
function alarmClear() {

    document.getElementById('hrs').disabled = false;
    document.getElementById('mins').disabled = false;
    document.getElementById('secs').disabled = false;
    document.getElementById('ampm').disabled = false;
    document.getElementById('clearButton').disabled = true;
    document.getElementById('setButton').disabled = false;
    var alarmIcon = document.getElementById('alarm-icon');
    alarmIcon.classList.remove('alarm-play');
    
    // to show alert box on successfull alarm removed
    document.getElementById('message').innerText = 'Alarm Removed Successfylly.';
    // alert('Alarm Removed Successfylly...');
    var toast = document.getElementById('toast');
    toast.classList.remove('hidden');
    setTimeout(()=>{
        toast.classList.add('hidden');
    },3000)

    // pause the sound
    sound.pause();
}
