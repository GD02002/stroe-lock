import React from 'react';
import {
    Card,
    BlockStack,
    InlineStack,
    Text,
    Button,
    Badge,
    DataTable,
    Divider,
} from '@shopify/polaris';

const SafetyReporting = () => {
    const blacklistRows = [
        [
            'clone-site-1.com',
            'Google Safe Browsing',
            <Badge key="blacklisted" tone="success">Blacklisted</Badge>
        ],
        [
            'fake-store-2.com',
            'Microsoft SmartScreen',
            <Badge key="pending" tone="attention">Pending</Badge>
        ],
        [
            'copycat-shop.com',
            'CleanDNS',
            <Badge key="submitted" tone="info">Submitted</Badge>
        ]
    ];

    const handleSubmitReport = () => {
    };

    return (
        <Card>
            <BlockStack gap="400">
                <InlineStack align="space-between" blockAlign="center">
                    <Text as="h2" variant="headingMd">
                        🛡️ Safety & Blacklist Reporting
                    </Text>
                    <Badge tone="success">All Services Connected</Badge>
                </InlineStack>
                <Divider borderColor='border' />
                <BlockStack gap="300">
                    <Text as="h3" variant="headingSm">
                        Connected Safety Services
                    </Text>

                    <BlockStack gap="200">
                        <InlineStack align="space-between" blockAlign="center">
                            <Text as="p" variant="bodySm">Google Safe Browsing</Text>
                            <Badge tone="success">✅ Connected</Badge>
                        </InlineStack>
                        <InlineStack align="space-between" blockAlign="center">
                            <Text as="p" variant="bodySm">Microsoft SmartScreen</Text>
                            <Badge tone="success">✅ Connected</Badge>
                        </InlineStack>
                        <InlineStack align="space-between" blockAlign="center">
                            <Text as="p" variant="bodySm">CleanDNS</Text>
                            <Badge tone="success">✅ Connected</Badge>
                        </InlineStack>
                        <InlineStack align="space-between" blockAlign="center">
                            <Text as="p" variant="bodySm">OpenPhish</Text>
                            <Badge tone="success">✅ Connected</Badge>
                        </InlineStack>
                    </BlockStack>
                    <InlineStack align="start">
                        <Button onClick={() => ''}>
                            Manage Connections
                        </Button>
                    </InlineStack>
                </BlockStack>
                <Divider borderColor='border' />
                <BlockStack gap="300">
                    <Text as="h3" variant="headingSm">
                        Report Infringing Sites
                    </Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                        Select a detection case to report
                    </Text>
                    <select
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid var(--p-color-border)'
                        }}
                    >
                        <option>Select Detection Case</option>
                        <option>CASE-001 - clone-site-1.com</option>
                        <option>CASE-002 - fake-store-2.com</option>
                        <option>CASE-003 - copycat-shop.com</option>
                    </select>
                    <InlineStack gap="200" blockAlign="center">
                        <input type="checkbox" id="confirm-phishing" />
                        <label htmlFor="confirm-phishing">
                            <Text as="span" variant="bodySm">
                                I confirm this is a verified phishing or clone site.
                            </Text>
                        </label>
                    </InlineStack>
                    <InlineStack align="start">
                        <Button tone="critical" onClick={handleSubmitReport}>
                            Submit Report
                        </Button>
                    </InlineStack>
                </BlockStack>
                <Divider borderColor='border' />
                <BlockStack gap="300">
                    <InlineStack align="space-between" blockAlign="center">
                        <Text as="h3" variant="headingSm">
                            Blacklisting Status Tracker
                        </Text>
                        <Text as="p" variant="bodySm" tone="subdued">
                            Auto-refresh every 12 hours
                        </Text>
                    </InlineStack>
                    <DataTable
                        columnContentTypes={['text', 'text', 'text']}
                        headings={['Domain', 'Service', 'Status']}
                        rows={blacklistRows}
                    />
                </BlockStack>
            </BlockStack>
        </Card>
    );
};

export default SafetyReporting;
