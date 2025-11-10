import React, { createContext, useContext, useEffect } from 'react';
import { useFormik } from 'formik';

const defaultValues = {
  onboarding: {
    step: 1,
    is_completed: false,
  },
  storeLockProtection: {
    enabled: false,
  },
  copyPrevention: {
    enabled: false,
    preventCopy: true,
    disableRightClick: true,
    showWarning: false,
    blockDevTools: false,
    warningMessage:
      'Content copying is disabled on this website for protection purposes.',
    privacyRequirement: {
      verified: false,
    },
  },
  cloneDetection: {
    beaconProtectionEnabled: true,
    detectedBeacons: 0,
    sslStatus: 'secure',
    domainVerified: 'your-store.myshopify.com',
    reverseSearchEnabled: true,
    scanType: 'both',
    fingerprintId: '',
    fingerprintActive: false,
    clonedDomainsFound: 0,
    imagesCopied: 0,
    textMatches: 0,
  },
  evidenceCollection: {
    autoScreenshotEnabled: true,
    lastCapture: '2025-11-03T15:58:42.346Z',
    retentionDays: 90,
    permanentForLegal: true,
  },
  dmcaWorkflow: {
    merchantName: '',
    contactEmail: '',
    domain: '',
    infringingURl: '',
    description: '',
    checked: false,
    cases: [],
  },
  safetyReporting: {
    googleSafeBrowsing: true,
    microsoftSmartScreen: true,
    cleanDNS: true,
    openPhish: true,
  },
};

const FormikContext = createContext(null);

export const FormikProvider = ({ children, initialData }) => {
  const formik = useFormik({
    initialValues: initialData || defaultValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log('Form Data (JSON):', JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (initialData) {
      formik.resetForm({ values: initialData });
    }
  }, [initialData]);

  return (
    <FormikContext.Provider value={formik}>{children}</FormikContext.Provider>
  );
};

export const useAppFormik = () => {
  const context = useContext(FormikContext);
  if (!context) {
    throw new Error('useAppFormik must be used within FormikProvider');
  }
  return context;
};

export const getFormDataAsJSON = (values) => {
  return JSON.stringify(values, null, 2);
};
