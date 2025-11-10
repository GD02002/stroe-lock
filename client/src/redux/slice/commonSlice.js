import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { admin_apiEndpoint, config_variable, sessionToken } from '../../helper/commonApi';
import { ApiCall } from '../../helper/axios';

export const generateToken = createAsyncThunk('fetch/generateToken', async () => {
    console.log(sessionToken, 'sessionToken')
    const res = await ApiCall('POST', '/generate-token', { shop: config_variable.shop_name }, { authentication: sessionToken })
    console.log(res)
    if (res.data.status === 'success' && res.data.statusCode === 200) {
        return res?.data?.data;
    } else {
        if (window.location.hostname !== 'localhost') {
            window.parent.location.href = `${admin_apiEndpoint}?shop=${config_variable.shop_name}&host=${config_variable?.config.host}`;
        }
    }
});

export const createSettingAsync = createAsyncThunk('fetch/createSetting', async (param, thunkAPI) => {
    const state = thunkAPI.getState();
    const store_data = state?.commonData?.store_data;
    const res = await ApiCall('POST', `/settings?shop=${config_variable.shop_name}`, param?.payload, { authentication: store_data?.token })
    if (res.data.success && res.status === 200) {
        if (param.callback) {
            param.callback(res.data.success, res.data.message);
        }
        return res?.data?.data;
    } else {
        if (window.location.hostname !== 'localhost') {
            window.parent.location.href = `${admin_apiEndpoint}?shop=${config_variable.shop_name}&host=${config_variable?.config.host}`;
        }
    }
});

export const getSettingAsync = createAsyncThunk('fetch/getSetting', async (param, thunkAPI) => {
    const state = thunkAPI.getState();
    const store_data = state?.commonData?.store_data;
    const res = await ApiCall('GET', `/settings?shop=${config_variable.shop_name}`, param?.payload, { authentication: store_data?.token })
    if (res.data.success && res.status === 200) {
        if (param.callback) {
            param.callback(res?.data?.data);
        }
        return res?.data?.data;
    } else {
        if (window.location.hostname !== 'localhost') {
            window.parent.location.href = `${admin_apiEndpoint}?shop=${config_variable.shop_name}&host=${config_variable?.config.host}`;
        }
    }
});

export const getSubscriptionAsync = createAsyncThunk('fetch/getSubscription', async (param, thunkAPI) => {
    const state = thunkAPI.getState();
    const store_data = state?.commonData?.store_data;
    const res = await ApiCall('GET', `/subscription?shop=${config_variable.shop_name}`, {}, { authentication: store_data?.token })
    if (res.status === 200) {
        if (param.callback) {
            param.callback(res.data.status === 'success');
        }
        return res?.data?.data;
    } else {
        if (window.location.hostname !== 'localhost') {
            window.parent.location.href = `${admin_apiEndpoint}?shop=${config_variable.shop_name}&host=${config_variable?.config.host}`;
        }
    }
});


const commonSlice = createSlice({
    name: 'common',
    initialState: {
        store_data: {},
        status: false,
        isError: false,
        activeModal: false,
        isGetSettingLoading: false,
        isCreateSettingLoading: false,
        settings: null,
        isSubscriptionLoading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(generateToken.pending, (state) => {
                state.status = false;
            })
            .addCase(generateToken.fulfilled, (state, { payload }) => {
                if (payload) {
                    const { shop_data, token } = payload;
                    state.store_data = { shop_data, token };
                    state.status = true;
                }
            })
            .addCase(generateToken.rejected, (state) => {
                state.isError = false;
                if (window.location.hostname !== 'localhost') {
                    window.parent.location.href = `${admin_apiEndpoint}?shop=${config_variable.shop_name}&host=${config_variable?.config.host}`;
                }
            })
            .addCase(getSettingAsync.pending, (state) => {
                state.isGetSettingLoading = true;
            })
            .addCase(getSettingAsync.fulfilled, (state, { payload }) => {
                state.isGetSettingLoading = false;
                if (payload) {
                    state.settings = payload
                }
            })
            .addCase(getSettingAsync.rejected, (state) => {
                state.isGetSettingLoading = false;
                if (window.location.hostname !== 'localhost') {
                    window.parent.location.href = `${admin_apiEndpoint}?shop=${config_variable.shop_name}&host=${config_variable?.config.host}`;
                }
            })
            .addCase(createSettingAsync.pending, (state) => {
                state.isCreateSettingLoading = true;
            })
            .addCase(createSettingAsync.fulfilled, (state) => {
                state.isCreateSettingLoading = false;
            })
            .addCase(createSettingAsync.rejected, (state) => {
                state.isCreateSettingLoading = false;
                if (window.location.hostname !== 'localhost') {
                    window.parent.location.href = `${admin_apiEndpoint}?shop=${config_variable.shop_name}&host=${config_variable?.config.host}`;
                }
            })
            .addCase(getSubscriptionAsync.pending, (state) => {
                state.isSubscriptionLoading = true;
            })
            .addCase(getSubscriptionAsync.fulfilled, (state, { payload }) => {
                state.isSubscriptionLoading = false;
                console.log(payload)
                if (payload) {
                    window.top.location.href = payload;
                }
            })
            .addCase(getSubscriptionAsync.rejected, (state) => {
                state.isSubscriptionLoading = false;
                if (window.location.hostname !== 'localhost') {
                    window.parent.location.href = `${admin_apiEndpoint}?shop=${config_variable.shop_name}&host=${config_variable?.config.host}`;
                }
            });
    },
    reducers: {
        commonSliceData: (state, action) => {
            state.store_data = action.payload;
        },
        updateModalStatus: (state, action) => {
            state.activeModal = action.payload;
        }
    },
});
export const { updateSliceData, updateModalStatus } = commonSlice.actions;
export const getAllSetting = (state) => state.commonData;
export default commonSlice.reducer;
