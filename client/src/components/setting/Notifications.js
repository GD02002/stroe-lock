import React, { useState } from 'react';
import {
    Card,
    BlockStack,
    Text,
    Button,
    InlineStack,
    IndexTable,
    Badge,
    Select,
    Modal,
} from '@shopify/polaris';

const Notifications = () => {
    const [cloneDetectionAlerts, setCloneDetectionAlerts] = useState(true);
    const [dmcaCaseUpdates, setDmcaCaseUpdates] = useState(true);
    const [deliveryMethod, setDeliveryMethod] = useState('both');
    const [emailPreviewModal, setEmailPreviewModal] = useState(false);
    const [previewType, setPreviewType] = useState('with-screenshot');

    // Recent Notifications Data
    const notificationsRows = [
        { id: '1', title: 'Clone site detected: fake-store-clone.com', date: '2024-01-15 10:30', status: 'Unread' },
        { id: '2', title: 'DMCA Notice sent for CASE-001', date: '2024-01-15 09:15', status: 'Read' },
        { id: '3', title: 'Safety report submitted successfully', date: '2024-01-14 16:45', status: 'Read' },
        { id: '4', title: 'New match found for product-2.jpg', date: '2024-01-14 14:20', status: 'Unread' },
        { id: '5', title: 'CASE-002: Response received', date: '2024-01-13 11:30', status: 'Read' },
    ];

    const handleMarkAllRead = () => {
    };

    const handleViewAction = (id) => {
    };

    const handleSavePreferences = () => {
    };

    const handlePreviewEmail = (type) => {
        setPreviewType(type);
        setEmailPreviewModal(true);
    };

    return (
        <BlockStack gap="400">
            {/* Email Alerts */}
            <Card>
                <BlockStack gap="400">
                    <Text as="h2" variant="headingMd">
                        📧 Email Alerts
                    </Text>

                    <BlockStack gap="300">
                        <InlineStack align="space-between" blockAlign="center">
                            <BlockStack gap="100">
                                <Text as="p" variant="bodyMd">Clone Detection Alerts</Text>
                                <Text as="p" variant="bodySm" tone="subdued">
                                    Receive email when a clone site is detected
                                </Text>
                            </BlockStack>
                            <Button
                                onClick={() => setCloneDetectionAlerts(!cloneDetectionAlerts)}
                                variant={cloneDetectionAlerts ? 'primary' : 'secondary'}
                            >
                                {cloneDetectionAlerts ? 'Enabled ✅' : 'Disabled'}
                            </Button>
                        </InlineStack>

                        <InlineStack align="space-between" blockAlign="center">
                            <BlockStack gap="100">
                                <Text as="p" variant="bodyMd">DMCA Case Updates</Text>
                                <Text as="p" variant="bodySm" tone="subdued">
                                    Get notified about case status changes
                                </Text>
                            </BlockStack>
                            <Button
                                onClick={() => setDmcaCaseUpdates(!dmcaCaseUpdates)}
                                variant={dmcaCaseUpdates ? 'primary' : 'secondary'}
                            >
                                {dmcaCaseUpdates ? 'Enabled ✅' : 'Disabled'}
                            </Button>
                        </InlineStack>
                    </BlockStack>

                    <InlineStack gap="200">
                        <Button onClick={() => handlePreviewEmail('with-screenshot')}>
                            Preview Email (With Screenshot)
                        </Button>
                        <Button onClick={() => handlePreviewEmail('without-screenshot')}>
                            Preview Email (Without Screenshot)
                        </Button>
                    </InlineStack>
                </BlockStack>
            </Card>

            {/* In-App Notifications */}
            <Card>
                <BlockStack gap="400">
                    <InlineStack align="space-between" blockAlign="center">
                        <Text as="h2" variant="headingMd">
                            🔔 In-App Notifications
                        </Text>
                        <Button onClick={handleMarkAllRead}>
                            Mark All Read
                        </Button>
                    </InlineStack>

                    <IndexTable
                        itemCount={notificationsRows.length}
                        headings={[
                            { title: 'Title' },
                            { title: 'Date' },
                            { title: 'Status' },
                            { title: 'Action' },
                        ]}
                        selectable={false}
                    >
                        {notificationsRows.map((row, index) => (
                            <IndexTable.Row id={row.id} key={row.id} position={index}>
                                <IndexTable.Cell>{row.title}</IndexTable.Cell>
                                <IndexTable.Cell>{row.date}</IndexTable.Cell>
                                <IndexTable.Cell>
                                    <Badge tone={row.status === 'Unread' ? 'attention' : 'success'}>
                                        {row.status}
                                    </Badge>
                                </IndexTable.Cell>
                                <IndexTable.Cell>
                                    <Button size="slim" onClick={() => handleViewAction(row.id)}>
                                        View
                                    </Button>
                                </IndexTable.Cell>
                            </IndexTable.Row>
                        ))}
                    </IndexTable>
                </BlockStack>
            </Card>

            {/* Preferences */}
            <Card>
                <BlockStack gap="400">
                    <Text as="h2" variant="headingMd">
                        ⚙️ Notification Preferences
                    </Text>

                    <BlockStack gap="300">
                        <Select
                            label="Notification Delivery"
                            options={[
                                { label: 'Email Only', value: 'email' },
                                { label: 'In-App Only', value: 'in-app' },
                                { label: 'Both Email and In-App', value: 'both' },
                            ]}
                            value={deliveryMethod}
                            onChange={setDeliveryMethod}
                        />

                        <Text as="p" variant="bodySm" tone="subdued">
                            Choose how you want to receive notifications about clone detections, DMCA updates, and security alerts.
                        </Text>
                        <InlineStack align='start'>
                            <Button variant="primary" onClick={handleSavePreferences}>
                                Save Preferences
                            </Button>
                        </InlineStack>
                    </BlockStack>
                </BlockStack>
            </Card>

            {/* Email Preview Modal */}
            <Modal
                open={emailPreviewModal}
                onClose={() => setEmailPreviewModal(false)}
                title={previewType === 'with-screenshot' ? 'Email Preview (With Screenshot)' : 'Email Preview (Without Screenshot)'}
            >
                <Modal.Section>
                    <BlockStack gap="400">
                        <div
                            style={{
                                border: '1px solid var(--p-color-border)',
                                borderRadius: '8px',
                                padding: '20px',
                                backgroundColor: '#ffffff',
                            }}
                        >
                            {previewType === 'with-screenshot' ? (
                                // Email with screenshot
                                <BlockStack gap="300">
                                    <Text as="h2" variant="headingLg" tone="subdued">
                                        🚨 Clone Site Detected
                                    </Text>

                                    <Text as="p" variant="bodyMd">
                                        Hi there,
                                    </Text>

                                    <Text as="p" variant="bodyMd">
                                        We've detected a potential clone of your store:
                                    </Text>

                                    <Card>
                                        <BlockStack gap="200">
                                            <Text as="p" variant="bodySm">
                                                <strong>Domain:</strong> fake-store-clone.com
                                            </Text>
                                            <Text as="p" variant="bodySm">
                                                <strong>Detection Date:</strong> January 15, 2024 at 10:30 AM
                                            </Text>
                                            <Text as="p" variant="bodySm">
                                                <strong>Similarity Score:</strong> 94%
                                            </Text>
                                            <Text as="p" variant="bodySm">
                                                <strong>Detection Type:</strong> Clone Site
                                            </Text>
                                        </BlockStack>
                                    </Card>

                                    <Text as="p" variant="bodyMd">
                                        <strong>Evidence Screenshot:</strong>
                                    </Text>

                                    <div
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            backgroundColor: '#f4f4f4',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '2px dashed var(--p-color-border)',
                                        }}
                                    >
                                        <BlockStack gap="200">
                                            <Text as="p" variant="bodyMd" alignment="center" tone="subdued">
                                                📸 Screenshot of Clone Site
                                            </Text>
                                            <Text as="p" variant="bodySm" alignment="center" tone="subdued">
                                                (Evidence capture showing side-by-side comparison)
                                            </Text>
                                        </BlockStack>
                                    </div>

                                    <Card background="bg-surface-secondary">
                                        <Text as="p" variant="bodySm">
                                            <strong>Next Steps:</strong>
                                        </Text>
                                        <BlockStack gap="100">
                                            <Text as="p" variant="bodySm">
                                                • Review the evidence in your dashboard
                                            </Text>
                                            <Text as="p" variant="bodySm">
                                                • Generate a DMCA notice
                                            </Text>
                                            <Text as="p" variant="bodySm">
                                                • Report to safety services
                                            </Text>
                                        </BlockStack>
                                    </Card>

                                    <div
                                        style={{
                                            padding: '12px',
                                            backgroundColor: '#0078d4',
                                            color: 'white',
                                            borderRadius: '6px',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Text as="p" variant="bodyMd">
                                            View in Dashboard →
                                        </Text>
                                    </div>

                                    <Text as="p" variant="bodySm" tone="subdued" alignment="center">
                                        © 2024 StoreLock Protection. All rights reserved.
                                    </Text>
                                </BlockStack>
                            ) : (
                                // Email without screenshot
                                <BlockStack gap="300">
                                    <Text as="h2" variant="headingLg" tone="subdued">
                                        🚨 Clone Site Detected
                                    </Text>

                                    <Text as="p" variant="bodyMd">
                                        Hi there,
                                    </Text>

                                    <Text as="p" variant="bodyMd">
                                        We've detected a potential clone of your store:
                                    </Text>

                                    <Card>
                                        <BlockStack gap="200">
                                            <Text as="p" variant="bodySm">
                                                <strong>Domain:</strong> fake-store-clone.com
                                            </Text>
                                            <Text as="p" variant="bodySm">
                                                <strong>Detection Date:</strong> January 15, 2024 at 10:30 AM
                                            </Text>
                                            <Text as="p" variant="bodySm">
                                                <strong>Similarity Score:</strong> 94%
                                            </Text>
                                            <Text as="p" variant="bodySm">
                                                <strong>Detection Type:</strong> Clone Site
                                            </Text>
                                        </BlockStack>
                                    </Card>

                                    <Card background="bg-surface-secondary">
                                        <Text as="p" variant="bodySm">
                                            <strong>Evidence Collected:</strong>
                                        </Text>
                                        <BlockStack gap="100">
                                            <Text as="p" variant="bodySm">
                                                • Visual similarity: 94% match
                                            </Text>
                                            <Text as="p" variant="bodySm">
                                                • SSL certificate data captured
                                            </Text>
                                            <Text as="p" variant="bodySm">
                                                • WHOIS information recorded
                                            </Text>
                                            <Text as="p" variant="bodySm">
                                                • Server location: US-East
                                            </Text>
                                        </BlockStack>
                                    </Card>

                                    <Card background="bg-surface-secondary">
                                        <Text as="p" variant="bodySm">
                                            <strong>Recommended Actions:</strong>
                                        </Text>
                                        <BlockStack gap="100">
                                            <Text as="p" variant="bodySm">
                                                1. Review complete evidence package in dashboard
                                            </Text>
                                            <Text as="p" variant="bodySm">
                                                2. Generate and send DMCA takedown notice
                                            </Text>
                                            <Text as="p" variant="bodySm">
                                                3. Report to safety services (Google, Microsoft, etc.)
                                            </Text>
                                        </BlockStack>
                                    </Card>

                                    <div
                                        style={{
                                            padding: '12px',
                                            backgroundColor: '#0078d4',
                                            color: 'white',
                                            borderRadius: '6px',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Text as="p" variant="bodyMd">
                                            View Full Evidence Package →
                                        </Text>
                                    </div>

                                    <Text as="p" variant="bodySm" tone="subdued" alignment="center">
                                        © 2024 StoreLock Protection. All rights reserved.
                                    </Text>
                                </BlockStack>
                            )}
                        </div>
                    </BlockStack>
                </Modal.Section>
            </Modal>
        </BlockStack>
    );
};

export default Notifications;
