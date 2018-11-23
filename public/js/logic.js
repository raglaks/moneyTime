$(document).ready(function () {
    //native constructor to get current date and time zone
    Date.prototype.toDateInputValue = (function () {

        let local = new Date(this);

        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());

        return local.toJSON().slice(0, 10);

    });

    //correct date is then assigned to the corresponding field
    $("#expDate").val(new Date().toDateInputValue());
    function categ(){
        let catArrr = ["food & drink","shopping","transport","home","bill & fees","entertainment","car","travel","family","healthcare","education","groceries","gift","work","hobbies","beauty","other","sports"];
        catArrr.forEach(element => {
            let elem = "<option value=" + element + ">" + element + "</option>"
            $("#expType").append(elem);
        });
    };

    categ();
    
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

        let checkObj = {

            oldEmail: $("#emailLog").val().trim(),

            oldPass: $("#passwordLog").val().trim()

        }

        //if statement to check that both fields are not empty
        if (checkObj.oldEmail == "" || checkObj.oldPass == "") {

            let targ = $("#signLog");

            targ.empty();

            targ.text("Please fill out all fields.");

        } else {

            //if not then db check function for matching values is called
            checkEmail();

        }

        function checkEmail() {

            $.ajax({

                method: "POST",
                url: "/login/check/",
                data: checkObj

            }).then(function (data) {

                console.log(data);

                if (data === "USER NOT FOUND") {

                    let targ = $("#signLog");

                    targ.empty();

                    targ.text("User not found, please create an account.");

                } else if (data === "WRONG PASSWORD") {

                    let targ = $("#signLog");

                    targ.empty();

                    targ.text("Wrong password. Please retry.");

                } else {

                    console.log(data);

                    window.location.href = `/users/expenses/${data}`;

                }

            });

        }

    });

    $("#submitSign").on("click", function (event) {

        event.preventDefault();

        let checkObj = {

            newName: $("#nameSign").val().trim(),

            newEmail: $("#emailSign").val().trim(),

            newPass: $("#passwordSign").val().trim()

        }

        if (checkObj.newName == "" || checkObj.newEmail == "" || checkObj.newPass == "") {

            let targ = $("#signAlert");

            targ.empty();

            targ.text("Please fill out all fields.");

        } else {

            checkAll();

        }

        function checkAll() {

            $.ajax({

                method: "POST",
                url: "/signup/check/",
                data: checkObj

            }).then(function (data) {

                if (data === "USER ALREADY EXISTS. LOG IN INSTEAD.") {

                    let targ = $("#signAlert");

                    targ.empty();

                    targ.text("User already exists. Log in instead.");

                } else {

                    window.location.href = `/users/expenses/${data}`;

                }

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

            let targ = $("#expAlert");

            targ.empty();

            targ.text("Please fill out all fields.");

        } else {

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

                console.log(result);
                console.log("expense added.");

                $("#expName").val(" ");
                $("#expType").val(" ");
                $("#expAmount").val(" ");

                $("#expAlert").text("Successfully added!");

            });

        }

    });

    $("#expense").on("click", function (event) {

        let path = $(location).attr('pathname');
        let pathArr = path.split("/");
        let id = pathArr[3];

        if (id === undefined) {

            let targ = $("#signAlert");

            targ.empty();

            targ.text("Please create an account or log in to continue.");

            let targ1 = $("#signLog");

            targ1.empty();

            targ1.text("Please create an account or log in to continue.");

        } else {

            window.location.href = `/users/expense/${id}`;

        }

    });

    $("#account").on("click", function (event) {

        let path = $(location).attr('pathname');
        let pathArr = path.split("/");
        let id = pathArr[3];

        if (id === undefined) {

            let targ = $("#signAlert");

            targ.empty();

            targ.text("Please create an account or log in to continue.");

            let targ1 = $("#signLog");

            targ1.empty();

            targ1.text("Please create an account or log in to continue.");

        } else {

            window.location.href = `/users/config/${id}`;

        }

    });

    $("#overview").on("click", function (event) {

        let path = $(location).attr('pathname');
        let pathArr = path.split("/");
        let id = pathArr[3];

        if (id === undefined) {

            let targ = $("#signAlert");

            targ.empty();

            targ.text("Please create an account or log in to continue.");

            let targ1 = $("#signLog");

            targ1.empty();

            targ1.text("Please create an account or log in to continue.");

        } else {

            window.location.href = `/users/expenses/${id}`;

        }

    });

});