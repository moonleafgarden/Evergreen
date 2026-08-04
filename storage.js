/* ===========================
   STORAGE
=========================== */

function save(key, value){

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

}

function load(key, defaultValue){

    const data =
    localStorage.getItem(key);

    if(data){

        return JSON.parse(data);

    }

    return defaultValue;

}
