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

const RecipientIntelligence = () => {
    const providerRows = [
        ['Cloudflare Inc.', '2 days ago', '95%'],
        ['DigitalOcean', '5 days ago', '88%']
    ];

    const handleRescan = () => {
    };

    const handleFetchContacts = () => {
    };

    return (
        <Card>
            <BlockStack gap="400">
                <InlineStack align="space-between" blockAlign="center">
                    <Text as="h2" variant="headingMd">
                        🎯 Recipient Finder & Delivery
                    </Text>
                    <Badge tone="success">Connected</Badge>
                </InlineStack>
                <Divider borderColor='border' />
                <BlockStack gap="300">
                    <Text as="h3" variant="headingSm">
                        Hosting Provider Detection
                    </Text>
                    <InlineStack align="space-between">
                        <Text as="p" variant="bodySm" tone="subdued">IP Address:</Text>
                        <Text as="p" variant="bodySm">104.21.45.123</Text>
                    </InlineStack>
                    <InlineStack align="space-between">
                        <Text as="p" variant="bodySm" tone="subdued">Provider Name:</Text>
                        <Text as="p" variant="bodySm">Cloudflare Inc.</Text>
                    </InlineStack>
                    <InlineStack align="start">
                        <Button onClick={handleRescan}>Re-scan Provider</Button>
                    </InlineStack>
                </BlockStack>
                <Divider borderColor='border' />
                <BlockStack gap="300">
                    <Text as="h3" variant="headingSm">
                        Registrar Contact Lookup
                    </Text>

                    <BlockStack gap="200">
                        <InlineStack align="space-between">
                            <Text as="p" variant="bodySm" tone="subdued">Registrar Name:</Text>
                            <Text as="p" variant="bodySm">Namecheap</Text>
                        </InlineStack>
                        <InlineStack align="space-between">
                            <Text as="p" variant="bodySm" tone="subdued">Abuse Email:</Text>
                            <Text as="p" variant="bodySm">abuse@namecheap.com</Text>
                        </InlineStack>
                        <InlineStack align="space-between">
                            <Text as="p" variant="bodySm" tone="subdued">Submission Method:</Text>
                            <Text as="p" variant="bodySm">Web Form</Text>
                        </InlineStack>
                    </BlockStack>
                    <InlineStack align="start">
                        <Button onClick={handleFetchContacts}>Fetch WHOIS Contacts</Button>
                    </InlineStack>
                </BlockStack>
                <Divider borderColor='border' />
                <BlockStack gap="300">
                    <Text as="h3" variant="headingSm">
                        Fallback Contact Setup
                    </Text>

                    <Text as="p" variant="bodySm" tone="subdued">
                        Used when provider info unavailable:
                    </Text>

                    <BlockStack gap="200">
                        <Text as="p" variant="bodySm">
                            • abuse@[domain]
                        </Text>
                        <Text as="p" variant="bodySm">
                            • legal@[domain]
                        </Text>
                        <Text as="p" variant="bodySm">
                            • dmca@[domain]
                        </Text>
                    </BlockStack>
                </BlockStack>
                <Divider borderColor='border' />
                <BlockStack gap="300">
                    <Text as="h3" variant="headingSm">
                        Provider Cache
                    </Text>
                    <DataTable
                        columnContentTypes={['text', 'text', 'text']}
                        headings={['Provider', 'Last Used', 'Success Rate']}
                        rows={providerRows}
                    />
                </BlockStack>
            </BlockStack>
        </Card>
    );
};

export default RecipientIntelligence;