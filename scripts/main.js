const save_button = document.getElementById("save");
const load_button = document.getElementById("load");
const clear_button = document.getElementById("clear");
const delete_button = document.getElementById("delete");
const submit_button = document.getElementById("submit");

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

    fetch("/server", {
        method: "post",
        headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: id, data: data_string})
    })
    .then((resp) => resp.json())
    .then( function(resp_data) {
        console.log(resp_data);
        if (resp_data.message == "EXISTS") {
            console.log(resp_data);
            const overwrite_confirm = confirm(data.file_name + ".json already exists. Overwrite?");
            if (overwrite_confirm) {
                fetch("/server", {
                    method: "post",
                    headers: {
                        "Accept" : "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id: id, data: data_string, overwrite: true})
                })
                    .then((resp) => resp.json())
                    .then( function(resp_data) {
                        console.log(resp_data);
                    });
                alert(data.file_name + ".json saved!");
            }
        }
        else {
            alert(data.file_name + ".json saved!");
        }
    });
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
    fetch("/server", {
        method: "post",
        headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: id, data: file})
    })
        .then((resp) => resp.json())
        .then( function(resp_data) {
            console.log(resp_data);
            if (resp_data.code == "ENOENT") {
                alert("Error: File must be in parent Test directory!");
                document.getElementById("loaded_file").value = "";
            }
            else {
                try {
                    document.getElementById("title").value = resp_data.title;
                    document.getElementById("desc").value = resp_data.desc;
                    document.getElementById("file_name").value = file.substr(0,file.indexOf(".json"));
                } 
                catch(err) {
                    alert("Error: File is not in valid JSON format!");
                    document.getElementById("loaded_file").value = "";
                    console.log(err);
                }
            }
        });
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
        fetch("/server", {
            method: "post",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: id, data: file})
        })
        .then((resp) => resp.json())
        .then( function(resp_data) {
            if (resp_data.code == "ENOENT") {
                alert("Error: File must be in parent Test directory!");
                document.getElementById("loaded_file").value = "";
            }
            else {
                alert(file + " deleted.");
                document.getElementById("loaded_file").value = "";
            }
        });
    }
});

clear_button.addEventListener("click", function clear_inputs() {
    const all_inputs = document.querySelectorAll(".values");
    all_inputs.forEach(input => {
        input.value = "";
    });
});

submit_button.addEventListener("click", function submit_inputs() {
    console.log("This doesn't do anything.");
});