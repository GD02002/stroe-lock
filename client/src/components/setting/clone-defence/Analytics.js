import React from "react";
import {
    Card,
    BlockStack,
    InlineStack,
    Text,
    InlineGrid,
} from '@shopify/polaris';
import { LineChart, DonutChart } from '@shopify/polaris-viz';
import '@shopify/polaris-viz/build/esm/styles.css';

const DashboardSummary = () => {
    const lineChartData = [
        {
            name: 'Detections',
            data: [
                { key: 'Week 1', value: 3 },
                { key: 'Week 2', value: 7 },
                { key: 'Week 3', value: 5 },
                { key: 'Week 4', value: 12 },
                { key: 'Week 5', value: 8 },
            ],
        },
    ];

    const donutChartData = [
        {
            name: 'Resolved',
            data: [{ key: 'Resolved', value: 65 }],
        },
        {
            name: 'Pending',
            data: [{ key: 'Pending', value: 25 }],
        },
        {
            name: 'Failed',
            data: [{ key: 'Failed', value: 10 }],
        },
    ];

    return (
        <Card>
            <BlockStack gap="400">
                {/* KPI Cards */}
                <InlineGrid columns={4} gap="400">
                    <Card background="bg-surface-secondary">
                        <BlockStack gap="200">
                            <Text as="p" variant="bodySm" tone="subdued">
                                Active Detections
                            </Text>
                            <Text as="h3" variant="headingLg">
                                12
                            </Text>
                        </BlockStack>
                    </Card>

                    <Card background="bg-surface-secondary">
                        <BlockStack gap="200">
                            <Text as="p" variant="bodySm" tone="subdued">
                                Evidence Packages
                            </Text>
                            <Text as="h3" variant="headingLg">
                                24
                            </Text>
                        </BlockStack>
                    </Card>

                    <Card background="bg-surface-secondary">
                        <BlockStack gap="200">
                            <Text as="p" variant="bodySm" tone="subdued">
                                DMCA Notices Sent
                            </Text>
                            <Text as="h3" variant="headingLg">
                                8
                            </Text>
                        </BlockStack>
                    </Card>

                    <Card background="bg-surface-secondary">
                        <BlockStack gap="200">
                            <Text as="p" variant="bodySm" tone="subdued">
                                Sites Blacklisted
                            </Text>
                            <Text as="h3" variant="headingLg">
                                5
                            </Text>
                        </BlockStack>
                    </Card>
                </InlineGrid>
                <InlineGrid columns={2} gap="400">
                    <BlockStack gap="300">
                        <Text as="h3" variant="headingSm">
                            Detections Over Time
                        </Text>
                        <div style={{ height: '250px' }}>
                            <LineChart data={lineChartData} />
                        </div>
                    </BlockStack>
                    <BlockStack gap="300">
                        <Text as="h3" variant="headingSm">
                            Response Success Rate
                        </Text>
                        <div style={{ height: '250px' }}>
                            <DonutChart data={donutChartData} />
                        </div>
                    </BlockStack>
                </InlineGrid>
            </BlockStack>
        </Card>
    );
};

export default DashboardSummary;