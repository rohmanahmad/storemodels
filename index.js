'use strict'

if (!process.env.POSTGRESQL_DSN) throw new Error('need POSTGRESQL_DSN env')

module.exports = {
    ActivityLogModel: require('./components/ActivityLogModel'),
    AddressListModel: require('./components/AddressListModel'),
    AvailableShipping: require('./components/AvailableShippingModel'),
    CategoriesModel: require('./components/CategoriesModel'),
    ConversationListModel: require('./components/ConversationListModel'),
    CustomerListModel: require('./components/CustomerListModel'),
    EWalletModel: require('./components/EWalletModel'),
    FlashSaleModel: require('./components/FlashSaleModel'),
    ImagesGalleryModel: require('./components/ImagesGalleryModel'),
    LocationModel: require('./components/LocationModel'),
    OTPCodeModel: require('./components/OTPCodeModel'),
    PaymentRefsModel: require('./components/PaymentRefsModel'),
    ProductFavoritesModel: require('./components/ProductFavoritesModel'),
    ProductsModel: require('./components/ProductsModel'),
    RateSummaryModel: require('./components/RateSummaryModel'),
    ReviewRepliesModel: require('./components/ReviewRepliesModel'),
    ReviewsModel: require('./components/ReviewsModel'),
    RolesModel: require('./components/RolesModel'),
    ShippingListModel: require('./components/ShippingListModel'),
    TransactionDetailModel: require('./components/TransactionDetailModel'),
    TransactionListModel: require('./components/TransactionListModel'),
    UKMConfigurationModel: require('./components/UKMConfigurationModel'),
    UKMListModel: require('./components/UKMListModel'),
    UKMSummariesModel: require('./components/UKMSummariesModel'),
    UserAccountsModel: require('./components/UserAccountsModel'),
    UserActivityLogModel: require('./components/UserActivityLogModel'),
    UserTokensModel: require('./components/UserTokensModel'),
    WalletTransactionModel: require('./components/WalletTransactionModel')
}