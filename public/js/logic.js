$(document).ready(function() {
    console.log("hello World");

    $(".calendar").flatpickr({
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });
});