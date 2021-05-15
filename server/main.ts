import express from 'express';
import cors from 'cors';
import * as mongo from 'mongodb';
import DBConfig from './DB.json';
import { DB_Note } from './Types';

let DB_Client: mongo.MongoClient;

const Server = express();
Server.use(cors());
Server.use(express.json());
Server.use(express.urlencoded({
    extended: true
}));
Server.use(express.static('../build'));

Server.put('/UploadNote', async (req, res) => {
    if (req.body.author && req.body.description) {
        let DB = await DB_Client.db();

        let Check: DB_Note | null = await DB.collection('Notes').findOne({author: req.body.author});
        if (Check) {
            if (Check.description == req.body.description) return res.send({status: 1});
        }
        
        if (await (await DB.collection('Notes').insertOne({author: req.body.author, description: req.body.description, ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress})).result.ok) {
            res.send({status: 1});
        } else {
            res.send({status: 0});
        }
    } else {
        res.send({status: 0});
    }
});

Server.get('/GetNotes', async (req, res) => {
    let DB = await DB_Client.db();

    let HeaderNote: DB_Note | null = await DB.collection('Notes').findOne({header: true});
    let Notes: Array<DB_Note> = await DB.collection('Notes').find({}).toArray();

    let Send: Array<{author: string, description: string}> = [];
    if (HeaderNote) {Send[0] = HeaderNote}

    for (let i = 0; i < Notes.length; i++) {
        if (Notes[i].header) continue;
        Send.push({author: Notes[i].author, description: Notes[i].description});
    }
    
    res.send(Send);
})


Server.listen(6800, async () => {
    const DB_Config: mongo.MongoClientOptions = {
        useUnifiedTopology: true,
        poolSize: 10
    }
    
    DB_Client = await mongo.connect(`mongodb://${DBConfig.user}:${DBConfig.pwd}@${DBConfig.host}/${DBConfig.DataBase}`, DB_Config);
    console.log("Rollingpaper Server is running");
})