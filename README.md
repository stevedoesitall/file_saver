<h1><b>File Saver</b></h1>
<p><b>Stack:</b> jQuery, NodeJS, Express.js</p>
<p>Simple UI for saving inputs to a JSON file on in a local directory. Note that due to security purposes, a top-level directory must be used to load and delete files, i.e. you can't have subdirectories.</p>
<p><b>Setup Instructions Part 1 (Setup Node):</b></p>
<ol>
    <li>Download and install NodeJS: https://nodejs.org/en/download/.</li>
    <li>Open the downloaded .pkg file and follow the onscreen instructions.</li>
    <li>Once finished, open Terminal (Mac) or Command Prompt (Windows).</li>
    <li>Type "node -v" (no quotes) and press enter to confirm Node installation. You should see something like v8.11.3.</li>
</ol>
<p><b>Setup Instructions Part 2 (Setup Server):</b></p>
<ol>
    <li>On your Desktop, create a folder named "JSON Files".</li>
    <li>Click "Clone or download" button then "Download ZIP" on https://github.com/stevedoesitall/file_saver.</li>
    <li>Unzip the file_saver-master.zip file in your Downloads folder.</li>
    <li>Enter "cd" (no quotes) then hit "Enter" in the command line. This will bring you to the top directory.</li>
    <li>Find the path the file_saver-master folder then navigate there using the command line. For instance, if it's still in your Downloads folder, you can type "cd Downloads/file_saver-master" then hit enter.</li>
    <li>To run the Node script, in the command line type "node scripts/server.js" then hit enter. You must be in the file_saver-master folder for this to work.</li>
    <li>This creates a local server on your machine on port 3000. To access it, open a browser window (preferably Chrome) and navigate to http://localhost:3000/.</li>
    <li>If all went well, you'll see the the UI load in the browser.</li>

