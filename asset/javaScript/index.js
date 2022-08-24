google.charts.load('current', {
    'packages': ['corechart', 'bar']
});
google.charts.setOnLoadCallback(loadTable);

function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/StudentFlex");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const object = JSON.parse(this.responseText);
            var num = 1;
            var TableData = '';
            for (let obj of object) {
                TableData += '<tr>';
                TableData += '<td>' + num + '</td>';
                TableData += '<td>' + obj['Flexibility Level'] + '</td>';
                TableData += '<td>' + obj["Education Level"] + '</td>';
                TableData += '<td>' + obj["Institution Type"] + '</td>';
                TableData += '<td>' + obj["Gender"] + '</td>';
                TableData += '<td>' + obj["Age"] + '</td>';
                TableData += '<td>' + obj["Device"] + '</td>';
                TableData += '<td>' + obj["IT Student"] + '</td>';
                TableData += '<td>' + obj["Location"] + '</td>';
                TableData += '<td>' + obj["Financial Condition"] + '</td>';
                TableData += '<td>' + obj["Internet Type"] + '</td>';
                TableData += '<td>' + obj["Network Type"] + '</td>';
                TableData += `<td><a type="button" class="btn btn-outline-secondary" onclick="showEdit('` + obj._id + `')"><i class="fas fa-edit"></i></a>`;
                TableData += `<a type="button" class="btn btn-outline-danger" onclick="ShowDelete('` + obj._id + `')"><i class="fas fa-trash"></i></a></td>`;
                TableData += '</tr>';
                num++;
            }
            document.getElementById("mytable").innerHTML = TableData;
            // wait 2 seconds and then load the graph
            setTimeout(loadGraph, 2000);
            tablePlugin();

        }
    }
}

async function loadGraph() {
    var total = 0;

    var FlexLow = 0;
    var fxLowUniversity = 0;
    var fxLowCollege = 0;
    var fxLowSchool = 0;

    var FlexHigh = 0;
    var fxHighUniversity = 0;
    var fxHighCollege = 0;
    var fxHighSchool = 0;

    var FlexModerate = 0;
    var fxModerateUniversity = 0;
    var fxModerateCollege = 0;
    var fxModerateSchool = 0;

    var University = 0;
    var College = 0;
    var School = 0;
    var Other = 0

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/StudentFlex");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const object = JSON.parse(this.responseText);
            for (let obj of object) {
                total++;
                if (obj['Flexibility Level'] == "Low") {
                    FlexLow++;
                    if (obj["Education Level"] == "University") {
                        fxLowUniversity++;
                    } else if (obj["Education Level"] == "College") {
                        fxLowCollege++;
                    } else if (obj["Education Level"] == "School") {
                        fxLowSchool++;
                    }
                } else if (obj['Flexibility Level'] == "High") {
                    FlexHigh++;
                    if (obj["Education Level"] == "University") {
                        fxHighUniversity++;
                    } else if (obj["Education Level"] == "College") {
                        fxHighCollege++;
                    } else if (obj["Education Level"] == "School") {
                        fxHighSchool++;
                    }
                } else if (obj['Flexibility Level'] == "Moderate") {
                    FlexModerate++;
                    if (obj["Education Level"] == "University") {
                        fxModerateUniversity++;
                    } else if (obj["Education Level"] == "College") {
                        fxModerateCollege++;
                    } else if (obj["Education Level"] == "School") {
                        fxModerateSchool++;
                    }
                }
            }
            University = fxLowUniversity + fxHighUniversity + fxModerateUniversity;
            College = fxLowCollege + fxHighCollege + fxModerateCollege;
            School = fxLowSchool + fxHighSchool + fxModerateSchool;
            Other = total - University - College - School;

            drawChart1(FlexLow, FlexHigh, FlexModerate);
            drawChart2(University, College, School, FlexLow, FlexHigh, FlexModerate, fxLowUniversity, fxLowCollege, fxLowSchool, fxHighUniversity, fxHighCollege, fxHighSchool, fxModerateUniversity, fxModerateCollege, fxModerateSchool);

            function drawChart1(FlexLow, FlexHigh, FlexModerate) {
                var data = google.visualization.arrayToDataTable([
                    ['Flexibility Level', 'Number of Students'],
                    ['Low', FlexLow],
                    ['High', FlexHigh],
                    ['Moderate', FlexModerate]
                ]);

                var options = {
                    title: 'Flexibility Level by education level',
                    is3D: true,
                    pieSliceText: 'value',
                };

                var chart = new google.visualization.PieChart(document.getElementById('chart1'));
                chart.draw(data, options);
            }

            function drawChart2(University, College, School, FlexLow, FlexHigh, FlexModerate, fxLowUniversity, fxLowCollege, fxLowSchool, fxHighUniversity, fxHighCollege, fxHighSchool, fxModerateUniversity, fxModerateCollege, fxModerateSchool) {
                var data = google.visualization.arrayToDataTable([
                    ['Education Level', 'Flexible Low', 'Flexible Moderate', 'Flexible High'],
                    ['University', fxLowUniversity, fxModerateUniversity, fxHighUniversity],
                    ['College', fxLowCollege, fxModerateCollege, fxHighCollege],
                    ['School', fxLowSchool, fxModerateSchool, fxHighSchool]
                ]);

                var options = {
                    title: 'Education Level'
                };

                var chart = new google.visualization.BarChart(document.getElementById('chart2'));
                chart.draw(data, options);
            }
        }
    }
}



function showCreate() {
    Swal.fire({
        title: 'new Data',
        html:
            '<div class="input-group mb-3"><label class="input-group-text" for="FinancialCondition">Financial Condition Level</label><select class="form-select" id="FinancialCondition"><option selected disabled>Choose...</option><option value="Poor">Poor</option><option value="Mid">Mid</option><option value="Rich">Rich</option></select></div>' +
            '<div class="input-group mb-3"><label class="input-group-text" for="EducationLevel">Education Level</label><select class="form-select" id="EducationLevel"><option selected disabled>Choose...</option><option value="University">University</option><option value="College">College</option><option value="School">School</option></select></div>' +
            '<div class="input-group mb-3"><label class="input-group-text" for="InstitutionType">Institution Type</label><select class="form-select" id="InstitutionType"><option selected disabled>Choose...</option><option value="Public">Public</option><option value="Private">Private</option></select></div>' +
            '<div class="input-group mb-3"><label class="input-group-text" for="Gender">Gender</label><select class="form-select" id="Gender"><option selected disabled>Choose...</option><option value="Female">Female</option><option value="Male">Male</option></select></div>' +
            '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Age</span></div><input id="Age" type="text" class="form-control" placeholder="Age" aria-label="Age" aria-describedby="Age"></div>' +
            '<div class="input-group mb-3"><label class="input-group-text" for="device">Device</label><select class="form-select" id="device"><option selected disabled>Choose...</option><option value="Tab">Tab</option><option value="Mobile">Mobile</option><option value="Computer">Computer</option></select></div>' +
            '<div class="input-group mb-3"><label class="input-group-text" for="IT_Student">IT Student</label><select class="form-select" id="IT_Student"><option selected disabled>Choose...</option><option value="Yes">Yes</option><option value="No">No</option></select></div>' +
            '<div class="input-group mb-3"><label class="input-group-text" for="location">location</label><select class="form-select" id="location"><option selected disabled>Choose...</option><option value="Town">Town</option><option value="Rural">Rural</option></select></div>' +
            '<div class="input-group mb-3"><label class="input-group-text" for="FinancialCondition">Financial Condition Level</label><select class="form-select" id="FinancialCondition"><option selected disabled>Choose...</option><option value="Poor">Poor</option><option value="Mid">Mid</option><option value="Rich">Rich</option></select></div>' +
            '<div class="input-group mb-3"><label class="input-group-text" for="InternetType">InternetType Level</label><select class="form-select" id="InternetType"><option selected disabled>Choose...</option><option value="2G">2G</option><option value="3G">3G</option><option value="4G">4G</option><option value="5G">5G</option></select></div>' +
            '<div class="input-group mb-3"><label class="input-group-text" for="NetworkType">Network Type</label><select class="form-select" id="NetworkType"><option selected disabled>Choose...</option><option value="Wifi">Wifi</option><option value="Mobile Data">Mobile Data</option></select></div>' +
            '<div class="input-group mb-3"><label class="input-group-text" for="FlexibilityLevel">Flexibility Level</label><select class="form-select" id="FlexibilityLevel"><option selected disabled>Choose...</option><option value="Low">Low</option><option value="High">High</option><option value="Moderate">Moderate</option></select></div>',

        // '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Education Level</span></div><input id="EducationLevel" type="text" class="form-control" placeholder="EducationLevel" aria-label="EducationLevel" aria-describedby="EducationLevel"></div>' +
        // '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Institution Type</span></div><input id="InstitutionType" type="text" class="form-control" placeholder="Institution Type" aria-label="Institution Type" aria-describedby="Institution Type"></div>' +
        // '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Gender</span></div><input id="Gender" type="text" class="form-control" placeholder="Gender" aria-label="Gender" aria-describedby="Gender"></div>' +
        // '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Age</span></div><input id="Age" type="text" class="form-control" placeholder="Age" aria-label="Age" aria-describedby="Age"></div>' +
        // '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Device</span></div><input id="device" type="text" class="form-control" placeholder="device" aria-label="device" aria-describedby="device"></div>' +
        // '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">IT_Student</span></div><input id="IT_Student" type="text" class="form-control" placeholder="IT_Student" aria-label="IT_Student" aria-describedby="IT_Student"></div>' +
        // '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Location</span></div><input id="location" type="text" class="form-control" placeholder="location" aria-label="location" aria-describedby="location"></div>' +

        // '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Financial Condition</span></div><input id="FinancialCondition" type="text" class="form-control" placeholder="FinancialCondition" aria-label="FinancialCondition" aria-describedby="FinancialCondition"></div>' +
        // '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Internet Type</span></div><input id="InternetType" type="text" class="form-control" placeholder="InternetType" aria-label="InternetType" aria-describedby="InternetType"></div>' +
        // '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Network Type</span></div><input id="NetworkType" type="text" class="form-control" placeholder="NetworkType" aria-label="NetworkType" aria-describedby="NetworkType"></div>' +
        // '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Flexibility Level</span></div><input id="FlexibilityLevel" "type="text" class="form-control" placeholder="FlexibilityLevel" aria-label="FlexibilityLevel" aria-describedby="FlexibilityLevel"></div>',

        focusConfirm: false,
        preConfirm: () => {
            DataInsertCreate();
        }
    })
}




function DataInsertCreate() {
    var EducationLevel = $('#EducationLevel').val();
    var InstitutionType = $('#InstitutionType').val();
    var Gender = $('#Gender').val();
    var Age = $('#Age').val();
    var device = $('#device').val();
    var IT_Student = $('#IT_Student').val();
    var location = $('#location').val();
    var FinancialCondition = $('#FinancialCondition').val();
    var InternetType = $('#InternetType').val();
    var NetworkType = $('#NetworkType').val();
    var FlexibilityLevel = $('#FlexibilityLevel').val();

    // console.log(JSON.stringify({

    //     "EducationLevel": EducationLevel,
    //     "InstitutionType": InstitutionType,
    //     "Gender": Gender,
    //     "Age": Age,
    //     "device": device,
    //     "IT_Student": IT_Student,
    //     "location": location,
    //     "FinancialCondition": FinancialCondition,
    //     "InternetType": InternetType,
    //     "NetworkType": NetworkType,
    //     "FlexibilityLevel": FlexibilityLevel

    // }))

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/StudentFlex/create");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        "EducationLevel": EducationLevel,
        "InstitutionType": InstitutionType,
        "Gender": Gender,
        "Age": Age,
        "device": device,
        "IT_Student": IT_Student,
        "location": location,
        "FinancialCondition": FinancialCondition,
        "InternetType": InternetType,
        "NetworkType": NetworkType,
        "FlexibilityLevel": FlexibilityLevel
    }));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                html: 'Page will reload in <b></b> milliseconds.',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    location.reload();
                }
            })
        }
    }
}


function showEdit(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/StudentFlex/" + id);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            console.log(obj);
            Swal.fire({
                title: 'edit Data !',
                html:
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">exObjID</span></div>' +
                    '<input id="exObjID" type="text" class="form-control" placeholder="exObjID" aria-label="exObjID" aria-describedby="EducationLevel" readonly value="' + obj['_id'] + '"></div>' +
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Education Level</span></div>' +
                    '<input id="exEducationLevel" type="text" class="form-control" placeholder="EducationLevel" aria-label="EducationLevel" aria-describedby="EducationLevel" value="' + obj['Education Level'] + '"></div>' +
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Institution Type</span></div>' +
                    '<input id="exInstitutionType" type="text" class="form-control" placeholder="Institution Type" aria-label="Institution Type" aria-describedby="Institution Type" value="' + obj['Institution Type'] + '"></div>' +
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Gender</span></div>' +
                    '<input id="exGender" type="text" class="form-control" placeholder="Gender" aria-label="Gender" aria-describedby="Gender" value="' + obj['Gender'] + '"></div>' +
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Age</span></div>' +
                    '<input id="exAge" type="text" class="form-control" placeholder="Age" aria-label="Age" aria-describedby="Age" value="' + obj['Age'] + '"></div>' +
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Device</span></div>' +
                    '<input id="exdevice" type="text" class="form-control" placeholder="device" aria-label="device" aria-describedby="device" value="' + obj['Device'] + '"></div>' +
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">IT_Student</span></div>' +
                    '<input id="exIT_Student" type="text" class="form-control" placeholder="IT_Student" aria-label="IT_Student" aria-describedby="IT_Student" value="' + obj['IT Student'] + '"></div>' +
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Location</span></div>' +
                    '<input id="exlocation" type="text" class="form-control" placeholder="location" aria-label="location" aria-describedby="location" value="' + obj['Location'] + '"></div>' +
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Financial Condition</span></div>' +
                    '<input id="exFinancialCondition" type="text" class="form-control" placeholder="FinancialCondition" aria-label="FinancialCondition" aria-describedby="FinancialCondition" value="' + obj['Financial Condition'] + '"></div>' +
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Internet Type</span></div>' +
                    '<input id="exInternetType" type="text" class="form-control" placeholder="InternetType" aria-label="InternetType" aria-describedby="InternetType" value="' + obj['Internet Type'] + '"></div>' +
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Network Type</span></div>' +
                    '<input id="exNetworkType" type="text" class="form-control" placeholder="NetworkType" aria-label="NetworkType" aria-describedby="NetworkType" value="' + obj['Network Type'] + '"></div>' +
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Flexibility Level</span></div>' +
                    '<input id="exFlexibilityLevel" "type="text" class="form-control" placeholder="FlexibilityLevel" aria-label="FlexibilityLevel" aria-describedby="FlexibilityLevel" value="' + obj['Flexibility Level'] + '"></div>',
                focusConfirm: false,
                preConfirm: () => {
                    UpdateData();
                }
            })
        }
    }
}


function UpdateData() {
    var id = document.getElementById("exObjID").value;
    var exEducationLevel = document.getElementById("exEducationLevel").value;
    var exInstitutionType = document.getElementById("exInstitutionType").value;
    var exGender = document.getElementById("exGender").value;
    var exAge = document.getElementById("exAge").value;
    var exdevice = document.getElementById("exdevice").value;
    var exIT_Student = document.getElementById("exIT_Student").value;
    var exlocation = document.getElementById("exlocation").value;
    var exFinancialCondition = document.getElementById("exFinancialCondition").value;
    var exInternetType = document.getElementById("exInternetType").value;
    var exNetworkType = document.getElementById("exNetworkType").value;
    var exFlexibilityLevel = document.getElementById("exFlexibilityLevel").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:3000/StudentFlex/update");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        "_id": id,
        "EducationLevel": exEducationLevel,
        "InstitutionType": exInstitutionType,
        "Gender": exGender,
        "Age": exAge,
        "device": exdevice,
        "IT_Student": exIT_Student,
        "location": exlocation,
        "FinancialCondition": exFinancialCondition,
        "InternetType": exInternetType,
        "NetworkType": exNetworkType,
        "FlexibilityLevel": exFlexibilityLevel
    }));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Updated Successfully',
                html: 'Page will reload in <b></b> milliseconds.',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    location.reload();
                }
            })
        }
    }
}


function ShowDelete(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: "Let's me think."
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Are you sure?',
                text: "This will delete the record permanently.",
                icon: 'error',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'No justkidding',
                cancelButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (!(result.isConfirmed)) {
                    const xhttp = new XMLHttpRequest();
                    xhttp.open("DELETE", "http://localhost:3000/StudentFlex/delete");
                    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    xhttp.send(JSON.stringify({
                        "_id": id
                    }));
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Deleted Successfully',
                                html: 'Page will reload in <b></b> milliseconds.',
                                timer: 2000,
                                timerProgressBar: true,
                                didOpen: () => {
                                    Swal.showLoading()
                                    const b = Swal.getHtmlContainer().querySelector('b')
                                    timerInterval = setInterval(() => {
                                        b.textContent = Swal.getTimerLeft()
                                    }, 100)
                                },
                                willClose: () => {
                                    clearInterval(timerInterval)
                                }
                            }).then((result) => {
                                if (result.dismiss === Swal.DismissReason.timer) {
                                    location.reload();
                                }
                            })
                        }
                    }
                }
            })
        }
    })
}


function searchEngine() {
    document.getElementById("mytable").innerHTML = "<tr><th scope=\"row\" colspan=\"5\">Loading...</th></tr>";
    var search = document.getElementById("searchTextBox").value;
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/StudentFlex/search/" + search);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var object = JSON.parse(this.responseText);
            var table = document.getElementById("mytable");
            var num = 1;
            var TableData = '';
            table.innerHTML = "";
            for (obj of object){
                TableData += '<tr>';
                TableData += '<td>' + num + '</td>';
                TableData += '<td>' + obj['Flexibility Level'] + '</td>';
                TableData += '<td>' + obj["Education Level"] + '</td>';
                TableData += '<td>' + obj["Institution Type"] + '</td>';
                TableData += '<td>' + obj["Gender"] + '</td>'   ;
                TableData += '<td>' + obj["Age"] + '</td>';
                TableData += '<td>' + obj["Device"] + '</td>';
                TableData += '<td>' + obj["IT Student"] + '</td>';
                TableData += '<td>' + obj["Location"] + '</td>';
                TableData += '<td>' + obj["Financial Condition"] + '</td>';
                TableData += '<td>' + obj["Internet Type"] + '</td>';
                TableData += '<td>' + obj["Network Type"] + '</td>';
                TableData += `<td><a type="button" class="btn btn-outline-secondary" onclick="showEdit('` + obj._id + `')"><i class="fas fa-edit"></i></a>`;
                TableData += `<a type="button" class="btn btn-outline-danger" onclick="ShowDelete('` + obj._id + `')"><i class="fas fa-trash"></i></a></td>`;
                TableData += '</tr>';
                num++;
            }
            console.log(TableData);
            document.getElementById("mytable").innerHTML = TableData;
        }
    }
}