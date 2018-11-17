$(document).ready(function() {
    console.log("hello World");

   

    $("#inputGroupSelect01").change(() => {
        console.log($("#inputGroupSelect01").val());
        let accType = $("#inputGroupSelect01").val();
        if (accType == "credit") {
            //target to append the divs
            let target1 = $("#statementDate");
            let target2 = $("#dueDate");
            //div creation
            let statementDiv = $('<div class="input-group-prepend">');
            let statementSpan = $('<span class="input-group-text" id="inputGroup-sizing-default">');
            statementSpan.text("Statement Date");
            let statementInput = $('<input class="calendar form-control" type="text" placeholder="Select Date.." readonly="readonly">');
            
            //apending for target 1
            target1.append(statementDiv);
            statementDiv.append(statementSpan);
            target1.append(statementInput);

            //appending for target two with the text change
            let dueDiv = $('<div class="input-group-prepend">');
            let dueSpan = $('<span class="input-group-text" id="inputGroup-sizing-default">');
            dueSpan.text("Due Date");
            let dueInput = $('<input class="calendar form-control" type="text" placeholder="Select Date.." readonly="readonly">');
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
        let statementDate = "";
        let dueDate = "";

        if(accType == "credit") {
            statementDate = $("#statDate").val();
            dueDate = $("#dueDate").val();
        }
        
        //sended Object
        let data = {
            accName,
            accType,
            statementDate,
            dueDate
        };
        
        console.log(data);

        //FALTA LA ROUTE CORRECTA!!!!!!!
        $.ajax("/", {
            type: "POST",
            data
        }).then(() => {
            console.log("created new Financial Account");
            
            //location.reload();
        });
    });

});