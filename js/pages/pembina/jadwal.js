import { api, isLogin } from "../../scripts.js";
// isLogin();

document.querySelector("#button-tambah").onclick = async () => {
    document.querySelector("#tambah").style.display = "block"
    const categori = await api("/get-categori");
    categori.data.forEach(val => {
        const option = document.createElement("option");
        option.value = val.id;
        option.innerHTML = val.name;
        option.style.textAlign = "center";
        // option.style.color = "-webkit-linear-gradient(315deg, #1e30f3 0%, #e21e80 100%)";
        document.querySelector("#jenis-nilai").appendChild(option);
    });

    const hari = await api("/get-hari");
    hari.data.forEach(val => {
        const option = document.createElement("option");
        option.value = val.id;
        option.innerHTML = val.hari;
        option.style.textAlign = "center";
        // option.style.color = "-webkit-linear-gradient(315deg, #1e30f3 0%, #e21e80 100%)";
        document.querySelector("#hari").appendChild(option);
    });
    const jam = await api("/get-jam");
    jam.data.forEach(val => {
        const option = document.createElement("option");
        option.value = val.id;
        option.innerHTML = val.jam;
        option.style.textAlign = "center";
        // option.style.color = "-webkit-linear-gradient(315deg, #1e30f3 0%, #e21e80 100%)";
        document.querySelector("#jam").appendChild(option);
    });
    const instruktur = await api("/get-instruktur");
    instruktur.data.forEach(val => {
        const option = document.createElement("option");
        option.value = val.id;
        option.innerHTML = val.nama;
        option.style.textAlign = "center";
        // option.style.color = "-webkit-linear-gradient(315deg, #1e30f3 0%, #e21e80 100%)";
        document.querySelector("#instruktur").appendChild(option);
    });
};

document.querySelector("#silang-1").onclick = () => document.querySelector("#tambah").style.display = "none";
document.querySelector(".edit").onclick = () => document.querySelector("#edit-1").style.display = "block";
document.querySelector("#silang-2").onclick = () => document.querySelector("#edit-1").style.display = "none";


document.add_nilai.onsubmit = async (e) => {
    e.preventDefault();
    const data = await api("/add-pelatihan", "POST", {
        name: document.add_nilai.name.value,
        id_categori_pelatihan: document.categori_pelatihan.name.value,
        jam: document.jam.value,
        hari: document.hari.value
    });
}