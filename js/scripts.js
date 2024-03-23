export const api = async (urlApi, method = "GET", data = null) => {
    const options = {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    };
    const getItem = localStorage.getItem('token');
    const localhost = "http://localhost:3000/pub/v2";
    console.log(getItem);
    if (getItem) {
        options.headers.Authorization = `Bearer ${getItem}`;
    }
    if (data) {
        options.body = JSON.stringify(data);
    }
    options.method = method;
    console.log(JSON.stringify(options), "<datanya");
    const res = await fetch(localhost + urlApi, options);
    console.log(res);
    return await res.json();
}

