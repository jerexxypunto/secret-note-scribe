
const redirectUrl = {
    'app': '/dist/',
};

function redriectTo(){

    function path_compare( route ){

        const url = new URL(location.href);
        const pathname = url.pathname;

        if (pathname === '/index.html' || pathname === '/' || pathname === route ) {
            return true;
        }else{
            return false;
        }

    }

    if (path_compare( '/secret-note-scribe/' )) {
        // Redirect to the app page
        location.href = redirectUrl.app;
    }
}

redriectTo();
