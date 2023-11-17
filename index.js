document.addEventListener("DOMContentLoaded", function () {
    const moduleSelect = document.getElementById("module");
    const headquarterSelect = document.getElementById("headquarter");
    const specialtySelect = document.getElementById("specialty");
    const epsTable = document.getElementById("epsTable");


    const disabledOptionModule = document.createElement("option");
    disabledOptionModule.value = "";
    disabledOptionModule.text = "Select Module";
    disabledOptionModule.disabled = true;
    disabledOptionModule.selected = true;
    moduleSelect.add(disabledOptionModule);

    moduleSelect.addEventListener("change", function () {
        const selectedModule = moduleSelect.value;
        if (!selectedModule) return;

        const url = `https://apicsddev.nelumbo.com.co/api/eps_list?module=${selectedModule}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(headquarterSelect);
                if (headquarterSelect) {
                    headquarterSelect.innerHTML = "";
                    specialtySelect.innerHTML = "";
                    epsTable.innerHTML = "";
                }
                // Agregar opción deshabilitada para headquarter
                const disabledOptionHeadquarter = document.createElement("option");
                disabledOptionHeadquarter.value = "";
                disabledOptionHeadquarter.text = "Select Headquarter";
                disabledOptionHeadquarter.disabled = true;
                disabledOptionHeadquarter.selected = true;
                headquarterSelect.add(disabledOptionHeadquarter);

                // Llenar el select de headquarter
                data.data.headquarters.forEach(headquarter => {
                    const option = document.createElement("option");
                    option.value = headquarter.headquarter.id;
                    option.textContent = headquarter.headquarter.name;
                    headquarterSelect.appendChild(option);
                });

                // Evento para el cambio en headquarter
                headquarterSelect.addEventListener("change", function () {
                    const selectedHeadquarterId = headquarterSelect.value;
                    if (!selectedHeadquarterId) return;

                    const headquarterUrl = `https://apicsddev.nelumbo.com.co/api/eps_list?module=${selectedModule}&headquarter=${selectedHeadquarterId}`;
                    fetch(headquarterUrl)
                        .then(response => response.json())
                        .then(data => {
                            const disabledOptionSpecialty = document.createElement("option");
                            disabledOptionSpecialty.value = "";
                            disabledOptionSpecialty.text = "Select Specialty";
                            disabledOptionSpecialty.disabled = true;
                            disabledOptionSpecialty.selected = true;
                            specialtySelect.add(disabledOptionSpecialty);

                            data.data.specialties.forEach(specialty => {
                                console.log(specialty);
                                const option = document.createElement("option");
                                option.value = specialty.specialty.id;
                                option.textContent = specialty.specialty.name;
                                specialtySelect.appendChild(option);
                            });


                            specialtySelect.addEventListener("change", function () {
                                const selectedSpecialtyId = specialtySelect.value;
                                if (!selectedSpecialtyId) return;

                                const specialtyUrl = `https://apicsddev.nelumbo.com.co/api/eps_list?module=${selectedModule}&headquarter=${selectedHeadquarterId}&specialty=${selectedSpecialtyId}`;
                                fetch(specialtyUrl)

                                    .then(response => response.json())

                                    .then(data => {
                                        const epsTable = document.getElementById("epsTable");
                                        const tableHeader = epsTable.querySelector("th");


                                        epsTable.innerHTML = "";


                                        const headerRow = epsTable.insertRow(0);
                                        const headerCell1 = headerRow.insertCell(0);
                                        const headerCell2 = headerRow.insertCell(1);
                                        headerCell1.textContent = "Eps";
                                        headerCell2.textContent = "Categoria";

                                        data.data.eps_list.forEach(eps => {
                                            const row = epsTable.insertRow();
                                            const cell1 = row.insertCell(0);
                                            const cell2 = row.insertCell(1);
                                            cell1.textContent = eps.eps.name;
                                            cell2.textContent = eps.eps.category;
                                        });
                                    })
                                    .catch(error => console.error("Error al obtener datos de eps_list:", error));
                            });
                        })
                        .catch(error => console.error("Error al obtener datos de especialidades:", error));
                });

            })
            .catch(error => console.error("Error al obtener datos:", error));
    });
});