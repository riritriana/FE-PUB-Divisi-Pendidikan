import { api, isLogin } from "./scripts.js";
// isLogin();

const form = document.querySelector("#contactForm");
const caption = document.querySelector("#caption");
const silang = document.querySelector("#silang");
caption.style.display = "none";

form.onsubmit = async (e) => {
    e.preventDefault();
    const username = document.querySelector("#name").value;
    const password = document.querySelector("#email").value;
    const data = {
        username,
        password
    };
    api("/login", "POST", data)
        .then(async (data) => {
            if (data.success) {
                localStorage.setItem("token", data.data);
                const user = await api("/me");
                if (user.role === "anggota") {
                    location.href = "./pages/pengguna/"
                } else if (user.role === "pendidikan") {
                    location.href = "./pages/divisi/"
                } else {
                    location.href = "./pages/pembina/"
                }
            } else {
                caption.style.display = "block";
                document.querySelector("#caption-text").innerHTML = data.msg
            }

        })
        .catch(error => {
            console.error("Error :==>> ", error);
        });
};

silang.addEventListener("click", () => {
    document.body.style.overflowY = "auto";
    caption.style.display = "none";
})
