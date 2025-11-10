import React, { useState } from 'react';
import {
    Card,
    BlockStack,
    Text,
    Button,
    IndexTable,
    Badge,
    TextField,
    InlineStack,
    Select,
    Grid,
} from '@shopify/polaris';

const EvidenceDMCA = () => {
    const [selectedEvidence, setSelectedEvidence] = useState(null);
    const [dmcaModal, setDmcaModal] = useState(false);
    const [recipientEmail, setRecipientEmail] = useState('');
    const [additionalMessage, setAdditionalMessage] = useState('');
    const [reportToSafety, setReportToSafety] = useState(false);
    const [safetyService, setSafetyService] = useState('google');
    const [noticeGenerated, setNoticeGenerated] = useState(false);

    // Detected Clones Data
    const detectedClonesRows = [
        { id: '1', domain: 'fake-store-clone.com', date: '2024-01-15', status: 'Active', type: 'Clone Site' },
        { id: '2', domain: 'copycat-shop.net', date: '2024-01-14', status: 'Reported', type: 'Image Theft' },
        { id: '3', domain: 'phishing-site.org', date: '2024-01-13', status: 'Resolved', type: 'Domain Typo' },
    ];

    const handleViewEvidence = (id) => {
        setSelectedEvidence(id);
    };

    const handleGenerateNotice = () => {
        if (!recipientEmail) {
            return;
        }
        setNoticeGenerated(true);
        setDmcaModal(false);
        setRecipientEmail('');
        setAdditionalMessage('');
    };

    const handleReportToSafety = () => {
        if (!safetyService) {
            return;
        }
    };
    return (
        <BlockStack gap="400">
            {/* Section 1: Detected Clones Table */}
            <Card>
                <BlockStack gap="400">
                    <Text as="h2" variant="headingMd">
                        🔍 Detected Clones
                    </Text>

                    <IndexTable
                        itemCount={detectedClonesRows.length}
                        headings={[
                            { title: 'Domain' },
                            { title: 'Date' },
                            { title: 'Type' },
                            { title: 'Status' },
                            { title: 'Actions' },
                        ]}
                        selectable={false}
                    >
                        {detectedClonesRows.map((row, index) => (
                            <IndexTable.Row id={row.id} key={row.id} position={index}>
                                <IndexTable.Cell>{row.domain}</IndexTable.Cell>
                                <IndexTable.Cell>{row.date}</IndexTable.Cell>
                                <IndexTable.Cell>{row.type}</IndexTable.Cell>
                                <IndexTable.Cell>
                                    <Badge tone={row.status === 'Resolved' ? 'success' : row.status === 'Reported' ? 'info' : 'attention'}>
                                        {row.status}
                                    </Badge>
                                </IndexTable.Cell>
                                <IndexTable.Cell>
                                    <Button size="slim" onClick={() => handleViewEvidence(row.id)}>
                                        View Evidence
                                    </Button>
                                </IndexTable.Cell>
                            </IndexTable.Row>
                        ))}
                    </IndexTable>
                </BlockStack>
            </Card>
            <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <Card>
                        <BlockStack gap="400">
                            <Text as="h2" variant="headingMd">
                                📄 Generate DMCA Notice
                            </Text>

                            <BlockStack gap="300">
                                <TextField
                                    label="Merchant Store Name"
                                    value="My Shopify Store"
                                    autoComplete="off"
                                    disabled
                                />

                                <TextField
                                    label="Detected Domain"
                                    value="fake-store-clone.com"
                                    autoComplete="off"
                                    disabled
                                />

                                <TextField
                                    label="Recipient Email"
                                    value={recipientEmail}
                                    onChange={setRecipientEmail}
                                    autoComplete="email"
                                    placeholder="abuse@hostingprovider.com"
                                />

                                <TextField
                                    label="Additional Message (Optional)"
                                    value={additionalMessage}
                                    onChange={setAdditionalMessage}
                                    autoComplete="off"
                                    multiline={4}
                                    placeholder="Add any additional context or demands..."
                                />

                                <Button variant="primary" onClick={handleGenerateNotice}>
                                    Generate Notice
                                </Button>

                                {noticeGenerated && (
                                    <InlineStack gap="200" blockAlign="center">
                                        <Badge tone="success">✅ Notice Created Successfully</Badge>
                                    </InlineStack>
                                )}
                            </BlockStack>
                        </BlockStack>
                    </Card>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    {/* Safety Service Reporting */}
                    <Card>
                        <BlockStack gap="400">
                            <Text as="h2" variant="headingMd">
                                🛡️ Safety Service Reporting
                            </Text>

                            <BlockStack gap="300">
                                <InlineStack gap="200" blockAlign="center">
                                    <input
                                        type="checkbox"
                                        id="report-safety"
                                        checked={reportToSafety}
                                        onChange={(e) => setReportToSafety(e.target.checked)}
                                    />
                                    <label htmlFor="report-safety">
                                        <Text as="span" variant="bodyMd">
                                            Report this detection to Safety Services
                                        </Text>
                                    </label>
                                </InlineStack>

                                {reportToSafety && (
                                    <BlockStack gap="300">
                                        <Select
                                            label="Select Safety Service"
                                            options={[
                                                { label: 'Google Safe Browsing', value: 'google' },
                                                { label: 'Microsoft SmartScreen', value: 'microsoft' },
                                                { label: 'PhishTank', value: 'phishtank' },
                                                { label: 'CleanDNS', value: 'cleandns' },
                                                { label: 'OpenPhish', value: 'openphish' },
                                            ]}
                                            value={safetyService}
                                            onChange={setSafetyService}
                                        />

                                        <Button onClick={handleReportToSafety}>
                                            Submit Report
                                        </Button>
                                    </BlockStack>
                                )}
                            </BlockStack>
                        </BlockStack>
                    </Card>
                </Grid.Cell>
            </Grid>
        </BlockStack>
    );
};

export default EvidenceDMCA;
