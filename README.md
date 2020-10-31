# pobmodels version 1.0.0

## Description
Dependency ini adalah dependency pribadi, tidak untuk aplikasi lain. dependency ini menggunakan penulisan where clause menggunakan gaya dari mongodb spt $gte, $in, $or, $and.

## how to use
```
npm install pasaronlinebatu/pobmodels#[branch_name]
```bash

## running the query

```

const {ModelName} = require('pobmodels)
const mdl = ModelName()
const data = await aL
    .select()
    .where({
        type: {'$in': ['restart-server', 'restart-server1']},
        server_ip: {'$gte': '127.0.0.1'}
    })
    .orWhere({
        type: {'$lt': 'restart-server'},
        server_ip: '127.0.0.1'
    })
    .limit(1)
    .offset(1)
    .fetch()
```js