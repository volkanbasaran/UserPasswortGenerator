"use strict";

$(document).ready(function () {

    $("#csv").hide();
    $("#result").hide();


    $("#erstellen").click(function () {

        let passwordLenght = $("#zeichen").val();
        let passwordSize = $("#amount").val();
        let kursname = $("#kurs").val();
        let kupperCa = kursname.toUpperCase();

        let userPass = $("#result").append(makeid(kupperCa, passwordLenght, passwordSize));
        $("#result").show();
        $("#csv").show();
    });

    function makeid(kurs, length, passwordSize) {
        let result = new Array(passwordSize);
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        let list = new Array();

        for (let i = 0; i < passwordSize; i++) {
            result[i] = "";
            list[i] = "";
            for (let j = 0; j < length; j++) {
                result[i] += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            list[i] += "<tr><td>" + kurs + "User" + (i + 1) + "</td><td>" + result[i] + "</td></tr>";
        }
        return list;
    }

    $('#csv').click(function () {
        let titles = [];
        let data = [];

        // Die Daten ins Array füllen
        $('#result th').each(function () {
            titles.push($(this).text());
        });

        $('#result td').each(function () {
            data.push($(this).text());
        });

        /*
         * Konvertiert die Daten in ein CSV string
         */
        let CSVString = prepCSVRow(titles, titles.length, '');
        CSVString = prepCSVRow(data, titles.length, CSVString);

        /*
         * CSV runterladbar machen
         */
        let downloadLink = document.createElement("a");
        let blob = new Blob(["\ufeff", CSVString]);
        let url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "UserPasswort.csv";

        /*
         * CSV Download
         */
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });
 
    function prepCSVRow(arr, columnCount, initial) {
        let row = ''; 
        let delimeter = ';'; // datenseparator, in excel ist es ein `;`
        let newLine = '\r\n'; // Neue Zeile für CSV

       
        function splitArray(_arr, _count) {
            let splitted = [];
            let result = [];
            _arr.forEach(function (item, idx) {
                if ((idx + 1) % _count === 0) {
                    splitted.push(item);
                    result.push(splitted);
                    splitted = [];
                } else {
                    splitted.push(item);
                }
            });
            return result;
        }
        let plainArr = splitArray(arr, columnCount);
        
        plainArr.forEach(function (arrItem) {
            arrItem.forEach(function (item, idx) {
                row += item + ((idx + 1) === arrItem.length ? '' : delimeter);
            });
            row += newLine;
        });
        return initial + row;
    }
});