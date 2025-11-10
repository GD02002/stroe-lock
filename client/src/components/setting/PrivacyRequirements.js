import React from 'react';
import {
    Card,
    Badge,
    Button,
    BlockStack,
    InlineStack,
    Text,
    Icon,
    Banner,
    Grid,
    Divider,
} from '@shopify/polaris';
import { CheckIcon } from '@shopify/polaris-icons';

const PrivacyCompliance = () => {
    const handleReVerifyDomain = () => {
        
    };

    return (
        <Card>
            <BlockStack gap="400">
                {/* Section 1 - Privacy Overview */}
                <BlockStack gap="200">
                    <InlineStack align="space-between" blockAlign="center">
                        <Text as="h2" variant="headingMd">
                            🔒 Your Privacy is Protected
                        </Text>
                        <Badge tone="success">GDPR Compliant</Badge>
                    </InlineStack>

                    <Text as="p" variant="bodyMd" tone="subdued">
                        This app operates without storing visitor data, IP addresses, or cookies.
                        Your store's protection is privacy-first and fully compliant with international standards.
                    </Text>
                </BlockStack>
                <Divider borderColor='border' />
                <Grid>
                    {/* Section 2 - Data Handling Controls */}
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                        <BlockStack gap="300">
                            <Text as="h3" variant="headingSm">
                                Data Handling Controls
                            </Text>

                            <BlockStack gap="200">
                                <InlineStack align="space-between" blockAlign="center">
                                    <Text as="p" variant="bodySm">
                                        Collect Visitor IP
                                    </Text>
                                    <Badge tone="critical">Disabled by System</Badge>
                                </InlineStack>

                                <InlineStack align="space-between" blockAlign="center">
                                    <Text as="p" variant="bodySm">
                                        Track Individual Visitors
                                    </Text>
                                    <Badge tone="critical">Disabled by System</Badge>
                                </InlineStack>

                                <InlineStack align="space-between" blockAlign="center">
                                    <Text as="p" variant="bodySm">
                                        Use Cookies or Fingerprinting
                                    </Text>
                                    <Badge tone="critical">Disabled by System</Badge>
                                </InlineStack>

                                <InlineStack align="space-between" blockAlign="center">
                                    <Text as="p" variant="bodySm">
                                        Collect Personal Data
                                    </Text>
                                    <Badge tone="critical">Disabled by System</Badge>
                                </InlineStack>
                            </BlockStack>

                            <Text as="p" variant="bodySm" tone="subdued">
                                ℹ️ System enforced for privacy compliance
                            </Text>
                        </BlockStack>
                    </Grid.Cell>

                    {/* Section 4 - Compliance Summary */}
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                        <BlockStack gap="300">
                            <Text as="h3" variant="headingSm">
                                Compliance Summary
                            </Text>

                            <BlockStack gap="200">
                                <InlineStack align="space-between" blockAlign="center">
                                    <Text as="p" variant="bodySm">
                                        No personal data collected
                                    </Text>
                                    <Badge tone='new'><Icon source={CheckIcon} tone="success" /></Badge>
                                </InlineStack>

                                <InlineStack align="space-between" blockAlign="center">
                                    <Text as="p" variant="bodySm">
                                        No visitor tracking or cookies
                                    </Text>
                                    <Badge tone='new'><Icon source={CheckIcon} tone="success" /></Badge>
                                </InlineStack>

                                <InlineStack align="space-between" blockAlign="center">
                                    <Text as="p" variant="bodySm">
                                        Fully GDPR and CCPA compatible
                                    </Text>
                                    <Badge tone='new'><Icon source={CheckIcon} tone="success" /></Badge>
                                </InlineStack>

                                <InlineStack align="space-between" blockAlign="center">
                                    <Text as="p" variant="bodySm">
                                        Works without user identification
                                    </Text>
                                    <Badge tone='new'><Icon source={CheckIcon} tone="success" /></Badge>
                                </InlineStack>
                            </BlockStack>
                        </BlockStack>
                    </Grid.Cell>
                </Grid>
                <Divider borderColor='border' />
                {/* Section 3 - Domain Verification Beacon */}
                <BlockStack gap="300">
                    <Text as="h3" variant="headingSm">
                        Domain Verification Beacon
                    </Text>

                    <BlockStack gap="200">
                        <InlineStack align="space-between" blockAlign="center">
                            <Text as="p" variant="bodyMd" fontWeight="semibold">
                                your-store.myshopify.com
                            </Text>
                            <Badge tone='success'><Icon source={CheckIcon} tone="success" /></Badge>
                        </InlineStack>

                        <Text as="p" variant="bodySm" tone="subdued">
                            Ensures protection scripts only run on verified domains
                        </Text>

                        <InlineStack gap="200">
                            <Button onClick={handleReVerifyDomain} size="slim">
                                Re-verify Domain
                            </Button>
                        </InlineStack>
                    </BlockStack>

                    <Banner tone="success">
                        Your setup meets all requirements (REQ-CP-006 to REQ-CP-009)
                    </Banner>
                </BlockStack>
            </BlockStack>
        </Card>
    );
};

export default PrivacyCompliance;
