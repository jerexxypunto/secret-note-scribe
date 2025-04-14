
const redirectUrl = {
    'app': '/dist/',
};

const relateivePath = [
    '/secret-note-scribe/'
];

function redriectTo( path ){

    function path_compare( route ){

        const url = new URL(location.href);
        const pathname = url.pathname;

        if (pathname === '/index.html' || pathname === '/' || pathname === route ) {
            return true;
        }else{
            return false;
        }

    }

    if (path_compare( path )) {
        // Redirect to the app page
        location.href = path + redirectUrl.app;
    }
}

relateivePath.forEach( path => redriectTo(path) );
