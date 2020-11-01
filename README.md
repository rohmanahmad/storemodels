# pobmodels version 1.0.0

## Description
Dependency ini adalah dependency pribadi, tidak untuk aplikasi lain. dependency ini menggunakan penulisan where clause menggunakan gaya dari mongodb spt $gte, $in, $or, $and.

## How To Install
```sh
npm install pasaronlinebatu/pobmodels#[branch_name]

```

## Supported Operators
- $lt (lower than [<])
- $lte (lower than equal [<=])
- $gt (greater than [>])
- $gte (greater than equal [>=])
- $in (include [IN])
- $eq (equal [=])
- $nin (not in)
- $not (to do [!])
- $or (to do [||])
- $and (to do [&&])

## Running The Query

- menggunakan builder
```js
const { ModelName } = require('pobmodels')
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
    .execute()
```
- menggunakan raw query
```js
const { ModelName } = require('pobmodels')
const mdl = ModelName()
const data = await mdl.rawQuery(`SELECT * FROM ${mdl.tableName} WHERE f1=$1 AND f2=$2`, ['value1', 'value2'])
```

## Available models

- AccountsModel
- ActivityLogModel
- AddressListModel
- AvailableShipping
- CategoriesModel
- ConversationListModel
- CustomerListModel
- EWalletModel
- OTPCodeModel
- PaymentRefsModel
- ProductFavoritesModel
- ProductImagesModel
- ProductsModel
- RateSummaryModel
- ReviewRepliesModel
- ReviewsModel
- RolesModel
- ShippingListModel
- TransactionDetailModel
- TransactionListModel
- UKMConfigurationModel
- UKMListModel
- UserActivityLogModel
- UserAccountsModel
- UserTokensModel
- WalletTransactionModel

## To Do
- add mongodb operator on "where() function"
- support multi operators in one fields like ``` {field1: {$gte: 1, $lte: 4}} ```
- updateOne
- deleteOne
- upsert