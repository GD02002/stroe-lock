import React, { useState } from 'react';
import {
    Card,
    Badge,
    Button,
    BlockStack,
    InlineStack,
    Text,
    Select,
    Banner,
    Divider,
} from '@shopify/polaris';

const CloneDetection = ({ setVisible, values, setFieldValue }) => {
    const cloneDetection = values.cloneDetection;

    const handleToggleBeaconProtection = () => {
        setFieldValue('cloneDetection.beaconProtectionEnabled', !cloneDetection.beaconProtectionEnabled);
        setVisible(true);
    };

    const handleManualScan = () => {
    };

    const handleRecheckVerification = () => {
    };

    const handleToggleReverseSearch = () => {
        setFieldValue('cloneDetection.reverseSearchEnabled', !cloneDetection.reverseSearchEnabled);
        setVisible(true);
    };

    const handleScanTypeChange = (value) => {
        setFieldValue('cloneDetection.scanType', value);
        setVisible(true);
    };

    const handleStartScan = () => {
    };

    const handleGenerateFingerprint = () => {
        const newFingerprint = `FP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        setFieldValue('cloneDetection.fingerprintId', newFingerprint);
        setFieldValue('cloneDetection.fingerprintActive', true);
        setVisible(true);
    };

    const handleViewReport = () => {
        setVisible(true);
    };

    const totalClones =
        cloneDetection.detectedBeacons +
        cloneDetection.clonedDomainsFound +
        cloneDetection.imagesCopied +
        cloneDetection.textMatches;

    return (
        <Card>
            <BlockStack gap="500">
                {/* Section 1: JavaScript Beacon Detection */}
                <BlockStack gap="300">
                    <InlineStack align="space-between" blockAlign="center">
                        <Text as="h3" variant="headingMd">
                            Active Beacon Scanner
                        </Text>
                        <Badge tone={cloneDetection.beaconProtectionEnabled ? 'success' : 'critical'}>
                            {cloneDetection.beaconProtectionEnabled ? 'Enabled' : 'Disabled'}
                        </Badge>
                    </InlineStack>

                    <Text as="p" variant="bodySm" tone="subdued">
                        Detects and blocks cloned scripts running outside your verified domain.
                    </Text>

                    <BlockStack gap="200">
                        <InlineStack gap="300" blockAlign="center">
                            <Button
                                onClick={handleToggleBeaconProtection}
                                tone={cloneDetection.beaconProtectionEnabled ? 'critical' : 'success'}
                            >
                                {cloneDetection.beaconProtectionEnabled ? 'Disable' : 'Enable'} Beacon Protection
                            </Button>
                            <Text as="p" variant="bodySm">
                                Detected Beacons: <strong>{cloneDetection.detectedBeacons}</strong>
                            </Text>
                        </InlineStack>

                        <InlineStack gap="200">
                            <Button onClick={handleManualScan}>
                                Run Manual Scan
                            </Button>
                        </InlineStack>

                        <Text as="p" variant="bodySm" tone="subdued">
                            💡 Beacon scan runs automatically every 6 hours.
                        </Text>
                    </BlockStack>
                </BlockStack>
                <Divider borderColor='border' />
                {/* Section 2: SSL & Domain Monitoring */}
                <BlockStack gap="300">
                    <Text as="h3" variant="headingMd">
                        SSL & Domain Integrity Check
                    </Text>

                    <Text as="p" variant="bodySm" tone="subdued">
                        Verifies that your site's SSL certificate and domain records match your Shopify store.
                    </Text>

                    <BlockStack gap="200">
                        <InlineStack gap="400">
                            <Text as="p" variant="bodySm">
                                SSL Status: <strong>{cloneDetection.sslStatus === 'secure' ? '✅ Secure' : '⚠️ Invalid'}</strong>
                            </Text>
                            <Text as="p" variant="bodySm">
                                Domain Status: <strong>Verified: {cloneDetection.domainVerified}</strong>
                            </Text>
                        </InlineStack>

                        <InlineStack gap="200">
                            <Button onClick={handleRecheckVerification}>
                                Recheck Verification
                            </Button>
                        </InlineStack>

                        <Text as="p" variant="bodySm" tone="subdued">
                            💡 Re-verification ensures cloned or phishing domains are blocked.
                        </Text>
                    </BlockStack>
                </BlockStack>
                <Divider borderColor='border' />
                {/* Section 3: Reverse Image & Content Search */}
                <BlockStack gap="300">
                    <InlineStack align="space-between" blockAlign="center">
                        <Text as="h3" variant="headingMd">
                            Image & Content Protection
                        </Text>
                        <Badge tone={cloneDetection.reverseSearchEnabled ? 'success' : 'critical'}>
                            {cloneDetection.reverseSearchEnabled ? 'Enabled' : 'Disabled'}
                        </Badge>
                    </InlineStack>

                    <Text as="p" variant="bodySm" tone="subdued">
                        Automatically detects copied product images or store text across the web.
                    </Text>

                    <BlockStack gap="200">
                        <InlineStack gap="200">
                            <Button
                                onClick={handleToggleReverseSearch}
                                tone={cloneDetection.reverseSearchEnabled ? 'critical' : 'success'}
                            >
                                {cloneDetection.reverseSearchEnabled ? 'Disable' : 'Enable'} Reverse Search
                            </Button>
                        </InlineStack>

                        <Select
                            label="Scan Type"
                            options={[
                                { label: 'Images', value: 'images' },
                                { label: 'Text', value: 'text' },
                                { label: 'Both', value: 'both' },
                            ]}
                            value={cloneDetection.scanType}
                            onChange={handleScanTypeChange}
                        />

                        <InlineStack gap="200">
                            <Button onClick={handleStartScan}>
                                Start Scan Now
                            </Button>
                        </InlineStack>

                        <Banner tone="info">
                            Result: No clones detected yet
                        </Banner>

                        <Text as="p" variant="bodySm" tone="subdued">
                            💡 You'll receive alerts if any copied content is found.
                        </Text>
                    </BlockStack>
                </BlockStack>
                <Divider borderColor='border' />
                {/* Section 4: Content Fingerprinting */}
                <BlockStack gap="300">
                    <InlineStack align="space-between" blockAlign="center">
                        <Text as="h3" variant="headingMd">
                            Unique Store Fingerprint
                        </Text>
                        <Badge tone={cloneDetection.fingerprintActive ? 'success' : 'critical'}>
                            {cloneDetection.fingerprintActive ? '🟢 Active' : '🔴 Inactive'}
                        </Badge>
                    </InlineStack>

                    <Text as="p" variant="bodySm" tone="subdued">
                        Generates a unique fingerprint for your store's content to detect duplicates anywhere online.
                    </Text>

                    <BlockStack gap="200">
                        <InlineStack gap="200">
                            <Button onClick={handleGenerateFingerprint}>
                                Generate Fingerprint
                            </Button>
                        </InlineStack>

                        {cloneDetection.fingerprintId && (
                            <Text as="p" variant="bodySm">
                                Fingerprint ID: <strong>{cloneDetection.fingerprintId}</strong>
                            </Text>
                        )}

                        <Text as="p" variant="bodySm" tone="subdued">
                            💡 Used for automatic detection and proof of ownership.
                        </Text>
                    </BlockStack>
                </BlockStack>
                <Divider borderColor='border' />
                {/* Section 5: Clone Detection Summary */}
                <BlockStack gap="300">
                    <Text as="h3" variant="headingMd">
                        Summary & Reports
                    </Text>

                    <BlockStack gap="200">
                        <InlineStack gap="400" wrap>
                            <Text as="p" variant="bodySm">
                                Beacons Detected: <strong>{cloneDetection.detectedBeacons}</strong>
                            </Text>
                            <Text as="p" variant="bodySm">
                                Cloned Domains Found: <strong>{cloneDetection.clonedDomainsFound}</strong>
                            </Text>
                            <Text as="p" variant="bodySm">
                                Images Copied: <strong>{cloneDetection.imagesCopied}</strong>
                            </Text>
                            <Text as="p" variant="bodySm">
                                Text Matches: <strong>{cloneDetection.textMatches}</strong>
                            </Text>
                        </InlineStack>

                        <InlineStack gap="200">
                            <Button onClick={handleViewReport}>
                                View Detailed Report
                            </Button>
                        </InlineStack>

                        <Banner tone={totalClones === 0 ? 'success' : 'warning'}>
                            {totalClones === 0 ? '✅ Secure — No Clones Found' : '⚠️ Action Required — Clones Detected'}
                        </Banner>
                    </BlockStack>
                </BlockStack>
            </BlockStack>
        </Card>
    );
};

export default CloneDetection;
