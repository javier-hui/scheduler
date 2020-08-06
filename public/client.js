console.log('client running');

$("#datepicker-submit").on("click", function () {
    var strDate = $("#datepicker").val();
    var datepicker = new Date(strDate);

    $.ajax({
        url: '/',
        type: 'POST',
        data: {
            fullDate: strDate,
            day: datepicker.getDate(),
            month: datepicker.getMonth() + 1,
            year: datepicker.getFullYear(),
            weekday: datepicker.getDay(),
            forms: [""],
            location: [""]
        },
        dataType: 'json',
    }).done((data) => {
        console.log(data);
        document.getElementById("forms").innerHTML = '<h5 class="text-center">[' + strDate + ']</h5>';

        for (let i = 0; i < data.forms.length; ++i) {
            let fileName = data.forms[i];
            let feedback = '<div class="row border mx-auto px-2 py-2 my-2"><div class="col-9 py-2">' + fileName;
            feedback += '</div><div class="col-3"><a href="' + './doc/' + fileName;
            feedback += '" class="btn btn-success">Download</a></div></div>';
            document.getElementById("forms").innerHTML += feedback;
        }
        document.getElementById("location").innerHTML = '<div class="row"><div id="scc" class="col-12 col-md-6"></div><div id="pcc" class="col-12 col-md-6"></div></div>';
        document.getElementById("location").innerHTML = '<h4 class="text-center">Tape location for ' + data.day + '/' + data.month + '</h4>' + document.getElementById("location").innerHTML;
        let SCC = data.location[0].SCC;
        let PCC = data.location[1].PCC;
        let feedback = '<h5 class="text-center">SCC:</h5>';
        for (let i = 0; i < SCC.length; ++i) {
            let key = Object.keys(SCC[i])[0];
            if (SCC[i][key].length == 0) continue;
            feedback += '<p>' + Object.keys(SCC[i])[0] + '</p>';
            feedback += '<ul>';
            for (let j = 0; j < SCC[i][key].length; ++j) {
                feedback += '<li>' + SCC[i][key][j] + '</li>';
            }
            feedback += '</ul>';
        }
        document.getElementById("scc").innerHTML = feedback;
        feedback = '<h5 class="text-center">PCC:</h5>';
        for (let i = 0; i < PCC.length; ++i) {
            let key = Object.keys(PCC[i])[0];
            if (PCC[i][key].length == 0) continue;
            feedback += '<p>' + Object.keys(PCC[i])[0] + '</p>';
            feedback += '<ul>';
            for (let j = 0; j < PCC[i][key].length; ++j) {
                feedback += '<li>' + PCC[i][key][j] + '</li>';
            }
            feedback += '</ul>';
        }
        document.getElementById("pcc").innerHTML = feedback;
    });
});