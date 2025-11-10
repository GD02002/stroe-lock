import mongoose from "mongoose";

const priceRulesSchema = new mongoose.Schema({
    store_name: {
        type: String,
        index: true
    },
    name: {
        type: String
    },
    updateLogic: {
        type: String
    },
    type: {
        type: String
    },
    // priority: {
    //     type: Number,
    //     default: 0
    // },
    products: {
        type: mongoose.Schema.Types.Mixed
    },
    condition : {
        type: mongoose.Schema.Types.Mixed
    },
    day_start : {
        type: mongoose.Schema.Types.Mixed
    },
    day_end : {
        type: mongoose.Schema.Types.Mixed
    },
    night_start : {
        type: mongoose.Schema.Types.Mixed
    },
    night_end : {
        type: mongoose.Schema.Types.Mixed
    },
    below_inventory : {
        type: mongoose.Schema.Types.Mixed
    },
    // above_inventory : {
    //     type: mongoose.Schema.Types.Mixed
    // },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const priceRuleSchema = mongoose.model('price-rule', priceRulesSchema);
