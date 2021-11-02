#!/usr/bin/env node

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const uuid_1 = require("uuid");
const asana_1 = __importDefault(require("./libs/asana"));
(async function asanaBackup() {
    try {
        const backupInstancePrefix = `${Date.now()}__${uuid_1.v4()}`;
        const fullPrefixBase = [
            process.env.AWS_S3_PREFIX || 'asana-backup',
            backupInstancePrefix,
        ];
        const asana = asana_1.default();
        const workspaces = await asana.getWorkspaces();
        const r3sWs = workspaces.find((w) => w.name == 'risk3sixty.com');
        const exportRes = await asana.getFullExport(r3sWs.gid);
        // await zendesk.getArticles(async function processArticle(
        //   article: any,
        //   ind: number
        // ) {
        //   const filePathInBucket = [
        //     ...fullPrefixBase,
        //     `${ind}__${article.title}.json`,
        //   ]
        //   await uploadObject(filePathInBucket.join('/'), JSON.stringify(article))
        // })
        console.log(`Successfully saved your asana org`, exportRes);
        // console.log(`s3://${process.env.AWS_S3_BUCKET}/${fullPrefixBase.join('/')}`)
    }
    catch (err) {
        console.error(`Error processing knowledge base`, err, err.response.data);
    }
    finally {
        process.exit();
    }
})();
