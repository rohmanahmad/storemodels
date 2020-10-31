# pobmodels version 1.0.0

## Description
Dependency ini adalah dependency pribadi, tidak untuk aplikasi lain. dependency ini menggunakan penulisan where clause menggunakan gaya dari mongodb spt $gte, $in, $or, $and.

## how to use
```sh
npm install pasaronlinebatu/pobmodels#[branch_name]

```

## running the query

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
    .fetch()
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