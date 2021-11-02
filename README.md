# asana-backup

Backup your Asana Organization data to an AWS S3 bucket.

## Install

```sh
$ npm install -g asana-backup
```

## Usage

Make sure to set the environment variables required for both AWS
and Asana integrations as documented in [`.env.example`](https://github.com/risk3sixty/asana-backup/blob/master/.env.sample)
are populated in your current terminal session or you have a `.env` setup
with these variables in your `pwd`. Without these populated,
the backup utility will not be able to authenticate and make
API requests to backup your articles.

```sh
$ asana-backup
```
