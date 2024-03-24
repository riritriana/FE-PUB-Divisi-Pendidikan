const getItem = localStorage.getItem('token');
const localhost = "http://localhost:3000/pub/v2";

export const api = async (urlApi, method = "GET", data = null) => {
    const options = {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    };
    if (getItem) {
        options.headers.Authorization = `Bearer ${getItem}`;
    }
    if (data) {
        options.body = JSON.stringify(data);
    }
    options.method = method;
    const res = await fetch(localhost + urlApi, options);
    return await res.json();
}

export const isLogin = async () => {
    if (getItem) {
        const user = await api("/me");
        if (user.role === "anggota") {
            location.href = "./pages/pengguna/"
        } else if (user.role === "pendidikan") {
            location.href = "./pages/divisi/"
        } else {
            location.href = "./pages/pembina/"
        }
    }
}
