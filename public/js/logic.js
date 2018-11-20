$(document).ready(function () {

    //native constructor to get current date and time zone
    Date.prototype.toDateInputValue = (function () {

        let local = new Date(this);

        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());

        return local.toJSON().slice(0, 10);

    });

    //correct date is then assigned to the corresponding field
    $("#expDate").val(new Date().toDateInputValue());

    $("#inputGroupSelect01").change(() => {
        //console.log($("#inputGroupSelect01").val());
        let accType = $("#inputGroupSelect01").val();
        let target1 = $("#statementDate");
        let target2 = $("#dueDate");
        //Target clean
        target1.empty();
        target2.empty();

        if (accType == "credit") {
            //target to append the divs

            //div creation
            let statementDiv = $('<div class="input-group-prepend">');
            let statementSpan = $('<span class="input-group-text" id="inputGroup-sizing-default">');
            statementSpan.text("Statement Date");
            let statementInput = $('<input id="statDate" class="calendar form-control" type="text" placeholder="Select Date.." readonly="readonly">');

            //apending for target 1
            target1.append(statementDiv);
            statementDiv.append(statementSpan);
            target1.append(statementInput);

            //appending for target two with the text change
            let dueDiv = $('<div class="input-group-prepend">');
            let dueSpan = $('<span class="input-group-text" id="inputGroup-sizing-default">');
            dueSpan.text("Due Date");
            let dueInput = $('<input id="dueD" class="calendar form-control" type="text" placeholder="Select Date.." readonly="readonly">');
            target2.append(dueDiv);
            dueDiv.append(dueSpan);
            target2.append(dueInput);

            $(".calendar").flatpickr({
                enableTime: false,
                dateFormat: "Y-m-d",
            });
        }
    });

    $("#createAcc").click(() => {
        event.preventDefault();
        const accName = $("#accNmae").val();
        const accType = $("#inputGroupSelect01").val();
        let statementDate = false;
        let dueDate = false;

        if (accType == "credit") {
            statementDate = $("#statDate").val();
            dueDate = $("#dueD").val();
        }

        //sent object
        let data = {
            accName,
            accType,
            statementDate,
            dueDate
        };

        console.log(data);
        let path = $(location).attr('pathname');
        let pathArr = path.split("/");
        let id = pathArr[3];
        console.log(id);

        //FALTA LA ROUTE CORRECTA!!!!!!!
        $.ajax("/api/accounts/" + id, {
            type: "POST",
            data
        }).then(() => {
            console.log("created new Financial Account");

            location.reload();
        });
    });

    $("#i-close").click((ev) => {
        //console.log(ev.currentTarget.dataset.id);
        let id = ev.currentTarget.dataset.id;
        $.ajax("/api/accounts/" + id, {
            type: "DELETE"
        }).then(() => {
            location.reload();
        });
    });


    $("#submitLog").on("click", function (event) {

        event.preventDefault();

        console.log("log in sub clicked");

        let oldEmail = $("#emailLog").val().trim();
        let oldPass = $("#passwordLog").val().trim();

        if (oldEmail == "" || oldPass == "") {

            alert("Please fill out all fields.");

        } else {

            allUsers();

        }

        function allUsers() {

            $.get("/api/users", function (data) {

                console.log(data);

                let check = false;

                data.forEach(element => {

                    console.log(element);
                    console.log(check);

                    if (element.email === oldEmail && element.password === oldPass) {

                        check = true;

                    }

                });

                checkExis();

                function checkExis() {

                    if (check) {

                        console.log("logged in.");

                    } else {

                        alert("Email or password not found. Please retry.");

                    }

                }

            });

        }

    });

    $("#submitSign").on("click", function (event) {

        event.preventDefault();

        console.log("sign up sub clicked");

        let newName = $("#nameSign").val().trim();
        let newEmail = $("#emailSign").val().trim();
        let newPassword = $("#passwordSign").val().trim();

        if (newName == "" || newEmail == "" || newPassword == "") {

            alert("Please fill out fill all fields.");

        } else {

            let newUser = {

                name: newName,
                email: newEmail,
                password: newPassword

            }

            $.ajax({

                method: "POST",
                url: "/api/users",
                data: newUser

            }).then(function (result) {

                let userId = result.id;

                console.log("Signed up.");

                window.location.href = `/users/accounts/${userId}`;

            });

        }

    });

    $("#submitExp").on("click", function (event) {

        event.preventDefault();

        let expName = $("#expName").val().trim();
        let expSelect = $("#expSelect").val().trim();
        let expType = $("#expType").val().trim();
        let expAmount = $("#expAmount").val().trim();
        let expDate = $("#expDate").val().trim();

        let path = $(location).attr('pathname');
        let pathArr = path.split("/");
        let id = pathArr[3];
        console.log(id);

        if (expName == "" || expType == "" || expAmount == "") {

            alert("Please fill out fill all fields.");

        } else {

            console.log(`\n${expName}\n${expSelect}\n${expType}\n${expAmount}\n${expDate}\n`);

            let newExp = {

                expName: expName,
                finAccount: expSelect,
                expType: expType,
                expDate: expDate,
                expAmount: expAmount

            }

            $.ajax({

                method: "POST",
                url: "/api/expenses/" + id,
                data: newExp

            }).then(function (result) {

                console.log("expense added.")

            });

        }

    });

});