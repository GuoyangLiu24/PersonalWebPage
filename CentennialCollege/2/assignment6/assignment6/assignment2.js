
$(document).ready(function() {
    let list;
    var delay = 0;
    var timeouts = [];
    var index = 0;
    var updated = false;
    $.ajaxSettings.async = false;
    $.get('./list.txt', function(data) {list = JSON.parse(data).list1});
    var image = document.getElementById('image');
    var pButton = document.getElementById("previous");
    pButton.addEventListener("click", function () {
        for (var i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        timeouts = [];
        loop('p', image.id);
    });
    
    var nButton = document.getElementById("next");
    nButton.addEventListener("click", function () {
        for (var i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        timeouts = [];
        loop('n', image.id);
    });

    var uButton = document.getElementById("update");
    uButton.addEventListener("click", function () {
        for (var i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        timeouts = [];
        loop('u', 0);
    });
    
    function reloadPage(url, count) {         
        image.src = './image/' + url;
        image.id = count;
        if(count === list.length - 1) {
            index = 0;
            delay = list[count].time;
            loop(null, 0);
        }
   }
    // run the first time; all subsequent calls will take care of themselves
    const loop = async (buttonType = null, index) =>{
        for (var i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        if(buttonType == 'p') {
            if(index == 0) index = list.length - 1;
            else index--;
            delay = 0;
        }
        if(buttonType == 'n') {
            if(index == list.length - 1) index = 0
            else index++
            delay = 0;
        };
        if(buttonType == 'u') {
            updated = !updated;
            updated?
            $.get('./list.txt', function(data) {list = JSON.parse(data).list2})
            : $.get('./list.txt', function(data) {list = JSON.parse(data).list1})
            index = 0;
            delay = 0;
        };
        for (let count = index; count < list.length; count++){
            timeouts.push(setTimeout(reloadPage, delay, list[count].name, count))
            delay += list[count].time;
        }
    }
    loop(null, index);
});