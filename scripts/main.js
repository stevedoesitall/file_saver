import {get_id, qsa, string, cl, headers} from "./ditko.js";

const save_button = get_id("save");
const load_button = get_id("load");
const clear_button = get_id("clear");
const delete_button = get_id("delete");
const submit_button = get_id("submit");

save_button.addEventListener("click", function save_inputs() {
    const id = "save";
    const data = {};
        data.title = get_id("title").value;
        data.desc = get_id("desc").value;
        data.file_name = get_id("file_name").value;
    const data_string = string(data);
    if (!data.file_name) {
        alert("Please name your file.");
        return false;
    }

    fetch("/server", {
        method: "post",
        headers: headers,
        body: string({id: id, data: data_string})
    })
    .then(
        function(response) {
            if (response.status != 200) {
                cl("Error: " + response.status);
                return;
            }
    response.json().then(
        function(resp_data) {
            cl(resp_data);
            if (resp_data.message == "EXISTS") {
                const overwrite_confirm = confirm(data.file_name + ".json already exists. Overwrite?");
                if (overwrite_confirm) {
                    fetch("/server", {
                        method: "post",
                        headers: headers,
                        body: string({id: id, data: data_string, overwrite: true})
                    })
                    .then(
                        function(response) {
                            if (response.status != 200) {
                                cl("Error: " + response.status);
                                return;
                            }
                            response.json().then(
                                function(resp_data) {
                                    cl(resp_data); 
                            })
                        })
                    alert(data.file_name + ".json saved!");
                }
            }
            else {
                alert(data.file_name + ".json saved!");
            }
        })
    })
});

load_button.addEventListener("click", function load_inputs() {
    const id = "load";
    const file_path = qsa("#loaded_file")[0].files[0];
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
        headers: headers,
        body: string({id: id, data: file})
    })
    .then(
        function(response) {
            if (response.status != 200) {
                cl("Error: " + response.status);
                return;
            }
        response.json().then(
            function(resp_data) {
            cl(resp_data);
            if (resp_data.code == "ENOENT") {
                alert("Error: File must be in the parent JSON Files directory!");
                get_id("loaded_file").value = "";
            }
            else {
                try {
                    get_id("title").value = resp_data.title;
                    get_id("desc").value = resp_data.desc;
                    get_id("file_name").value = file.substr(0,file.indexOf(".json"));
                } 
                catch(err) {
                    alert("Error: File is not in valid JSON format!");
                    get_id("loaded_file").value = "";
                    cl(err);
                }
            }
        })
    })
});

delete_button.addEventListener("click", function delete_file() {
    const delete_confirm = confirm("Really delete?");
    if (delete_confirm) {
        const id = "delete";
        const file_path = qsa("#loaded_file")[0].files[0];
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
            headers: headers,
            body: string({id: id, data: file})
        })
    .then(
        function(response) {
            if (response.status != 200) {
                cl("Error: " + response.status);
                return;
            }
            response.json().then(
                function(resp_data) {
                if (resp_data.code == "ENOENT") {
                    alert("Error: File must be in the parent JSON Files directory!");
                    get_id("loaded_file").value = "";
                }
                else {
                    alert(file + " deleted.");
                    get_id("loaded_file").value = "";
                }
            })
        })
    }
});

clear_button.addEventListener("click", function clear_inputs() {
    const all_inputs = qsa(".values");
    all_inputs.forEach(input => {
        input.value = "";
    });
});

submit_button.addEventListener("click", function submit_inputs() {
    cl("This doesn't do anything.");
});