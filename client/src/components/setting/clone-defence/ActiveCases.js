import React, { useState } from "react";
import { Badge, BlockStack, Button, Card, IndexTable, InlineStack, Modal, Text, TextContainer } from "@shopify/polaris";

const ActiveCases = () => {
    const [caseTimelineModal, setCaseTimelineModal] = useState(false);
    const activeCasesRows = [
        { id: 'CASE-001', domain: 'fake-store-clone.com', status: 'Sent', date: '2024-01-15' },
        { id: 'CASE-002', domain: 'copycat-shop.net', status: 'Pending', date: '2024-01-14' },
        { id: 'CASE-003', domain: 'old-clone.com', status: 'Resolved', date: '2024-01-10' },
    ];
    const handleViewTimeline = () => {
        setCaseTimelineModal(true);
    };

    return (
        <BlockStack gap='400'>
            <Card>
                <BlockStack gap="400">
                    <Text as="h2" variant="headingMd">
                        📋 Active Cases
                    </Text>

                    <IndexTable
                        itemCount={activeCasesRows.length}
                        headings={[
                            { title: 'Case ID' },
                            { title: 'Domain' },
                            { title: 'Status' },
                            { title: 'Date' },
                            { title: 'Actions' },
                        ]}
                        selectable={false}
                    >
                        {activeCasesRows.map((row, index) => (
                            <IndexTable.Row id={row.id} key={row.id} position={index}>
                                <IndexTable.Cell>{row.id}</IndexTable.Cell>
                                <IndexTable.Cell>{row.domain}</IndexTable.Cell>
                                <IndexTable.Cell>
                                    <Badge tone={row.status === 'Resolved' ? 'success' : row.status === 'Sent' ? 'info' : 'attention'}>
                                        {row.status}
                                    </Badge>
                                </IndexTable.Cell>
                                <IndexTable.Cell>{row.date}</IndexTable.Cell>
                                <IndexTable.Cell>
                                    <Button size="slim" onClick={handleViewTimeline}>
                                        View Timeline
                                    </Button>
                                </IndexTable.Cell>
                            </IndexTable.Row>
                        ))}
                    </IndexTable>
                </BlockStack>
            </Card>
            {/* Case Timeline Modal */}
            <Modal
                open={caseTimelineModal}
                onClose={() => setCaseTimelineModal(false)}
                title="Case Timeline"
            >
                <Modal.Section>
                    <TextContainer>
                        <BlockStack gap="300">
                            <InlineStack align="space-between">
                                <Text as="p" variant="bodySm"><strong>Jan 15, 2024</strong></Text>
                                <Badge tone="attention">Case Created</Badge>
                            </InlineStack>
                            <Text as="p" variant="bodySm" tone="subdued">
                                Clone site detected and evidence collected
                            </Text>

                            <InlineStack align="space-between">
                                <Text as="p" variant="bodySm"><strong>Jan 15, 2024</strong></Text>
                                <Badge tone="info">Notice Sent</Badge>
                            </InlineStack>
                            <Text as="p" variant="bodySm" tone="subdued">
                                DMCA notice sent to hosting provider
                            </Text>

                            <InlineStack align="space-between">
                                <Text as="p" variant="bodySm"><strong>Jan 16, 2024</strong></Text>
                                <Badge tone="success">Awaiting Response</Badge>
                            </InlineStack>
                            <Text as="p" variant="bodySm" tone="subdued">
                                Provider has 48 hours to respond
                            </Text>
                        </BlockStack>
                    </TextContainer>
                </Modal.Section>
            </Modal>
        </BlockStack>
    )
};

export default ActiveCases;