//secret.js
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid'); 

const uri = "mongodb+srv://aretexIT:iFaYfNi3L4sOGegR@aretex.i5ddvp5.mongodb.net/pdfToolkitDB";

const user_input = document.getElementById('user_input');
let computerId = localStorage.getItem('computerId'); 

const loadingSpinner = document.getElementById('loadersecret');
const loadingSpinner2 = document.getElementById('loadersecret2');
const btnsub = document.getElementById('btnsub');
const btnexit = document.getElementById('btnexit');

if (!computerId) {
    computerId = uuidv4(); 
    localStorage.setItem('computerId', computerId); 
}
const body = document.querySelector('.whole-content');

document.addEventListener('DOMContentLoaded', async () => {
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const db = client.db("pdfToolkitDB");
        const coll2 = db.collection("user_secretkey");

        const result = await coll2.findOne({ computerId });
        loadingSpinner2.style.display = 'block';
        if (result) {
            apiKey = result.user_secretkey;
            user_input.value = apiKey;
            ipcRenderer.send('api', apiKey);
            body.style.display = 'block';
            loadingSpinner.style.display = 'none';
            loadingSpinner2.style.display = 'none';
            user_input.disabled = true;
            btnsub.style.display = 'none';
            Swal.fire({
                position: "center",
                icon: "success",
                title: "API key is valid. Access Granted.",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            loadingSpinner2.style.display = 'block';
            Swal.fire({
                title: 'No API key detected!',
                text: 'Please enter your API key to access the application.',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then(() => {
                user_input.disabled = false;
            });
        }
    } catch (error) {
        console.error("Error retrieving API key:", error);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "API key is not valid. Access Denied.",
            showConfirmButton: false,
            timer: 1500
        });
        user_input.disabled = false;
    } finally {
        await client.close();
        btnsub.style.display = 'none';
    }
});

btnsub.addEventListener('click', async () => {
    loadingSpinner.style.display = 'block';
    btnsub.style.display = 'none';
    btnexit.style.display = 'none';

    const client = new MongoClient(uri);
    try {
        await client.connect();

        const db = client.db("pdfToolkitDB");
        const coll1 = db.collection("DB_secretkey");
        const coll2 = db.collection("user_secretkey");

        const result = await coll1.findOne({ db_secretkey: user_input.value });
        
        if (result) {
            console.log("Secret key found: " + result.db_secretkey);
            user_input.disabled = true;
            body.style.display = 'block';
            loadingSpinner.style.display = 'none';
            Swal.fire({
                position: "center",
                icon: "success",
                title: "API key is valid.",
                showConfirmButton: false,
                timer: 1500
            });
            btnsub.style.display = 'none';

            const validSecret = ({ user_secretkey: result.db_secretkey, computerId }); 
            const updateResult = await coll2.updateOne({ computerId }, { $set: validSecret }, { upsert: true }); 

            console.log("API key updated in user_secretkey collection:", updateResult.upsertedId || "No new document inserted");

            apiKey = result.db_secretkey;
        } else {    
            console.log("Secret key not found.");
            Swal.fire({
                position: "center",
                icon: "error",
                title: "API key is NOT valid. Access Denied.",
                showConfirmButton: false,
                timer: 1500
            });
        }

    } finally {
        loadingSpinner.style.display = 'none'; 
        loadingSpinner2.style.display = 'none'; 
        btnexit.style.display = 'block';
        btnsub.style.display = 'none';
    }
});

function editKey() {
    user_input.disabled = false;
    btnsub.style.display = 'block';
}

function deleteKey() {
    Swal.fire({
        title: 'Are you sure?',
        text: 'Please make sure to remember your API key if you want to use the app again.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const loadingSpinner = document.getElementById('loadersecret');
            loadingSpinner.style.display = 'block'; 
            btnsub.style.display = 'none';
            btnexit.style.display = 'none';
            const client = new MongoClient(uri);

            try {
                await client.connect();

                const db = client.db("pdfToolkitDB");
                const coll2 = db.collection("user_secretkey");

                const deleteResult = await coll2.deleteOne({ computerId });

                if (deleteResult.deletedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'API key has been deleted.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    loadingSpinner2.style.display = 'block';
                    body.style.display = 'none';
                    user_input.value = '';
                } else {
                    loadingSpinner2.style.display = 'block';
                    body.style.display = 'none';
                    Swal.fire({
                        position: 'center',
                        icon: 'info',
                        title: 'No API key found for deletion.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (error) {
                console.error('Error deleting API key:', error);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Failed to delete API key.',
                    showConfirmButton: false,
                    timer: 1500
                });
                loadingSpinner2.style.display = 'block';
                body.style.display = 'none';
            } finally {
                loadingSpinner.style.display = 'none';
                btnexit.style.display = 'block';
                await client.close();
            }
        }
    });
}
