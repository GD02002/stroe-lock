import React, { useState } from 'react';
import {
  Card,
  BlockStack,
  InlineStack,
  Text,
  Badge,
  Checkbox,
  Button,
  Modal,
  TextField,
  Banner,
  Tooltip,
  Icon,
} from '@shopify/polaris';
import { QuestionCircleIcon } from '@shopify/polaris-icons';

const CopyPrevention = ({ setVisible, values, setFieldValue }) => {
  const [warningModalActive, setWarningModalActive] = useState(false);
  const [previewModalActive, setPreviewModalActive] = useState(false);

  const copyPreventionData = values.copyPrevention;

  const handleToggleEnable = () => {
    setFieldValue('copyPrevention.enabled', !copyPreventionData.enabled);
    setVisible(true);
  };

  const handleSaveSettings = () => {
    setVisible(true);
  };

  const handleResetToDefault = () => {
    setFieldValue('copyPrevention.enabled', true);
    setFieldValue('copyPrevention.preventCopy', true);
    setFieldValue('copyPrevention.disableRightClick', true);
    setFieldValue('copyPrevention.showWarning', false);
    setFieldValue('copyPrevention.blockDevTools', false);
    setFieldValue('copyPrevention.warningMessage', 'Content copying is disabled on this website for protection purposes.');
    setVisible(true);
  };

  return (
    <Card>
      <BlockStack gap="400">
        {/* Section Header */}
        <InlineStack align="space-between" blockAlign="center">
          <BlockStack gap="100">
            <InlineStack gap="200" blockAlign="center">
              <Text as="h2" variant="headingMd">
                Copy Prevention
              </Text>
              <Tooltip content="Helps protect text and images from being copied or downloaded">
                <Icon source={QuestionCircleIcon} tone="base" />
              </Tooltip>
            </InlineStack>
            <Text as="p" variant="bodyMd" tone="subdued">
              Control how your store's content can be copied or shared by visitors.
            </Text>
          </BlockStack>
        </InlineStack>

        {/* Status Area */}
        <InlineStack align="space-between" blockAlign="center">
          <Text as="p" variant="bodyMd" fontWeight="semibold">
            Enable Copy Prevention
          </Text>
          <InlineStack gap="300" blockAlign="center">
            <Badge tone={copyPreventionData.enabled ? 'success' : 'critical'}>
              {copyPreventionData.enabled ? 'Enabled' : 'Disabled'}
            </Badge>
            <Button onClick={handleToggleEnable}>
              {copyPreventionData.enabled ? 'Disable' : 'Enable'}
            </Button>
          </InlineStack>
        </InlineStack>

        {/* Settings Panel (visible only when enabled) */}
        {copyPreventionData.enabled && (
          <BlockStack gap="400">
            <Card background="bg-surface-secondary">
              <BlockStack gap="300">
                <Text as="h3" variant="headingSm">
                  Protection Settings
                </Text>

                <Checkbox
                  label="Block text and image copying"
                  checked={copyPreventionData.preventCopy}
                  onChange={(value) => setFieldValue('copyPrevention.preventCopy', value)}
                  helpText="Prevent users from selecting and copying content"
                />

                <Checkbox
                  label="Disable right-click menu"
                  checked={copyPreventionData.disableRightClick}
                  onChange={(value) => setFieldValue('copyPrevention.disableRightClick', value)}
                  helpText="Block context menu access on your store"
                />

                <Checkbox
                  label="Display warning when copy detected"
                  checked={copyPreventionData.showWarning}
                  onChange={(value) => {
                    setFieldValue('copyPrevention.showWarning', value);
                    if (value) {
                      setWarningModalActive(true);
                    }
                  }}
                  helpText="Show a custom message to users attempting to copy"
                />

                <Checkbox
                  label="Detect and block dev tools access"
                  checked={copyPreventionData.blockDevTools}
                  onChange={(value) => setFieldValue('copyPrevention.blockDevTools', value)}
                  helpText="Prevent browser developer tools from being opened"
                />

                <InlineStack gap="200" blockAlign="center">
                  <Text as="p" variant="bodySm" tone="subdued">
                    ℹ️ Browser Support: Works on major browsers (Chrome, Safari, Firefox, Edge)
                  </Text>
                </InlineStack>
              </BlockStack>
            </Card>

            {/* Footer Area */}
            <InlineStack gap="200">
              <Button variant="primary" onClick={handleSaveSettings}>
                Save Settings
              </Button>
              <Button onClick={handleResetToDefault}>
                Reset to Default
              </Button>
            </InlineStack>
          </BlockStack>
        )}

        {/* Educational Section */}
        <Banner tone="info">
          <BlockStack gap="200">
            <Text as="p" variant="bodyMd" fontWeight="semibold">
              Did you know?
            </Text>
            <Text as="p" variant="bodyMd">
              Copy prevention helps discourage casual content theft, but no system can guarantee
              100% protection.
            </Text>
          </BlockStack>
        </Banner>
      </BlockStack>

      {/* Custom Warning Message Modal */}
      <Modal
        open={warningModalActive}
        onClose={() => setWarningModalActive(false)}
        title="Custom Warning Message"
        primaryAction={{
          content: 'Save',
          onAction: () => {
            setWarningModalActive(false);
          },
        }}
        secondaryActions={[
          {
            content: 'Preview',
            onAction: () => {
              setPreviewModalActive(true);
            },
          },
          {
            content: 'Cancel',
            onAction: () => setWarningModalActive(false),
          },
        ]}
      >
        <Modal.Section>
          <BlockStack gap="400">
            <TextField
              label="Warning message"
              value={copyPreventionData.warningMessage}
              onChange={(value) => setFieldValue('copyPrevention.warningMessage', value)}
              multiline={4}
              autoComplete="off"
              helpText="This message will be displayed when users attempt to copy content"
            />
          </BlockStack>
        </Modal.Section>
      </Modal>

      {/* Preview Modal */}
      <Modal
        open={previewModalActive}
        onClose={() => setPreviewModalActive(false)}
        title="Warning Message Preview"
        primaryAction={{
          content: 'Close',
          onAction: () => setPreviewModalActive(false),
        }}
      >
        <Modal.Section>
          <Banner tone="warning">
            <Text as="p" variant="bodyMd">
              {copyPreventionData.warningMessage}
            </Text>
          </Banner>
        </Modal.Section>
      </Modal>
    </Card>
  );
};

export default CopyPrevention;
