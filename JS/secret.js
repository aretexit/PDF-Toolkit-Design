const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid'); // Import UUID generator

const uri = "mongodb+srv://grmblnc:zWIS4BSBo53OTjHu@mongodb.isywpds.mongodb.net/?retryWrites=true&w=majority&appName=MongoDB";

const user_input = document.getElementById('user_input');
let apiKey = '';
let computerId = localStorage.getItem('computerId'); // Retrieve computerId from localStorage

if (!computerId) {
    computerId = uuidv4(); // Generate new UUID if computerId doesn't exist
    localStorage.setItem('computerId', computerId); // Save computerId to localStorage
}

document.addEventListener('DOMContentLoaded', async () => {
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const db = client.db("pdfToolkitDB");
        const coll2 = db.collection("user_secretkey");

        const result = await coll2.findOne({ computerId });

        if (result) {
            apiKey = result.user_secretkey;
            user_input.value = apiKey;
        }
    } catch (error) {
        console.error("Error retrieving API key:", error);
    } finally {
        await client.close();
    }
});

document.getElementById('btnsub').addEventListener('click', async () => {
    console.log(user_input.value);
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const db = client.db("pdfToolkitDB");
        const coll1 = db.collection("DB_secretkey");
        const coll2 = db.collection("user_secretkey");

        const result = await coll1.findOne({ db_secretkey: user_input.value });

        if (result) {
            console.log("Secret key found: " + result.db_secretkey);
            
            Swal.fire({
                position: "center",
                icon: "success",
                title: "API key is valid.",
                showConfirmButton: false,
                timer: 1500
            });

            const validSecret = ({ user_secretkey: result.db_secretkey, computerId }); // Include computerId in document
            const updateResult = await coll2.updateOne({ computerId }, { $set: validSecret }, { upsert: true }); // Update based on computerId

            console.log("API key updated in user_secretkey collection:", updateResult.upsertedId || "No new document inserted");

            apiKey = result.db_secretkey;
        } else {    
            console.log("Secret key not found.");
            Swal.fire({
                position: "center",
                icon: "error",
                title: "API key is NOT valid.",
                showConfirmButton: false,
                timer: 1500
            });
        }

    } finally {
        await client.close();
    }
});
