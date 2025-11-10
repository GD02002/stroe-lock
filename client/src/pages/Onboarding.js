import React from 'react';
import OnboardingComponent from '../components/onboarding';
import { useSelector } from 'react-redux';
import { getAllSetting } from '../redux/slice/commonSlice';
import { Page } from '@shopify/polaris';
import DashboardSummary from '../components/setting/clone-defence/Analytics';
import ActiveCases from '../components/setting/clone-defence/ActiveCases';

const OnboardingPage = () => {
    const { settings } = useSelector(getAllSetting);
    return (
        <Page title='Dashboard Overview'>
            {(settings?.onboarding?.is_completed && settings?.onboarding?.step === 3) ?
                <>
                    <DashboardSummary />
                    <br />
                    <ActiveCases />
                    <br />
                </>
                :
                <OnboardingComponent />
            }
        </Page>
    );
};

export default OnboardingPage;
