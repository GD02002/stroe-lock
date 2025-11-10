import React from 'react';
import { NavigationMenu, Provider, RoutePropagator } from '@shopify/app-bridge-react';
import { AppProvider, Frame, Spinner } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import { Outlet, useLocation } from 'react-router-dom';
import { config_variable } from '../helper/commonApi';
import { useSelector } from 'react-redux';
import NotFound from '../pages/NotFound';
import { isAdmin } from '../utils/constant';
import OnboardingPage from '../pages/Onboarding';
import { FormikProvider } from '../contexts/FormikContext';
import SettingPage from '../pages/Setting';

export function Router() {
    const { status, settings, isGetSettingLoading } = useSelector(
        (store) => store.commonData
    );
    const location = useLocation();

    if (!config_variable.config.host) {
        config_variable.config.host = location?.state?.config?.host ? location?.state?.config?.host : config_variable.config.host;
        config_variable.shop_name = location?.state?.shop_name ? location?.state?.shop_name : config_variable.shop_name;
    }

    if (!status || isGetSettingLoading) {
        return <div style={{ textAlign: "center", paddingTop: "20%" }}>
            <Spinner accessibilityLabel="Spinner example" size="large" />
        </div>
    }
    return (
        <>
            <AppProvider i18n={enTranslations}>
                {isAdmin ?
                    <FormikProvider initialData={settings}>
                        <Provider config={config_variable.config}>
                            <NavigationMenu
                                navigationLinks={isAdmin ? [
                                    {
                                        label: "Setting",
                                        destination: '/setting'
                                    }
                                ] : []}
                                matcher={(link, location) => link.destination === location.pathname} />
                            <Frame>
                                <RoutePropagator location={location} />
                                <Outlet />
                            </Frame>
                        </Provider>
                    </FormikProvider> :
                    <Outlet />
                }
            </AppProvider>
        </>
    );
}

export const routes = [
    { path: '/', component: <OnboardingPage /> },
    { path: '/setting', component: <SettingPage /> },
    { path: '*', component: <NotFound /> },
];
