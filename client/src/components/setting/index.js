import React from 'react';
import {
    Card,
    Badge,
    Button,
    BlockStack,
    InlineStack,
    Text,
    // Grid,
} from '@shopify/polaris';

export default function SettingComponent({ setVisible, values, setFieldValue }) {
    const handleManageStoreLock = () => {
        setFieldValue('storeLockProtection.enabled', !values?.storeLockProtection?.enabled);
        setVisible(true);
    };
    return (
        <Card>
            <BlockStack gap="400">
                <InlineStack align="space-between" blockAlign="center">
                    <Text as="h2" variant="headingMd">
                        🔒 Store Lock Protection
                    </Text>
                    <Badge tone={values?.storeLockProtection?.enabled ? "success" : "critical"}>{values?.storeLockProtection?.enabled ? 'Enabled' : 'Disabled'}</Badge>
                </InlineStack>

                <Text as="p" variant="bodyMd" tone="subdued">
                    Your store is protected with Store Lock. Content restrictions are active.
                </Text>

                <BlockStack gap="200">
                    <Text as="p" variant="bodySm">
                        • Password protection active
                    </Text>
                    <Text as="p" variant="bodySm">
                        • Content safety enabled
                    </Text>
                    <Text as="p" variant="bodySm">
                        • Theme block installed
                    </Text>
                </BlockStack>

                <InlineStack gap="200">
                    <Button variant='primary' tone={values?.storeLockProtection?.enabled ? 'critical' : ''} onClick={handleManageStoreLock}>
                        {values?.storeLockProtection?.enabled ? 'Disabled Store Lock' : 'Enabled Store Lock'}
                    </Button>
                </InlineStack>
            </BlockStack>
        </Card>
    );
}
