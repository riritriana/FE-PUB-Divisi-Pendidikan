import { api, isLogin } from "../../scripts.js";
isLogin()
const user = api("/me");
const getJadwal = async () => {

    const data = (await api("/get-jadwal", "POST", { id_user: (await user).id })).data;
    console.log(data);
    var table = document.createElement("table");
    table.classList.add("table");
    table.setAttribute("border", "1");
    table.setAttribute("style", "background: -webkit-linear-gradient(315deg, #1e30f3 0%, #e21e80 100%); color: #fff;");

    // Buat elemen thead
    var thead = document.createElement("thead");
    thead.classList.add("thead-dark");

    // Buat baris pertama thead
    var firstRow = document.createElement("tr");
    var firstRowHeader = document.createElement("th");
    firstRowHeader.setAttribute("scope", "col");
    firstRowHeader.setAttribute("colspan", "6");
    firstRowHeader.setAttribute("style", "vertical-align: middle; text-align: center;");
    firstRowHeader.textContent = `Pelatihan ${data.jadwal.categori_pelatihan.name} (${data.jadwal.name}) `;
    firstRow.appendChild(firstRowHeader);
    thead.appendChild(firstRow);

    // Buat baris kedua thead
    var secondRow = document.createElement("tr");
    var instrukturHeader = document.createElement("th");
    instrukturHeader.setAttribute("colspan", "3");
    instrukturHeader.setAttribute("style", "vertical-align: middle; text-align: center;");
    instrukturHeader.textContent = "Instruktur " + data.jadwal.categori_pelatihan.name;
    secondRow.appendChild(instrukturHeader);
    var anggotaHeader = document.createElement("th");
    anggotaHeader.setAttribute("colspan", "3");
    anggotaHeader.setAttribute("style", "vertical-align: middle; text-align: center;");
    anggotaHeader.textContent = data.jadwal.user.nama;
    secondRow.appendChild(anggotaHeader);
    thead.appendChild(secondRow);

    // Buat baris ketiga thead
    var thirdRow = document.createElement("tr");
    var anggotaTitle = document.createElement("th");
    anggotaTitle.setAttribute("colspan", "3");
    anggotaTitle.setAttribute("style", "vertical-align: middle; text-align: center;");
    anggotaTitle.textContent = "Anggota";
    thirdRow.appendChild(anggotaTitle);
    var jadwalTitle = document.createElement("th");
    jadwalTitle.setAttribute("colspan", "3");
    jadwalTitle.setAttribute("style", "vertical-align: middle; text-align: center;");
    jadwalTitle.textContent = "Jadwal Pelatihan";
    thirdRow.appendChild(jadwalTitle);
    thead.appendChild(thirdRow);

    // Masukkan thead ke dalam tabel
    table.appendChild(thead);
    var tbody = document.createElement("tbody");

    // Buat baris pertama data
    data.nama_anggota.forEach((anggota, index) => {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.setAttribute("colspan", "3");
        td.setAttribute("style", "vertical-align: middle; text-align: center;");
        td.textContent = anggota.user.nama;
        tr.appendChild(td);
        if (index === 0) {
            const td2 = document.createElement("td");
            td2.setAttribute("rowspan", data.nama_anggota.length);
            td2.setAttribute("colspan", "3");
            td2.setAttribute("style", "vertical-align: middle; text-align: center;");
            td2.textContent = data.jadwal.jadwal_pelatihan.hari + " / " + data.jadwal.jadwal_pelatihan.jam;
            tr.appendChild(td2);
        }

        tbody.appendChild(tr);

    });


    table.appendChild(tbody);
    document.querySelector("#table").appendChild(table);

}

document.querySelector("#keluar").onclick = ()=>{
    window.localStorage.clear(localStorage.getItem("token"));
    isLogin();
}



document.querySelector("#edit-pelatihan").onclick = ()=> {
    document.querySelector("#caption").style.display = "block";
}

const silang = document.querySelector("#silang");
silang.addEventListener("click", () => {
    caption.style.display = "none";
});
getJadwal();
