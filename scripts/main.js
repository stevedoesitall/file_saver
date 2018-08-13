$("#save").on("click", function save_inputs() {
    const id = "save";
    const data = {};
        data.title = document.getElementById("title").value;
        data.desc = document.getElementById("desc").value;
        data.file_name = document.getElementById("file_name").value;
    const data_string = JSON.stringify(data);
    if (!data.file_name) {
        alert("Please name your file.");
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/server",
        data: {id: id, data: data_string},
        success: function(response) {
            console.log(response);
        }
    });
    alert(data.file_name + ".json saved!");
});

$("#load").on("click", function load_inputs() {
    const id = "load";
    const file_path = document.querySelectorAll("#loaded_file")[0].files[0];
    let file;
    if (file_path == null) {
        alert("Please select a file.");
        return false;
    }
    else {
        file = file_path.name;
    }
    $.ajax({
        type: "POST",
        url: "/server",
        data: {id: id, data: file},
        success: function(response) {
            console.log(response);
            if (response.code == "ENOENT") {
                alert("Error: File must be in parent JSON Files directory!");
            }
            else {
                const json_response = JSON.parse(response);
                document.getElementById("title").value = json_response.title;
                document.getElementById("desc").value = json_response.desc;
            }
        }
    });
});

$("#delete").on("click", function delete_file() {
    const delete_confirm = confirm("Really delete?");
    if (delete_confirm) {
        const id = "delete";
        const file_path = document.querySelectorAll("#loaded_file")[0].files[0];
        let file;
        if (file_path == null) {
            alert("Please select a file.");
            return false;
        }
        else {
            file = file_path.name;
        }
        $.ajax({
            type: "POST",
            url: "/server",
            data: {id: id, data: file},
            success: function(response) {
                console.log(response);
                if (response.code == "ENOENT") {
                    alert("Error: File must be in parent JSON Files directory!");
                }
                else {
                    alert(file + " deleted.");
                    document.getElementById("loaded_file").value = "";
                }
            }
        });
    }
});

$("#clear").on("click", function clear_inputs() {
    const all_inputs = document.querySelectorAll(".values");
    all_inputs.forEach(input => {
        input.value = "";
    });
});