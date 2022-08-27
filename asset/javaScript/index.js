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

        showCancelButton: true,
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
            console.log(obj['Financial Condition'])
            Swal.fire({
                title: 'edit Data !',
                html:
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">ObjID</span></div><input id="exObjID" type="text" class="form-control" placeholder="exObjID" aria-label="exObjID" aria-describedby="exObjID" value="' + obj['_id'] + '" disabled></div>' +
                    '<div class="input-group mb-3"><label class="input-group-text" for="exFinancialCondition">Financial Condition Level</label><select class="form-select" id="exFinancialCondition" value="' + obj['Financial Condition'] + '"><option selected disabled>Choose...</option><option value="Poor">Poor</option><option value="Mid">Mid</option><option value="Rich">Rich</option></select></div>' +
                    '<div class="input-group mb-3"><label class="input-group-text" for="exEducationLevel">Education Level</label><select class="form-select" id="exEducationLevel"><option selected disabled>Choose...</option><option value="University">University</option><option value="College">College</option><option value="School">School</option></select></div>' +
                    '<div class="input-group mb-3"><label class="input-group-text" for="exInstitutionType">Institution Type</label><select class="form-select" id="exInstitutionType"><option selected disabled>Choose...</option><option value="Public">Public</option><option value="Private">Private</option></select></div>' +
                    '<div class="input-group mb-3"><label class="input-group-text" for="exGender">Gender</label><select class="form-select" id="exGender"><option selected disabled>Choose...</option><option value="Female">Female</option><option value="Male">Male</option></select></div>' +
                    '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Age</span></div><input id="exAge" type="text" class="form-control" placeholder="Age" aria-label="Age" aria-describedby="Age"></div>' +
                    '<div class="input-group mb-3"><label class="input-group-text" for="exdevice">Device</label><select class="form-select" id="exdevice"><option selected disabled>Choose...</option><option value="Tab">Tab</option><option value="Mobile">Mobile</option><option value="Computer">Computer</option></select></div>' +
                    '<div class="input-group mb-3"><label class="input-group-text" for="exIT_Student">IT Student</label><select class="form-select" id="exIT_Student"><option selected disabled>Choose...</option><option value="Yes">Yes</option><option value="No">No</option></select></div>' +
                    '<div class="input-group mb-3"><label class="input-group-text" for="exlocation">location</label><select class="form-select" id="exlocation"><option selected disabled>Choose...</option><option value="Town">Town</option><option value="Rural">Rural</option></select></div>' +
                    '<div class="input-group mb-3"><label class="input-group-text" for="exInternetType">InternetType Level</label><select class="form-select" id="exInternetType"><option selected disabled>Choose...</option><option value="2G">2G</option><option value="3G">3G</option><option value="4G">4G</option><option value="5G">5G</option></select></div>' +
                    '<div class="input-group mb-3"><label class="input-group-text" for="exNetworkType">Network Type</label><select class="form-select" id="exNetworkType"><option selected disabled>Choose...</option><option value="Wifi">Wifi</option><option value="Mobile Data">Mobile Data</option></select></div>' +
                    '<div class="input-group mb-3"><label class="input-group-text" for="exFlexibilityLevel">Flexibility Level</label><select class="form-select" id="exFlexibilityLevel"><option selected disabled>Choose...</option><option value="Low">Low</option><option value="High">High</option><option value="Moderate">Moderate</option></select></div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Edit',
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

    console.log(JSON.stringify({
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
    if (search == "") {
        window.location.reload();
    } else {
        xhttp.open("GET", "http://localhost:3000/StudentFlex/search/" + search);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var object = JSON.parse(this.responseText);
                var table = document.getElementById("mytable");
                var num = 1;
                var TableData = '';
                table.innerHTML = "";
                for (obj of object) {
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
                console.log(TableData);
                document.getElementById("mytable").innerHTML = TableData;
            }
        }
    }
}