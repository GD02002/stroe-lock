import React, { useCallback, useState } from 'react';
import { Box, Divider, Grid, Page, Tabs } from '@shopify/polaris';
import SettingComponent from '../components/setting/index';
import CopyPrevention from '../components/setting/CopyPrevention';
import PrivacyCompliance from '../components/setting/PrivacyRequirements';
import CloneDetection from '../components/setting/CloneDetection';
import CommonSaveBar from '../components/common/SaveBar';
import { useDispatch, useSelector } from 'react-redux';
import { createSettingAsync, getAllSetting, getSettingAsync } from '../redux/slice/commonSlice';
import { useAppFormik } from '../contexts/FormikContext';
import RecipientIntelligence from '../components/setting/clone-defence/RecipientIntelligence';
import SafetyReporting from '../components/setting/clone-defence/SafetyReporting';
import ComplianceRetentionTab from '../components/setting/ComplianceRetention';
import Notifications from '../components/setting/Notifications';
import EvidenceDMCA from '../components/setting/clone-defence/DMCAWorkflow';
import ImageMonitoring from '../components/setting/ImageMonitoring';

const SettingPage = () => {
  const dispatch = useDispatch();
  const { isCreateSettingLoading } = useSelector(getAllSetting);
  const { values, setFieldValue } = useAppFormik();
  const [selected, setSelected] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'content-protection-module',
      content: 'Content Protection',
      accessibilityLabel: 'Content Protection Module',
      panelID: 'content-protection-module',
    },
    {
      id: 'clone-detection-module',
      content: 'Clone Detection',
      panelID: 'clone-detection-module',
    },
    {
      id: 'evidence-DMCA-center',
      content: 'Evidence & DMCA Center',
      panelID: 'evidence-DMCA-center',
    },
    {
      id: 'safety-blacklist-reporting',
      content: 'Safety & Blacklist Reporting',
      panelID: 'safety-blacklist-reporting',
    },
    {
      id: 'compliance-retention',
      content: 'Compliance & Retention',
      panelID: 'compliance-retention',
    },
    {
      id: 'notification',
      content: 'Notifications',
      panelID: 'notification',
    },
    {
      id: 'image-monitoring',
      content: 'Image Monitoring',
      panelID: 'image-monitoring',
    }
  ];

  const handleSave = () => {
    let settings = values;
    dispatch(createSettingAsync({
      payload: {
        settings
      },
      callback: (success) => {
        handleDiscard();
      }
    }))
  };

  const handleDiscard = () => {
    dispatch(getSettingAsync({
      callback: () => setVisible(false)
    }));
  };

  return (
    <Page
      title="Manage protection"
      subtitle="Manage your store protection settings"
    >
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Divider borderColor="border" />
        <br />
        {selected === 0 &&
          <Box>
            <SettingComponent setVisible={setVisible} values={values} setFieldValue={setFieldValue} />
            <br />
            <CopyPrevention setVisible={setVisible} values={values} setFieldValue={setFieldValue} />
            <br />
            <PrivacyCompliance setVisible={setVisible} values={values} setFieldValue={setFieldValue} />
            <br />
          </Box>
        }
        {selected === 1 &&
          <Box>
            <CloneDetection setVisible={setVisible} values={values} setFieldValue={setFieldValue} />
            <br />
          </Box>
        }
        {selected === 2 &&
          <Box>
            <EvidenceDMCA setVisible={setVisible} values={values} setFieldValue={setFieldValue} />
            <br />
          </Box>
        }
        {selected === 3 &&
          <Box>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <RecipientIntelligence />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <SafetyReporting />
              </Grid.Cell>
            </Grid>
            <br />
          </Box>
        }
        {selected === 4 &&
          <Box>
            <ComplianceRetentionTab />
            <br />
          </Box>
        }
        {selected === 5 &&
          <Box>
            <Notifications />
            <br />
          </Box>
        }
        {selected === 6 &&
          <Box>
            <ImageMonitoring />
            <br />
          </Box>
        }
      </Tabs>
      <CommonSaveBar loading={isCreateSettingLoading} visible={visible} handleDiscard={handleDiscard} handleSave={handleSave} />
    </Page>
  );
};

export default SettingPage;
