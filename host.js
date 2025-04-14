
const redirectUrl = {
    'app': '/dist/',
};

function redriectTo(){
    const url = new URL(location.href);
    const pathname = url.pathname;

    if (pathname === '/index.html' || pathname === '/') {
        // Redirect to the app page
        location.href = redirectUrl.app;
    }
}

redriectTo();
