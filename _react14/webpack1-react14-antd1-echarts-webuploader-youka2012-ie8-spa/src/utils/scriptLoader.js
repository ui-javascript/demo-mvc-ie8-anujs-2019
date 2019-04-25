const scriptLoader = (url, callback) => {
    let script = document.createElement('script');
    script.id = url;
    script.type = 'text/javascript';
    let timeID;
    const supportLoad = 'onload' in script;
    const onEvent = supportLoad ? 'onload' : 'onreadystatechange';

    const header = document.getElementsByTagName('head')[0];
    header.insertBefore(script, header.firstChild);
    /*script[onEvent] = function doOnLoad() {
        if (!supportLoad && !timeID && /complete|loaded/.test(script.readyState)) {
            timeID = setTimeout(doOnLoad);
            return;
        }
        if (supportLoad || timeID) {
            clearTimeout(timeID);
            callback && callback();
        }
    };*/
    const resultPromise = new Promise((resolve,reject)=>{
        const doOnLoad = () => {
            if (!supportLoad && !timeID && /complete|loaded/.test(script.readyState)) {
                timeID = setTimeout(doOnLoad);
                return;
            }
            if (supportLoad || timeID) {
                clearTimeout(timeID);
                resolve();
            }
            reject();
        };
        script[onEvent] = doOnLoad;
    });

    script.src = url;

    return resultPromise;
};

export default scriptLoader;