const save_button = document.getElementById("save");
const load_button = document.getElementById("load");
const clear_button = document.getElementById("clear");
const delete_button = document.getElementById("delete");

save_button.addEventListener("click", function save_inputs() {
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
    const ajax = new XMLHttpRequest();  
    ajax.open("POST", "/server");
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify({id: id, data: data_string}));
    alert(data.file_name + ".json saved!");
});

load_button.addEventListener("click", function load_inputs() {
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
    const ajax = new XMLHttpRequest();
    ajax.open("POST", "/server");
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify({id: id, data: file}));
    ajax.onreadystatechange = function get_response() {
    if (ajax.readyState == 4) {
        if (ajax.status == 200) {
            const response = JSON.parse(ajax.responseText);
            if (response.code && response.code == "ENOENT") {
                alert("Error: File must be in parent JSON Files directory!");
            }
            else {
                document.getElementById("title").value = response.title;
                document.getElementById("desc").value = response.desc;
            }
        }
        else {
            console.log("Error: " + ajax.status);
        }
    }
    }
});

delete_button.addEventListener("click", function delete_file() {
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
        const ajax = new XMLHttpRequest();
        ajax.open("POST", "/server");
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify({id: id, data: file}));
        ajax.onreadystatechange = function get_response() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                if (ajax.responseText.code && ajax.responseText.code == "ENOENT") {
                    alert("Error: File must be in parent JSON Files directory!");
                }
                else {
                    alert(file + " deleted.");
                    document.getElementById("loaded_file").value = "";
                }
            }
            else {
                console.log("Error: " + ajax.status);
            }
        }
        }
    }
});

clear_button.addEventListener("click", function clear_inputs() {
    const all_inputs = document.querySelectorAll(".values");
    all_inputs.forEach(input => {
        input.value = "";
    });
});