import React, { useEffect } from 'react';
import {
  Page,
  Card,
  Button,
  Text,
  ProgressBar,
  Badge,
  VideoThumbnail,
  BlockStack,
  InlineStack,
  Box,
} from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';
import { config_variable } from '../../helper/commonApi';
import { useAppFormik } from '../../contexts/FormikContext';
import { useDispatch, useSelector } from 'react-redux';
import { createSettingAsync, getAllSetting, getSubscriptionAsync } from '../../redux/slice/commonSlice';

export default function OnboardingComponent() {
  const dispatch = useDispatch();
  const { isSubscriptionLoading } = useSelector(getAllSetting);
  const navigate = useNavigate();
  const { values, setFieldValue } = useAppFormik();

  const currentStep = values?.onboarding?.step;
  const progress = (currentStep / 3) * 100;
  const storeLockEnabled = values.storeLockProtection.enabled;

  const handleEnableClick = () => {
    const themeUrl = `https://${config_variable?.shop_name}/admin/themes/current/editor?context=apps&template=head&activateAppId=${config_variable?.config?.apiKey}/main`;
    window.open(themeUrl, "_blank");
    setFieldValue('storeLockProtection.enabled', true);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setFieldValue('onboarding.step', currentStep + 1);
    }
  };

  const handleStartPlan = () => {
    dispatch(getSubscriptionAsync({
      callback: (success, message) => {
        if (success) {
          setFieldValue('onboarding.is_completed', true);
          dispatch(createSettingAsync({
            payload: {
              settings: {
                ...values,
                onboarding: {
                  ...values.onboarding,
                  is_completed: true,
                },
              },
            },
          }));
        } else {
          console.error('Subscription failed:', message);
        }
      }
    }));
  };

  return (
    <Page title="Get Started with Store Lock Protection">
      <Box paddingBlockEnd="400">
        <ProgressBar progress={progress} size="small" />
      </Box>

      {/* STEP 1 */}
      {currentStep === 1 && (
        <Card>
          <BlockStack gap="500">
            <BlockStack gap="300">
              <Text as="h2" variant="headingLg">
                Welcome to Store Lock Protection 🛡️
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                Your complete security solution for Shopify stores
              </Text>
            </BlockStack>

            <InlineStack gap="400" blockAlign="start" wrap={false}>
              <Box width="60%">
                <BlockStack gap="300">
                  <Text as="h3" variant="headingMd">
                    Why choose Store Lock Protection?
                  </Text>
                  <BlockStack gap="200">
                    <Text as="p" variant="bodyMd">
                      🔒 <Text as="span" fontWeight="semibold">Store Lock Protection</Text> - Add password-protected access to your storefront
                    </Text>
                    <Text as="p" variant="bodyMd">
                      🛡️ <Text as="span" fontWeight="semibold">Content Protection</Text> - Prevent unauthorized content copying and theft
                    </Text>
                    <Text as="p" variant="bodyMd">
                      🔔 <Text as="span" fontWeight="semibold">Real-time Notifications</Text> - Get instant alerts about security threats
                    </Text>
                    <Text as="p" variant="bodyMd">
                      📊 <Text as="span" fontWeight="semibold">Analytics Dashboard</Text> - Monitor protection metrics and blocked threats
                    </Text>
                  </BlockStack>
                  <Text as="p" variant="bodyMd" tone="subdued">
                    Watch the video to see how Store Lock Protection safeguards your store in just 2 minutes.
                  </Text>
                </BlockStack>
              </Box>

              <Box width="40%">
                <VideoThumbnail
                  videoLength={120}
                  thumbnailUrl="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=225&fit=crop"
                  onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
                />
              </Box>
            </InlineStack>

            <InlineStack align="start">
              <Button variant="primary" onClick={handleNextStep}>
                Next Step
              </Button>
            </InlineStack>
          </BlockStack>
        </Card>
      )}

      {/* STEP 2 */}
      {currentStep === 2 && (
        <Card>
          <BlockStack gap="500">
            <InlineStack align="space-between" blockAlign="center">
              <BlockStack gap="200">
                <Text as="h2" variant="headingLg">
                  Enable Store Lock Protection
                </Text>
                <Text as="p" variant="bodyMd" tone="subdued">
                  Add the Store Lock extension to your theme
                </Text>
              </BlockStack>
              <Badge tone={storeLockEnabled ? 'success' : 'critical'}>
                {storeLockEnabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </InlineStack>

            <BlockStack gap="300">
              <Text as="h3" variant="headingMd">
                What is Store Lock?
              </Text>
              <Text as="p" variant="bodyMd">
                Store Lock is a powerful theme extension that adds password protection and access restrictions
                to your storefront. Control who can view your store and when.
              </Text>
            </BlockStack>

            <Card background="bg-surface-secondary">
              <BlockStack gap="300">
                <Text as="h3" variant="headingMd">
                  Key Features
                </Text>
                <BlockStack gap="200">
                  <Text as="p" variant="bodyMd">
                    🧩 <Text as="span" fontWeight="semibold">Theme Integration</Text> - Seamlessly integrates with your current theme
                  </Text>
                  <Text as="p" variant="bodyMd">
                    🔒 <Text as="span" fontWeight="semibold">Password Protection</Text> - Restrict access with custom passwords
                  </Text>
                  <Text as="p" variant="bodyMd">
                    ⚡ <Text as="span" fontWeight="semibold">One-Click Setup</Text> - Enable in seconds, no coding required
                  </Text>
                  <Text as="p" variant="bodyMd">
                    🎨 <Text as="span" fontWeight="semibold">Customizable</Text> - Match your store's branding perfectly
                  </Text>
                </BlockStack>
              </BlockStack>
            </Card>

            <InlineStack gap="300" align="space-between">
              <InlineStack gap="200">
                {!storeLockEnabled && (
                  <Button variant="primary" onClick={handleEnableClick}>
                    Enable Store Lock
                  </Button>
                )}
                {storeLockEnabled && (
                  <Button variant="primary" onClick={handleNextStep}>
                    Next Step
                  </Button>
                )}
              </InlineStack>
            </InlineStack>
          </BlockStack>
        </Card>
      )}

      {/* STEP 3 */}
      {currentStep === 3 && (
        <Card>
          <BlockStack gap="500">
            <BlockStack gap="200">
              <Text as="h2" variant="headingLg">
                Start Protecting Your Store
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                Choose your plan and get started with our 5-day free trial
              </Text>
            </BlockStack>

            <Box padding="400" background="bg-surface-success" borderRadius="200">
              <InlineStack gap="200" blockAlign="center">
                <Text as="p" variant="bodyMd" fontWeight="semibold">
                  🎉 Special Offer:
                </Text>
                <Text as="p" variant="bodyMd">
                  Start your 5-day free trial today - no credit card required!
                </Text>
              </InlineStack>
            </Box>

            {/* Plan Section */}
            <Card background="bg-surface-secondary">
              <BlockStack gap="400">
                <InlineStack align="space-between" blockAlign="center">
                  <BlockStack gap="100">
                    <Text as="h3" variant="headingMd">
                      💼 Starter Plan
                    </Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      Perfect for small to medium stores
                    </Text>
                  </BlockStack>
                  <BlockStack gap="0" inlineAlign="end">
                    <Text as="p" variant="headingLg">
                      $5
                    </Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      per month
                    </Text>
                  </BlockStack>
                </InlineStack>

                <Box paddingBlock="200">
                  <div style={{ height: '1px', background: 'var(--p-color-border)' }} />
                </Box>

                <BlockStack gap="300">
                  <Text as="h3" variant="headingMd">
                    What's Included
                  </Text>
                  <BlockStack gap="200">
                    <Text as="p" variant="bodyMd">
                      ✓ <Text as="span" fontWeight="semibold">Store Lock Protection</Text> - Full access control
                    </Text>
                    <Text as="p" variant="bodyMd">
                      ✓ <Text as="span" fontWeight="semibold">Content Protection Module</Text> - Anti-copy features
                    </Text>
                    <Text as="p" variant="bodyMd">
                      ✓ <Text as="span" fontWeight="semibold">Real-time Notifications</Text> - Instant threat alerts
                    </Text>
                    <Text as="p" variant="bodyMd">
                      ✓ <Text as="span" fontWeight="semibold">Analytics Dashboard</Text> - Track all metrics
                    </Text>
                    <Text as="p" variant="bodyMd">
                      ✓ <Text as="span" fontWeight="semibold">24/7 Priority Support</Text> - We're always here
                    </Text>
                  </BlockStack>
                </BlockStack>

                <Box paddingBlockStart="200">
                  <Text as="p" variant="bodySm" tone="subdued">
                    Cancel anytime. No long-term commitment required.
                  </Text>
                </Box>
              </BlockStack>
            </Card>

            <InlineStack gap="300" align="space-between">
              <Button loading={isSubscriptionLoading} variant="primary" onClick={handleStartPlan}>
                Start 5-Day Free Trial
              </Button>
            </InlineStack>
          </BlockStack>
        </Card>
      )}
    </Page>
  );
}
