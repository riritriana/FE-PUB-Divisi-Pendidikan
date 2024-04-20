import { api, isLogin } from "../../scripts.js";
isLogin();

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
        option.value = val.hari;
        option.innerHTML = val.hari;
        option.style.textAlign = "center";
        // option.style.color = "-webkit-linear-gradient(315deg, #1e30f3 0%, #e21e80 100%)";
        document.querySelector("#hari").appendChild(option);
    });
    const jam = await api("/get-jam");
    jam.data.forEach(val => {
        const option = document.createElement("option");
        option.value = val.jam;
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
        id_categori_pelatihan: document.add_nilai.categori_pelatihan.value,
        id_pelatihan_instruktur: document.add_nilai.instruktur.value,
        jam: document.add_nilai.jam.value,
        hari: document.add_nilai.hari.value
    });
    document.querySelector("#tambah").style.display = "none";

    alert(data.msg);

}


const getJadwal = async () => {
    const kumpulanData = await api("/get-jadwal-pembina");
    kumpulanData.data.jadwal.forEach(data => {
        console.log(data);
        const table = document.createElement("table");
        table.classList.add("table");
        table.setAttribute("border", "1");
        table.setAttribute("style", "background: -webkit-linear-gradient(315deg, #1e30f3 0%, #e21e80 100%); color: #fff;");

        // Buat elemen thead
        const thead = document.createElement("thead");
        thead.classList.add("thead-dark");

        // Buat baris pertama thead
        const firstRow = document.createElement("tr");
        const firstRowHeader = document.createElement("th");
        firstRowHeader.setAttribute("scope", "col");
        firstRowHeader.setAttribute("colspan", "6");
        firstRowHeader.setAttribute("style", "vertical-align: middle; text-align: center;");
        firstRowHeader.textContent = `Pelatihan ${data.categori_pelatihan.name} (${data.name}) `;
        firstRow.appendChild(firstRowHeader);
        thead.appendChild(firstRow);

        // Buat baris kedua thead
        const secondRow = document.createElement("tr");
        const instrukturHeader = document.createElement("th");
        instrukturHeader.setAttribute("colspan", "3");
        instrukturHeader.setAttribute("style", "vertical-align: middle; text-align: center;");
        instrukturHeader.textContent = "Instruktur " + data.categori_pelatihan.name;
        secondRow.appendChild(instrukturHeader);
        const anggotaHeader = document.createElement("th");
        anggotaHeader.setAttribute("colspan", "3");
        anggotaHeader.setAttribute("style", "vertical-align: middle; text-align: center;");
        anggotaHeader.textContent = data.user.nama;
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
        data.kumpulan_anggota.forEach((anggota, index) => {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.setAttribute("colspan", "3");
            td.setAttribute("style", "vertical-align: middle; text-align: center;");
            td.textContent = anggota.user.nama;
            tr.appendChild(td);
            if (index === 0) {
                const td2 = document.createElement("td");
                td2.setAttribute("rowspan", data.kumpulan_anggota.length);
                td2.setAttribute("colspan", "3");
                td2.setAttribute("style", "vertical-align: middle; text-align: center;");
                td2.textContent = data.jadwal_pelatihan.hari + " / " + data.jadwal_pelatihan.jam;
                tr.appendChild(td2);
            }

            tbody.appendChild(tr);

        });


        table.appendChild(tbody);
        document.querySelector("#table").appendChild(table);

    })

}

getJadwal();