import React, { useState } from 'react';
import {
    Card,
    BlockStack,
    Text,
    Button,
    InlineStack,
    ProgressBar,
    Banner,
    Modal,
    TextContainer,
} from '@shopify/polaris';

const ComplianceRetentionTab = () => {
    const [gdprMode, setGdprMode] = useState(true);
    const [disableCookies, setDisableCookies] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleUpdateRetention = () => {
    };

    const handleExportData = () => {
    };

    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    const confirmDeleteAccount = () => {
        setShowDeleteModal(false);
    };

    return (
        <BlockStack gap="400">
            {/* Info Banner */}
            <Banner tone="info">
                <p>
                    System ensures legal compliance while protecting merchant privacy. All data handling follows industry best practices and regulatory requirements.
                </p>
            </Banner>
            {/* Data Retention Policies */}
            <Card>
                <BlockStack gap="400">
                    <Text as="h2" variant="headingMd">
                        🧾 Data Retention Policies
                    </Text>

                    <BlockStack gap="300">
                        <BlockStack gap="200">
                            <InlineStack align="space-between">
                                <Text as="p" variant="bodyMd">Evidence Retention</Text>
                                <Text as="p" variant="bodyMd" tone="subdued">90 days</Text>
                            </InlineStack>
                            <ProgressBar progress={75} tone="primary" />
                            <Text as="p" variant="bodySm" tone="subdued">
                                67 days remaining until auto-cleanup
                            </Text>
                        </BlockStack>

                        <BlockStack gap="200">
                            <InlineStack align="space-between">
                                <Text as="p" variant="bodyMd">DMCA Case Retention</Text>
                                <Text as="p" variant="bodyMd" tone="subdued">Permanent</Text>
                            </InlineStack>
                            <ProgressBar progress={100} tone="success" />
                            <Text as="p" variant="bodySm" tone="subdued">
                                All DMCA cases stored indefinitely for legal compliance
                            </Text>
                        </BlockStack>

                        <BlockStack gap="200">
                            <InlineStack align="space-between">
                                <Text as="p" variant="bodyMd">Non-Case Evidence</Text>
                                <Text as="p" variant="bodyMd" tone="subdued">Auto-delete after 90 days</Text>
                            </InlineStack>
                            <ProgressBar progress={60} tone="primary" />
                            <Text as="p" variant="bodySm" tone="subdued">
                                Evidence not linked to DMCA cases will be automatically removed
                            </Text>
                        </BlockStack>
                    </BlockStack>

                    <InlineStack gap="200">
                        <Button onClick={handleUpdateRetention}>
                            Update Retention Policy
                        </Button>
                    </InlineStack>
                </BlockStack>
            </Card>

            {/* Data Privacy & GDPR Controls */}
            <Card>
                <BlockStack gap="400">
                    <Text as="h2" variant="headingMd">
                        🔐 Data Privacy & GDPR Controls
                    </Text>

                    <BlockStack gap="300">
                        <InlineStack align="space-between" blockAlign="center">
                            <BlockStack gap="100">
                                <Text as="p" variant="bodyMd">GDPR Compliance Mode</Text>
                                <Text as="p" variant="bodySm" tone="subdued">
                                    Ensures all data handling meets GDPR requirements
                                </Text>
                            </BlockStack>
                            <Button
                                onClick={() => setGdprMode(!gdprMode)}
                                variant={gdprMode ? 'primary' : 'secondary'}
                            >
                                {gdprMode ? 'Enabled ✅' : 'Disabled'}
                            </Button>
                        </InlineStack>

                        <InlineStack align="space-between" blockAlign="center">
                            <BlockStack gap="100">
                                <Text as="p" variant="bodyMd">Disable Cookies</Text>
                                <Text as="p" variant="bodySm" tone="subdued">
                                    No tracking or analytics cookies
                                </Text>
                            </BlockStack>
                            <Button
                                onClick={() => setDisableCookies(!disableCookies)}
                                variant={disableCookies ? 'primary' : 'secondary'}
                            >
                                {disableCookies ? 'Enabled ✅' : 'Disabled'}
                            </Button>
                        </InlineStack>
                    </BlockStack>

                    <InlineStack gap="200">
                        <Button onClick={handleExportData}>
                            Export My Data
                        </Button>
                        <Button tone="critical" onClick={handleDeleteAccount}>
                            Delete My Account Data
                        </Button>
                    </InlineStack>
                </BlockStack>
            </Card>

            {/* Delete Confirmation Modal */}
            <Modal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="⚠️ Confirm Account Data Deletion"
                primaryAction={{
                    content: 'Confirm Deletion',
                    onAction: confirmDeleteAccount,
                    destructive: true,
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: () => setShowDeleteModal(false),
                    },
                ]}
            >
                <Modal.Section>
                    <TextContainer>
                        <Text as="p" variant="bodyMd">
                            <strong>Legal Warning:</strong> This action will permanently delete all your account data, including:
                        </Text>
                        <BlockStack gap="200">
                            <Text as="p" variant="bodySm">• All site configurations</Text>
                            <Text as="p" variant="bodySm">• Detection history</Text>
                            <Text as="p" variant="bodySm">• DMCA cases and notices</Text>
                            <Text as="p" variant="bodySm">• Evidence files</Text>
                            <Text as="p" variant="bodySm">• Monitored images</Text>
                        </BlockStack>
                        <Text as="p" variant="bodyMd" tone="critical">
                            This action cannot be undone. Please confirm you want to proceed.
                        </Text>
                    </TextContainer>
                </Modal.Section>
            </Modal>
        </BlockStack>
    );
};

export default ComplianceRetentionTab;